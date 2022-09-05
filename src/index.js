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
<<<<<<< HEAD

app.use('/admin/producto', require('./Rutas/actualizar_producto'));//Endpoiont numero 4. Actualizar producto Web
app.use('/admin/ordenes',require('./Rutas/consultar_ordenes'));//Endpoint 6. Consultar ordenes de compra Web

=======
app.use('/admin/producto/',require('./Rutas/consultar_producto')); //Endpoint Numero 2, consultar producto Web
>>>>>>> Consultar_Producto_Web

// Iniciando server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});