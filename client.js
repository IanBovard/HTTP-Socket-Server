/* jshint esversion:6 */

const net = require('net');

const client = net.createConnection(8080, '0.0.0.0', () => {
  process.stdout.write('NOOOHD MON!\n');

  process.stdin.on('data', (data)=>{
    client.write(data);
  });
  client.on('data', (data)=>{
    process.stdout.write(data);
  });

});
