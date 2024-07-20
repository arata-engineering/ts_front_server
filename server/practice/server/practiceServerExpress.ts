import express from "express";
import Redis from "ioredis";

const app: express.Express = express();

/** ミドルウェアの共通化 */
/**
 * #useを呼び出すことで共通のミドルウェアとして呼び出すことができます。
 * 例えば、処理の一番上で呼び出すことにより#useが一番最初に動くミドルウェアとして実行されます。
 */
app.use((req, res, next) => {
    console.log("midlle wareの共通化");
    next();
});

/** 基本のルーティング */
app.get("/", (req, res) => {
    res.send(`<html><h1>hello express: ${req.method}</h1></html>`);
});

/** パラメータの設定 */
app.get("/item/:id", (req, res, next) => {
    res.send(`<html><h1>hello ${req.params.id}</h1></html>`);
});

/** ミドルウェアの連鎖 */
app.get("/next/", (req, res, next) => {
    console.log("SERVICE START next");
    next();
}, (req, res) => {
    res.send(`<html><h1>next page</h1></html>`);
});

/** Redisデータ取得後にJSON返却 */
app.get("/user/:id", async (req, res, next) => {
    const userId = req.params.id;
    const valueOfRedis: string | null = await redis.get(userId);
    if (valueOfRedis === null) {
        next(new Error("redis get Error"));
        return;
    }
    const json = JSON.parse(valueOfRedis);
    res.status(200).json(json);
});
app.get("/users/", async (req, res, next) => {
    try {
        const keyarr: string[] = await redis.keys("User*");
        console.log(`keys : ${keyarr}`);

        const stream = redis.scanStream({
            match: "User*"
        });
        const users: string[] = [];
        for await (const resultKeys of stream) {
            for (const key of resultKeys) {
                const value = await redis.get(key);
                const json: any = JSON.parse(value as string);
                users.push(json);
            }
        }
        res.status(200).send(users);
    } catch(e) {
        next(e);
    }
});

/** 包括的エラーハンドリング */
/**
 * 下記の条件の時に4つの引数を設定した#useの包括的エラーハンドリングへ遷移します。
 * ・ミドルウェアで#nextの引数にErrorのインスタンスを渡す
 * ・ミドルウェアでエラーがスローされた時
 * ※引数４つの#useは最後に書いた方がいいらしい
 */
app.get("/error/", (req, res, next) => {
    //next(new Error("errorが発生しました"));
    throw new Error("This is error");
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("===包括的エラーハンドリング===");
    res.status(500).send(`<html><h1>error page : ${err}</h1></html>`);
});

/**
 * サーバ起動とRedis通信
 */
const redis: Redis = new Redis({
    port: 6379,
    host: "localhost",
    enableOfflineQueue: false
});
const redisInit = async () => {
    await Promise.all([
        redis.set("User1", JSON.stringify({ id: 1, name: "alpha" })),
        redis.set("User2", JSON.stringify({ id: 2, name: "bravo" })),
        redis.set("User3", JSON.stringify({ id: 3, name: "trip" }))
    ]);
}
redis.once("ready", async () => {
    try {
        await redisInit();
        app.listen(3000, () => console.log(`server started`));
    } catch (e) {
        console.log(e);
    }
});
redis.on("error", (err) => {
    console.log("===redis error===")
    console.log(err);
    process.exit(1);
});