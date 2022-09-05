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
app.use('/admin/producto', require('./Rutas/actualizar_producto'));//Endpoiont numero 4. Actualizar producto Web
app.use('/admin/ordenes',require('./Rutas/consultar_ordenes'));//Endpoint 6. Consultar ordenes de compra Web
app.use('/admin/producto/',require('./Rutas/consultar_producto')); //Endpoint Numero 2, consultar producto Web
app.use('/admin/producto', require('./Rutas/eliminar_producto'));//Endpoint numero 5. Eliminar producto Web
app.use('/admin/producto', require('./Rutas/insertar_producto'));//Endpoint numero 3, Insertar producto Web
app.use('/admin/producto',require('./Rutas/listar_productos')); //Endpoint numero 1. Listar Productos Web
app.use('/producto', require('./Rutas/consultar_producto_movil'));//Endpoint numero 8. Consultar producto movil
app.use("/producto", require('./Rutas/listar_productos_movil'));//Endpoint 7. Listar productos Movil
app.use('/comprar', require('./Rutas/realizar_compra'));//Endpoint numero 10, Realizar Compra Movil

// Iniciando server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});