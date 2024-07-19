import EventEmitter from "events";
import * as http from "http";

const myEmitter = new EventEmitter();

myEmitter.on("myevent", (data) => {
    console.log(`myevent : ${data}`);
});

myEmitter.emit("myevent", "one");

console.log("start");

const req = http.request("http://localhost:3000", (res) => {
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
        console.log(`body: ${chunk}`);
    });
    res.on("end", () => {
        console.log("end");
    });
});
req.end();