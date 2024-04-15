const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);

    const filename = req.url == '/' ? '/index' : q.path
    fs.readFile(`${__dirname}/pages${filename}.html`, (err, data) => {
        if (err){
            fs.readFile(`${__dirname}/pages/404.html`, (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data, 'utf-8');
                
            })
            return
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
})

server.listen(8000)