const http = require("http");
const fs = require("fs");
const gameModule = require("./js/game.js");
let Game = gameModule.Game;
let game = new Game(5);

let server = http.createServer((req, res) => {
    console.log("req.url:", req.url);
    if (req.url.endsWith(".css")) {
        res.writeHead(200, {"Content-Type": "text/css"});
    } else if (req.url.endsWith(".html")) {
        res.writeHead(200, {"Content-Type": "text/html"});
    } else if (req.url.endsWith(".js")) {
        res.writeHead(200, {"Content-Type": "text/javascript"});
    } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        let rs = fs.createReadStream(__dirname + "/index.html", "utf8");
        rs.pipe(res);   
        return;
    }

    let rs = fs.createReadStream(__dirname + "/" + req.url, "utf8");
    rs.pipe(res);
});

server.listen(3000, "127.0.0.1");
console.log("Listening at port 3000");