//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const productos = require('../Datos/Productos.json');

//Array donde almacenaremos los datos solicitados y el precio final de cada producto
let result = [];
let precioFinal = [];
for(var i = 0; i < productos.length; i++){
    if(productos[i].inventario > 0){
        precioFinal[i]= productos[i].precio - (productos[i].precio * productos[i].descuento) + (productos[i].precio * productos[i].iva);
        result[i] = "nombre: " + productos[i].nombre + ", sku: " + productos[i].sku + ", URL: " + productos[i].url + ", marca: " + productos[i].marca + ", Precion final: " + precioFinal[i];    
    }
    
}
//Respuesta enviada con los datos solicitados
router.get('/', (req,res) =>{
    res.json(result);
});


module.exports = router;