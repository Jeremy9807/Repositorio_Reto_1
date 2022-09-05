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
app.use('/admin/producto', require('./Rutas/actualizar_producto'));//Endpoiont numero 4. Actualizar producto

// Iniciando server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});