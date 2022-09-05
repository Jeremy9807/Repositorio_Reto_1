//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const { body, validationResult } = require('express-validator');
const fs = require('fs');
//Accedemos a los archivos Ordenes.json y Productos.json
const archivoOrdenes = fs.readFileSync('./src/Datos/Ordenes.json', 'utf-8');
const archivoProductos = fs.readFileSync('./src/Datos/Productos.json', 'utf-8');

//Convertimos estos archivos a tipo JSON
const archivoOrdenesJson = JSON.parse(archivoOrdenes);
const archivoProductosJson = JSON.parse(archivoProductos);

router.post('/', [
    //Validacion de los valores recibidos
    body('productos', 'Ingrese el SKU de los productos que desea comprar (En array "[]")').exists().notEmpty(),
    body('nombre', 'Ingrese su nombre').exists().notEmpty().isString(),
    body('apellido', 'Ingrese su apellido').exists().notEmpty().isString(),
], (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array});
        console.log(errors);
    }
    var registro = (req.body);

    //Recibimos el valor total de la orden
    let acumulado = 0;
    for(var i = 0; i < registro.productos.length; i++){
        for(var j = 0; j < archivoProductosJson.length; j++){
            if(registro.productos[i] == archivoProductosJson[j].sku){
                acumulado = acumulado + (archivoProductosJson[j].precio - (archivoProductosJson[j].precio * archivoProductosJson[j].descuento) + (archivoProductosJson[j].precio * archivoProductosJson[j].iva));
            }
        }
    }

    //Creamos un registro auxiliar para almacenar la nueva orden
    var registroAux = {};
    registroAux.id = archivoOrdenesJson.length + 1;
    registroAux.nombre = registro.nombre;
    registroAux.apellido = registro.apellido;
    registroAux.total = acumulado;
    registroAux.productos = registro.productos;

    //Agregamos la nueva orden al archivo Ordenes.json
    archivoOrdenesJson.push(registroAux);
    const newOrdenes = JSON.stringify(archivoOrdenesJson);
    fs.writeFileSync('./src/Datos/Ordenes.json', newOrdenes, 'utf-8');
    res.json("Compra realizada satisfactoriamente. Orden de compra numero: " + registroAux.id);
});


module.exports = router;