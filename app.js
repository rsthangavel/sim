const http   = require('http');
const app    = require('./server/router/middleware');
const server = http.createServer(app);
const io     = require('./server/socket/socket')(server);
const port   = process.env.PORT || '2000';



// Listen on provided port, on all network interfaces.

server.listen(port, () => console.log(`API run ning on localhost:${port}`));
                                                                                                                                                                                                                                                                    
                                     