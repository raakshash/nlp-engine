var debug = require('debug')('nlp-engine:server');
var http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var app = require('./app/app');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9999');
app.set('port', port);

/**
 * Create HTTP server.
 */

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

  // Keep track of http requests
  // let numReqs = 0;
  // setInterval(() => {
  //   console.log(`numReqs = ${numReqs}`);
  // }, 1000);

  // // Count requests
  // function messageHandler(msg) {
  //   if (msg.cmd && msg.cmd === 'notifyRequest') {
  //     numReqs += 1;
  //   }
  // }

  // for (const id in cluster.workers) {
  //   cluster.workers[id].on('message', messageHandler);
  // }

} else {

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, function () {
    console.log("your app is runing on localhost:" + port);
  });
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  console.log(`Worker ${process.pid} started`);
}

/**
   * Normalize a port into a number, string, or false.
   */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
