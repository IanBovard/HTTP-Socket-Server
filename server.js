/* jshint esversion:6 */
const net = require('net');
const fs = require('fs');

const responseGen = function (file, method, ok, date, type, connection){
  fs.readFile(file,(err, data) => {
    let dataStr = data.toString();
    process.stdout.write(`\n${method}${ok}\n${date}\nContent-Type: ${type}\nContent-length: ${dataStr.length}\nConnection: ${connection}\n\n${dataStr}`);

  });
};

const server = net.createServer((request) => {
  request.on('data', (data) =>{
    let httpRequest = data.toString();

    let httpArray = httpRequest.split('\n');
    let reqArray = httpArray[0].split(' ');

    let method = reqArray[0];
    let path = reqArray[1];
    let spec = reqArray[2];

    let ok = ' 200 OK';
    let notFound = ' 404 Not Found';
    let date = `Date: ${new Date().toUTCString()}`;
    let htmlFile = 'text/html; charset=utf-8';
    let cssFile = 'text/css; charset=utf-8';
    let conType = 'keep-alive';
    fs.readFile('index.html', (err, data) => {
      index = data.length;
    });

    if (method === 'GET'){
      switch (path) {
        case '/':
        responseGen('index.html', method, ok, date, htmlFile, conType);
        break;
        case '/index.html':
        responseGen('index.html', method, ok, date, htmlFile, conType);
        break;
        case '/hydrogen.html':
        responseGen('hydrogen.html', method, ok, date, htmlFile, conType);
        break;
        case '/helium.html':
        responseGen('helium.html', method, ok, date, htmlFile, conType);
        break;
        case 'styles.css':
        responseGen('styles.css', method, ok, date, cssFile, conType);
        break;
        default:
        responseGen('404.html', method, notFound, date, htmlFile, conType);
      }
    }else{
      responseGen('404.html', method, notFound, date, htmlFile, conType);
    }
    request.end();
  });
});

server.listen(8080, '0.0.0.0', () => {
  process.stdout.write('\nlistening to port 8080\n');
});