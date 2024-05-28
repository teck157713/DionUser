export const retry = (
    fn: () => Promise<void>,
    timer: number
) => {
    return new Promise<void>(async (resolve) => {
        const interval = setInterval(() => {
            fn()
                .then(() => {
                    clearInterval(interval);
                    resolve();
                })
                .catch(() => {})
        }, timer);
    });
}