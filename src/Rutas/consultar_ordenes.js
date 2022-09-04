//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const orden = require('../Datos/Ordenes.json');
const productos = require('../Datos/Productos.json');

//Variable donde se almacenaran los productos para las ordenes
const prod = productos;

//Variable donde almacenaremos las consultas del sku del pedido con base a los productos
const respuesta=[]; 

let result = orden;

//Metodo con el que se agregaran los productos a las ordenes.
for(var i = 0; i < orden.length; i++){
    for(var j = 0; j < orden[i].productos.length; j++){
        respuesta[j] = prod.find(sku => sku.sku === orden[i].productos[j]);
        orden[i].productos[j] = "sku: " + orden[i].productos[j] + ", Nombre: " + respuesta[j].nombre + ", marca: " + respuesta[j].marca + ", URL: " + respuesta[j].url; 
    }
}

router.get('/', (req,res) =>{
    res.json(result);
});


module.exports = router;