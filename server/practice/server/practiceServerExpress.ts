import express from "express";
import Redis from "ioredis";
import path from "path";
import { getApiRedisUsers, getRedisClient, getRedisUsers, redisInit } from "./redis/practiceServerRedisManager";

//"exec": "ts-node ./server/practice/server/practiceServerExpress.ts"

const app: express.Express = express();
app.set("view engine", "ejs");

/**
 * ミドルウェアの共通化
 * 
 * #useを呼び出すことで共通のミドルウェアとして呼び出すことができます。
 * 例えば、処理の一番上で呼び出すことにより#useが一番最初に動くミドルウェアとして実行されます。
 */
app.use((req, res, next) => {
    console.log("midlle wareの共通化");
    next();
});

/**
 * 静的ファイル配信
 * 
 * public配下のページにアクセスが可能となる
 * 例）http://localhost:3000/help.html
 */
app.use(express.static(path.join(__dirname, "../../../", "public")));

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
app.get("/api/user/:id", async (req, res, next) => {
    const userId = req.params.id;
    const valueOfRedis: string | null = await redis.get(userId);
    if (valueOfRedis === null) {
        next(new Error("redis get Error"));
        return;
    }
    const json = JSON.parse(valueOfRedis);
    res.status(200).json(json);
});
app.get("/api/users/", async (req, res, next) => {
    try {
        const users = await getRedisUsers();
        res.status(200).send(users);
    } catch(e) {
        next(e);
    }
});
app.get("/users/", async (req, res) => {
    const users: object[] = await getApiRedisUsers();
    res.render(path.join(__dirname, "../../../template", "index.ejs"), {users});
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
const redis: Redis = getRedisClient();
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