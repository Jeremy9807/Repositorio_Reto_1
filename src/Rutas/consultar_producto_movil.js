//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const productos = require('../Datos/Productos.json');

router.get('/:sku', (req,res) =>{

    //Recibimos el parametro sku entregado en la URI 
    let sku = req.params.sku;

    //Creamos una variable donde asignaremos la respuesta solicitada de la consulta
    let consulta = {};

    //Variable donde se creara el precio final de cada producto
    let precioFinal = [];

    //Se añade cada uno de los datos solicitados en la consulta
    for(var i = 0; i < productos.length; i++){
        if(productos[i].sku == sku){
            precioFinal[i] = (productos[i].precio - (productos[i].precio * productos[i].descuento) + (productos[i].precio * productos[i].iva))
            consulta.sku = productos[i].sku;
            consulta.nombre = productos[i].nombre;
            consulta.precio = productos[i].precio;
            consulta.url = productos[i].url;
            consulta.marca = productos[i].marca;
            consulta.descripcion = productos[i].descripcion;
            consulta.iva = productos[i].iva;
            consulta.descuento = productos[i].descuento;
            consulta.precio_final = precioFinal[i];
        }
    }
    res.json(consulta);
});


module.exports = router;