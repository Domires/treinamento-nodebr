const http = require('http')

http.createServer((request, response) => {
    response.end('Ok')
})
.listen(4000, console.log('Servidor rodando'))