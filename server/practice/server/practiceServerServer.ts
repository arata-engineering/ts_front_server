import * as http from "http";

http.createServer((request, response) => {
    response.write("<html><h1>hello</h1></html>");
    response.end();
}).listen(3000);