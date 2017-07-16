/* jshint esversion:6 */

const net = require('net');
const fs = require('fs');

const responseGen = function (file, spec, status, date, type, connection, request){
  fs.readFile(file,(err, data) => {
    let dataStr = data.toString();
    request.write(`${spec}${status}\n${date}\nContent-Type: ${type}\nContent-length: ${dataStr.length}\nConnection: ${connection}\n\n${dataStr}\n`);
    request.end();
  });
};

const responseHead = function(file, spec, status, date, type, connection, request){
  fs.readFile(file,(err, data) => {
    let dataStr = data.toString();
    request.write(`${spec}${status}\n${date}\nContent-Type: ${type}\nContent-length: ${dataStr.length}\nConnection: ${connection}\n`);
    request.end();
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

    if (method === 'GET'){
      switch (path) {
        case '/':
        responseGen('index.html',spec, ok, date, htmlFile, conType, request);
        break;
        case '/index.html':
        responseGen('index.html', spec, ok, date, htmlFile, conType, request);
        break;
        case '/hydrogen.html':
        responseGen('hydrogen.html', spec, ok, date, htmlFile, conType, request);
        break;
        case '/helium.html':
        responseGen('helium.html', spec, ok, date, htmlFile, conType, request);
        break;
        case 'styles.css':
        responseGen('styles.css', spec, ok, date, cssFile, conType, request);
        break;
        default:
        responseGen('404.html', spec, notFound, date, htmlFile, conType, request);
      }
    }else if (method === 'HEAD'){
      switch (path) {
        case '/':
        responseHead('index.html', spec, ok, date, htmlFile, conType, request);
        break;
        case '/index.html':
        responseHead('index.html', spec, ok, date, htmlFile, conType, request);
        break;
        case '/hydrogen.html':
        responseHead('hydrogen.html', spec, ok, date, htmlFile, conType, request);
        break;
        case '/helium.html':
        responseHead('helium.html', spec, ok, date, htmlFile, conType, request);
        break;
        case 'styles.css':
        responseHead('styles.css', spec, ok, date, cssFile, conType, request);
        break;
        default:
        responseHead('404.html', spec, notFound, date, htmlFile, conType, request);
      }
    }
    responseHead('404.html', spec, notFound, date, htmlFile, conType, request);
  });
});

server.listen(8080, '0.0.0.0', () => {
  process.stdout.write('\nlistening to port 8080\n');
});