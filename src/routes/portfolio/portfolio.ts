export type PortfolioItem = {
    title: string
    description: {
        short: string // 5 - 20 words
        mid: string // 50 - 100 words
        long: string[] // 2-4 paragraphs
    }
    githubUrl?: string
    deploymentUrl?: string
    techStack: string[]
}

export const portfolioItems: PortfolioItem[] = [
    {
        title: "Dougymander",
        description: {
            short: "Interactive full-stack congressional redistricting app with real US demographic and election data.",
            mid: "A full-stack web app for drawing custom US congressional districts on an interactive canvas map. Users paint districts by selecting ZIP codes, and each district updates in real time with Census demographics and presidential election results from 2008–2024. Features a full auth system, a premium tier with database-synced map saving, and a public read-only map viewer.",
            long: [
                "Dougymander is a full-stack web application for interactive congressional redistricting. Built with SvelteKit (Svelte 5), TypeScript, and PostgreSQL, it lets users draw custom voting districts by selecting ZIP codes on a live canvas map of the United States. The map renders roughly 33,000 ZIP codes with satellite imagery, state and county overlays, and Voronoi-based district borders computed via d3-delaunay.",
                "Users can paint districts using rectangle select, brush, city picker, and county picker tools, then name and style them. Each district displays real demographic data — population, land area, and median household income from ACS Census data — as well as presidential election lean by year from 2008 to 2024 using county-level results.",
                "The technical architecture centers on a canvas layer system of roughly 15 stacked layers with fine-grained reactivity using Svelte 5 runes. The 7.5 MB ZIP dataset is cached in IndexedDB on first load. An auto city-labeling algorithm (two-phase, zoom-aware, and collision-resolved) renders appropriate labels at any zoom level, and a Welsh-Powell plus backtracking four-color algorithm automatically assigns colors so no two adjacent districts share a color.",
                "The app includes a full signup/login system with email verification and JWT cookies. A premium tier unlocks database-synced map saving, historical election data, and the city picker tool. Public maps are viewable at a read-only interactive viewer. This project demonstrates end-to-end ownership of a data-intensive geospatial web app — custom rendering pipeline, spatial algorithms, real datasets, user auth, and a tiered SaaS model — built entirely from scratch."
            ]
        },
        deploymentUrl: "https://demoose.vercel.app/dougymander",
        techStack: ["sveltekit", "svelte", "typescript", "postgresql", "d3-delaunay"]
    },
    {
        title: "Leadvio Workflow Editor",
        description: {
            short: "Visual drag-and-drop editor for building multi-step automated B2B outreach workflows.",
            mid: "An internal workflow editor built during my internship at Leadvio. Uses React Flow to let users visually construct multi-step automated processes that drive AI-powered B2B outreach campaigns. The editor supports connecting, reordering, and configuring nodes representing different stages of a campaign pipeline. Private repository — contact Doug to view.",
            long: [
                "The Leadvio Workflow Editor is a visual, node-based UI built for Leadvio's internal campaign tooling. It lets clients construct multi-step automated workflows by connecting and configuring nodes on a canvas, with each node representing a distinct stage in an AI-driven B2B outreach sequence.",
                "Built with React Flow and TypeScript, the editor prioritizes a smooth drag-and-drop experience while maintaining a strict data model that feeds into the campaign execution engine. This project was part of a broader internship effort that also included a campaign analytics UI and a scheduling cronjob for managing campaign events within user-defined time windows."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/leadvio-workflow-editor",
        deploymentUrl: "https://app.leadvio.se",
        techStack: ["react", "react-flow", "typescript"]
    },
    {
        title: "Dummy Image Generator",
        description: {
            short: "API that fetches relevant placeholder images from Wikipedia by keyword.",
            mid: "A lightweight API and web service that accepts any text query and returns a relevant image by scraping Wikipedia. Useful as a developer placeholder image service — just append your desired subject to the base URL. Built with Express.js and TypeScript and deployed on Vercel.",
            long: [
                "The Dummy Image Generator is a simple but practical developer tool: pass any image description in the URL and it returns a relevant image scraped from Wikipedia. For example, hitting the endpoint with 'German Chocolate Cake' returns a Wikipedia image of that subject.",
                "The service is built as an Express.js API in TypeScript and deployed on Vercel. It works as a web scraper that queries Wikipedia, finds a suitable image, and redirects to it — making it a drop-in placeholder for any project that needs real, contextually appropriate imagery rather than generic grey boxes."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/img",
        deploymentUrl: "https://dougaimg.vercel.app/",
        techStack: ["typescript", "express"]
    },
    {
        title: "formellt",
        description: {
            short: "Framework-agnostic JavaScript library for managing HTML form state and validation.",
            mid: "A lightweight open-source library that simplifies HTML form handling in any web project regardless of framework. Provides a clean API for validation, submission handling, and form state management. Designed to be unobtrusive and composable — drop it into React, Svelte, Vue, or plain JavaScript without friction.",
            long: [
                "formellt is a framework-agnostic library for handling HTML forms. It abstracts the repetitive boilerplate of form validation, submission, and state tracking into a clean, composable API that works regardless of which frontend framework — or none — you're using.",
                "The core design goal is minimal footprint and zero lock-in. Rather than prescribing how forms should be structured, formellt works with whatever markup you already have. This makes it a practical utility for both greenfield projects and existing codebases that want better form ergonomics without adopting a heavier solution."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/formellt",
        techStack: ["typescript"]
    },
    {
        title: "dug.wtf",
        description: {
            short: "Personal website featuring two data-driven guessing games from Spotify and Letterboxd.",
            mid: "A personal website built with SvelteKit and TypeScript. The main attractions are two interactive guessing games powered by data scraped from Spotify and Letterboxd. Uses Drizzle ORM for database access. The site serves as both a personal hub and a showcase for creative, data-driven web experiences.",
            long: [
                "dug.wtf is my personal website, built with SvelteKit and TypeScript. Beyond the standard portfolio content, it features two guessing games: one based on music data scraped from Spotify and one based on film data scraped from Letterboxd. The games are the main draw and give visitors something interactive to engage with.",
                "The project uses Drizzle ORM for type-safe database queries and demonstrates end-to-end SvelteKit development including server-side rendering, data fetching, and game state management. Scraping external platforms for real data adds an extra layer of freshness — the games reflect actual charts and rankings rather than hand-curated static content."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/dugwtf",
        techStack: ["sveltekit", "typescript", "drizzle"]
    },
    {
        title: "Landlord.ly",
        description: {
            short: "Full-stack homestay business simulation with property and booking management.",
            mid: "A full-stack web application simulating a homestay and short-term rental business. Users manage properties and bookings through a React frontend backed by an Express.js REST API. Built with TypeScript throughout and deployed on Render.",
            long: [
                "Landlord.ly is a full-stack simulation of a short-term rental business — think a simplified Airbnb. Users can list properties, manage availability, and handle bookings through a clean React interface.",
                "The backend is an Express.js REST API written in TypeScript, with the frontend consuming it via standard fetch calls. The project demonstrates a complete client-server architecture: routing, data persistence, and UI state management working together across a real deployed environment."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/bnb-uppgift-doug",
        deploymentUrl: "https://bnb-uppgift-doug.onrender.com/",
        techStack: ["express", "react", "typescript"]
    },
    {
        title: "React Blackjack",
        description: {
            short: "Browser-based blackjack card game built with React.",
            mid: "A fully playable blackjack game running in the browser, built with React.js. Implements standard blackjack rules including hit, stand, and bust detection. A focused project demonstrating React component design and state management through a familiar, interactive game format.",
            long: [
                "React Blackjack is a browser-based implementation of the classic casino card game. It follows standard blackjack rules: the player draws cards against a dealer hand, choosing to hit or stand, with the goal of reaching 21 without busting.",
                "The project is built entirely with React.js and uses component-level state to manage the game loop — deck shuffling, card dealing, turn progression, and win/loss resolution. It's a compact but complete demonstration of React fundamentals applied to a stateful, event-driven problem."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/react-blackjack",
        techStack: ["react", "javascript"]
    },
    {
        title: "Pong",
        description: {
            short: "Recreation of the classic Pong arcade game using HTML Canvas and JavaScript OOP.",
            mid: "A faithful browser-based recreation of the classic Pong video game, built with HTML Canvas and vanilla JavaScript. Uses object-oriented programming to model the game's core entities — paddles, ball, and score — keeping the logic clean and extensible without any external dependencies.",
            long: [
                "Pong is a from-scratch recreation of the 1972 arcade classic, rendered entirely on an HTML Canvas element. The game runs in the browser with no libraries or frameworks — just the Canvas API and JavaScript.",
                "The implementation uses object-oriented programming to organize the game's moving parts: a Ball class handles physics and collision, Paddle classes manage player input and AI movement, and a Game class coordinates the loop, scoring, and rendering. It's a clean demonstration of OOP design applied to a real-time interactive system."
            ]
        },
        githubUrl: "https://github.com/dugalcedo/pong",
        techStack: ["html-canvas", "javascript"]
    },
    {
        title: "ICExpress Landing Page",
        description: {
            short: "Professional marketing landing page for one of South Africa's largest courier companies.",
            mid: "A freelance project: a modern, performant marketing landing page for ICExpress, one of South Africa's largest courier services. Built with Astro and Svelte for fast load times and a clean developer experience. Deployed on Vercel.",
            long: [
                "The ICExpress landing page is a freelance project delivered for one of South Africa's largest courier companies. The brief called for a professional, fast-loading marketing page that clearly communicates the company's services and brand.",
                "The page is built with Astro, which handles static generation and asset optimization, with Svelte components powering any interactive elements. The combination produces a site that is both highly performant and easy to maintain — a practical choice for a client who needs reliability over complexity."
            ]
        },
        deploymentUrl: "https://icexpress.vercel.app/",
        techStack: ["astro", "svelte"]
    }
]
