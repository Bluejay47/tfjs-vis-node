declare module NodeJS  {
    interface Global {
        document: any,
        window: any,
        HTMLElement: any,
        requestAnimationFrame: Function,
        cancelAnimationFrame: Function,
        lastTime: number
    }
}