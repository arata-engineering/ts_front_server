import express from "express";
import path from "path";

//"exec": "ts-node ./server/practice/server/ejs/practiceServerEjs.ts"

const app: express.Express = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render(path.normalize(path.join(__dirname, "../../../../template", "index.ejs")));
});

app.listen(3000, () => {
    console.log("server start");
});