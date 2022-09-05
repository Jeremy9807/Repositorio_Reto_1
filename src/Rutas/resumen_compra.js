//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');

const router = Router();
const fs = require('fs');
//Acceso para la lecturo del archivo Productos.json
const archivo = fs.readFileSync('./src/Datos/Productos.json','utf-8');
const datosJson = JSON.parse(archivo);

//Variables necesarias para el proceso
let consulta = {};
let respuesta = [];
let precioFinal = [];
let totalCompra = 0;
router.post('/',(req,res) =>{
    let entrada = req.body;
    console.log(entrada.length);

    //Busqueda de productos con el sku solicitado
    for(var i = 0; i < entrada.length; i++){
        consulta = {};
        if(entrada[i] == datosJson[i].sku){
            precioFinal[i] = (datosJson[i].precio - (datosJson[i].precio * datosJson[i].descuento) + (datosJson[i].precio * datosJson[i].iva));
            consulta.sku = datosJson[i].sku;
            consulta.nombre = datosJson[i].nombre;
            consulta.precio_final = precioFinal[i];
            totalCompra = totalCompra + precioFinal[i];
        }else if(entrada[i] != datosJson[i].sku){
            consulta.value = "SKU " + entrada[i] +" no registrado";
        }
        respuesta[i] = consulta;
        
    }
    respuesta[entrada.length]="Total de la compra: " + totalCompra;
    res.json(respuesta);
});


module.exports = router;