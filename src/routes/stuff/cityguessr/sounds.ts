const files = {
    correct: "/audio/effects/ding.wav",
    nearby: "/audio/effects/woop.wav",
    incorrect: "/audio/effects/wrong.mp3"
}

export const audio: Record<string,  HTMLAudioElement|undefined> = {}

export const preLoadAudio = () => {
    if (!(globalThis as any).Audio) return;
    for (const [name, file] of Object.entries(files)) {
        audio[name] = new Audio(file)
    }
}
