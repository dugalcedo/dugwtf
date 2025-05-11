type BackgroundImage = {
    left: number
    top: number
    transitionLeft: number
    transitionTop: number
    leftTimeout?: NodeJS.Timeout
    topTimeout?: NodeJS.Timeout
    xDir: number
    yDir: number
}

const backgroundStore = $state<Record<string, BackgroundImage>>({})

const randRange = (min: number, max: number) => Math.random() * (max - min) + min;
const coin = (n1: number, n2: number) => Math.random() > 0.5 ? n1 : n2;

const removeBg = (id: string) => {
    const bi = backgroundStore[id]
    clearInterval(bi.leftTimeout)
    clearInterval(bi.topTimeout)
    delete backgroundStore[id]
}

const animateLeft = (id: string) => {
    const bg = getBg(id)
    clearTimeout(bg.leftTimeout)
    bg.left = bg.xDir === 1 ? 75 : 25

    // reset transition
    setTimeout(() => {
        bg.transitionLeft = randRange(5000, 15000)
        bg.xDir = bg.xDir === 1 ? -1 : 1;
        animateLeft(id)
    }, bg.transitionLeft);
}

const animateTop = (id: string) => {
    const bg = getBg(id)
    clearTimeout(bg.topTimeout)
    bg.top = bg.yDir === 1 ? 75 : 25

    // reset transition
    setTimeout(() => {
        bg.transitionTop = randRange(5000, 15000)
        bg.yDir = bg.yDir === 1 ? -1 : 1;
        animateTop(id)
    }, bg.transitionTop);
}

const setBg = (id: string) => {

    if (backgroundStore[id]) {
        removeBg(id)
    }

    backgroundStore[id] = {
        left: randRange(35, 65),
        top: randRange(35, 65),
        transitionLeft: randRange(5000, 15000),
        transitionTop: randRange(5000, 15000),
        xDir: coin(-1, 1),
        yDir: coin(-1, 1)
    }

    animateLeft(id)
    animateTop(id)
}

export const getBg = (id: string) => {
    if (!backgroundStore[id]) {
        setBg(id)
    }

    return backgroundStore[id]
}