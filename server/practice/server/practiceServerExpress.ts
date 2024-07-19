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
    res.status(500).send(`<html><h1>error page : ${err}</h1></html>`);
});

const redis: Redis = new Redis({
    port: 6379,
    host: "localhost",
    enableOfflineQueue: false
});
const redisInit = async () => {
    await Promise.all([
        redis.set("User1", JSON.stringify({id: 1, name: "alpha"})),
        redis.set("User2", JSON.stringify({id: 1, name: "bravo"}))
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
   console.log(err);
   process.exit(1); 
});