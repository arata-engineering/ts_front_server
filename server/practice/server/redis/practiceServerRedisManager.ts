import Redis from "ioredis";
import config from "config";

const redis: Redis = new Redis(config.get("Redis"));

export const getRedisClient: () => Redis = () => {
    return redis;
}

export const redisInit = async () => {
    await Promise.all([
        redis.set("User1", JSON.stringify({ id: 1, name: "alpha" })),
        redis.set("User2", JSON.stringify({ id: 2, name: "bravo" })),
        redis.set("User3", JSON.stringify({ id: 3, name: "trip" }))
    ]);
}

export const getRedisUsers: () => Promise<object[]> = async () => {
    const keyarr: string[] = await redis.keys("User*");
    console.log(`keys : ${keyarr}`);

    const stream = redis.scanStream({
        match: "User*"
    });
    const users: object[] = [];
    for await (const resultKeys of stream) {
        for (const key of resultKeys) {
            const value = await redis.get(key);
            const json: any = JSON.parse(value as string);
            users.push(json);
        }
    }
    return users;
}

export const getApiRedisUsers: () => Promise<object[]> = async () => {
    const keyArr: string[] = await redis.keys("User*");
    let users: object[] = [];
    for (const userKey of keyArr) {
        const value: string | null = await redis.get(userKey);
        if (!value) {
            continue;
        }
        const obj = JSON.parse(value);
        users.push(obj);
    }
    return users;
}

