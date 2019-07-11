'use strict'
//Referência a classe criada
const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

//const port = normalizePorta(process.env.PORT || '3000');
const port = normalizePorta(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('error', onListening);

console.log('API rodando na porta ' + port);

function normalizePorta(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES': //Erro de permissão.
            console.error(bind + ' requires elevated privileges.')
            process.exit(1);
            break;
        case 'EADDRINUSE': //Erro de endereço .
            console.error(bind + ' is already in use.')
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Captura as informações do servidro
//start no debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}