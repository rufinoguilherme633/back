const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const contatos = require('./contatos.js');

const app = express();

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    app.use(cors());
    next();
})


app.get('/contatos/usuario/:uf', cors(), async function(request, response, next) {
    let contato = request.params.uf

    if (contato == '' || contato == undefined || !isNaN(contato)) {
        response.status(404)
        response.json({ message: "Não é possivel processar a requisição, pois o contato do Estado não foi informada" });
    } else {
        let dono = contatos.filtroAcount(contato);
        if (dono) {
            response.status(200)
            response.json(dono)
        } else {
            response.status(404);

            response.json();
        }
    }
    console.log(dono)
})

app.listen(8080, function() {
    console.log("servidor aguardando requisições na porta 8080")
})