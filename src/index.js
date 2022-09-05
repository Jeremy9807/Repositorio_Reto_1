const express = require ('express');
const req = require('express/lib/request');
const app = express();
const morgan = require(`morgan`);

//Configuracion
app.set('port', 3000);
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/admin/ordenes',require('./Rutas/consultar_ordenes'));//Endpoint 6. Consultar ordenes de compra Web

// Iniciando server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});