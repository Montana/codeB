var app = require("http").createServer(handler);
var fs = require("fs");

app.listen(8080);

function handler(request, response) {
    file = "C:\\Users\\Home\\Documents\\Projects\\CodeB\\data\\game_1.127.22.135_4_1";
    fs.readFile(file, function(err, data) {
        if(err) {
            response.end("Error");
        }
        response.end(data);
    });
}

console.log("Server running at http://localhost:8080/data");