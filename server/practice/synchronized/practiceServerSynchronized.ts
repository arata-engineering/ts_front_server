
function retPromise(message: string): Promise<string> {
    console.log("console : " + message);
    return new Promise((resolve) => {
        resolve(message);
    });
}

async function getPromise(): Promise<void> {
    const p = await retPromise("A");
    console.log("after wait : " + p);
}

const p1: Promise<void> = getPromise();
p1.then(() => console.log("then : end")).catch(() => console.log("catch end"));

console.log("== START ==");