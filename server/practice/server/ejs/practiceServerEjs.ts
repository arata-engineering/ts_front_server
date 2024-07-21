import express from "express";
import Redis from "ioredis";
import path from "path";

//"exec": "ts-node ./server/practice/server/ejs/practiceServerEjs.ts"

const app: express.Express = express();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const keyArr: string[] = await redis.keys("User*");
    let users: string[] = [];
    for (const userKey of keyArr) {
        const value: string | null = await redis.get(userKey);
        if (!value) {
            continue;
        }
        const obj = JSON.parse(value);
        users.push(obj);
    }
    res.render(path.normalize(path.join(__dirname, "../../../../template", "index.ejs")), {users});
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("===包括的エラーハンドリング===");
    res.status(500).send(`<html><h1>error page : ${err}</h1></html>`);
});

const redis: Redis = new Redis({
    port: 6379,
    host: "localhost",
    enableOfflineQueue: false
});
const init = async () => {
    redis.set("User4", JSON.stringify({ id: 4, name: "for" }));
    redis.set("User5", JSON.stringify({ id: 5, name: "five" }));
}
redis.once("ready", async () => {
    await init();
    app.listen(3000, () => {
        console.log(START);
    });
});
redis.on("error", (error) => {
    console.log("==redis error==");
    console.log(error);
});
const START: "START" = "START";