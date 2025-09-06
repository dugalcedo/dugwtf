import dotenv from 'dotenv'; dotenv.config()
import { v4 } from 'uuid';
import EventEmitter from 'node:events';

export default class Queue {
    log(...args: any[]) {
        if (!process.env.LOG_QUEUE) return;
        console.log(`-- <Queue ${this.name}> -- `, ...args)
    }

    static #queues: Record<string, Queue> = {};

    static create(name: string, interval: number = 1250): Queue {
        if (Queue.#queues[name]) return Queue.#queues[name]
        return new Queue(name, interval)
    }

    #name: string;
    get name() { return this.#name; }

    #working = false;
    get working() { return this.#working; }

    #interval: number;
    get interval() { return this.#interval; }

    #tickets: string[] = [];
    get clonedTickets() { return [...this.#tickets]; }

    #jobs: Record<string, (() => Promise<any>) | undefined> = {};
    #results: Record<string, any> = {};
    #emitter = new EventEmitter();

    get estimatedWaitTime() {
        return this.#tickets.length * this.interval;
    }

    constructor(name: string, interval: number = 1250) {
        if (Queue.#queues[name]) throw new Error(`There is already a queue named "${name}"`);
        Queue.#queues[name] = this;
        this.#name = name;

        if (interval < 10) throw new Error(`Queue interval must be at least 10 ms.`);
        this.#interval = interval;
    }

    createTicket(cb: () => Promise<any>) {
        const ticket = `${this.name}|${v4()}`;
        this.log("Creating ticket...", ticket)
        this.#tickets.push(ticket);
        this.#jobs[ticket] = cb;
        
        // Start processing if not already working
        if (!this.#working) {
            this.#processQueue();
        }
        
        return {
            ticket,
            estimatedWaitTime: this.estimatedWaitTime
        };
    }

    cleanupTicket(ticket: string) {
        delete this.#results[ticket];
        delete this.#jobs[ticket];
        const index = this.#tickets.indexOf(ticket);
        if (index > -1) {
            this.#tickets.splice(index, 1);
        }
    }

    submitTicket(ticket: string): Promise<any> {
        this.log("Submitting ticket...", ticket)
        if (!this.#jobs[ticket]) throw {
            status: 404,
            message: `There is no job associated with this ticket`
        }

        return new Promise((resolve, reject) => {
            // Check if result already exists
            if (this.#results[ticket] !== undefined) {
                resolve(this.#results[ticket]);
                return;
            }

            // Set timeout for queue processing
            const timeout = setTimeout(() => {
                reject({ error: true, status: 500, message: "Server queue timeout" });
            }, 10000);

            // Listen for completion
            this.#emitter.once(ticket, (result) => {
                clearTimeout(timeout);
                resolve(result);
            });

            // Listen for errors
            this.#emitter.once(`${ticket}|error`, (error) => {
                clearTimeout(timeout);
                const status = error?.status || 500;
                const message = error?.message || "Internal server error";
                reject({ error: true, status, message });
            });

            // Start processing if not already working
            if (!this.#working) {
                this.#processQueue();
            }
        }).finally(() => {
            this.cleanupTicket(ticket);
        });
    }

    async #processQueue() {
        if (this.#working || this.#tickets.length === 0) {
            return;
        }

        this.#working = true;

        while (this.#tickets.length > 0) {
            const nextTicket = this.#tickets[0]; // Peek at first ticket
            
            // Skip if already processed
            if (this.#results[nextTicket] !== undefined) {
                this.#tickets.shift();
                continue;
            }

            const job = this.#jobs[nextTicket];
            if (!job) {
                this.#tickets.shift();
                continue;
            }

            try {
                const result = await job();
                this.#results[nextTicket] = result;
                this.#emitter.emit(nextTicket, result);
            } catch (error) {
                this.#emitter.emit(`${nextTicket}|error`, error);
            } finally {
                // Remove the processed ticket
                this.#tickets.shift();
                
                // Wait for the specified interval before processing next ticket
                if (this.#tickets.length > 0) {
                    await new Promise(resolve => setTimeout(resolve, this.#interval));
                }
            }
        }

        this.#working = false;
    }
}