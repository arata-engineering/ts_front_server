
const returnPromise: (message: string) => Promise<string> = (message) => {
    return new Promise<string>((resolve, reject) => {
        resolve(`promise ${message}`);
    });
}

const returnPromiseTimeOut: (message: string) => Promise<string> = async (message) => {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(`promise ${message} setTimeout`);
            resolve();
        }, 1000)
    });
    return `promise ${message}`;
}

returnPromise("あ").then(console.log);
returnPromise("い").then(console.log);
returnPromiseTimeOut("う").then(console.log);
returnPromise("え").then(console.log);

returnPromise("1").then(console.log)
    .then(() => returnPromise("2").then(console.log))
    .then(() => returnPromiseTimeOut("3").then(console.log))
    .then(() => returnPromise("4").then(console.log))

Promise.all([returnPromise("a"), returnPromise("b"), returnPromiseTimeOut("c"), returnPromise("d")])
    .then(() => console.log("== promise all end =="))
    .catch(() => console.log(`errorになったよ`));

console.log("start");

const sleep: (time: number) => Promise<void> = time => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, time);
    });
}
sleep(1000).then(() => console.log("2秒たちました"));

type executer = (value: void | PromiseLike<void>) => void
