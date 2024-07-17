import express from "express";

const app: express.Express = express();
app.get("/", (req, res) => {
    res.send("<html><h1>hello express</h1></html>");
});

app.get("/item/:id", (req, res) => {
    res.send(`<html><h1>hellooooooooooo ${req.params.id}</h1></html>`);
});

app.listen(3000, () => console.log(`server started`));