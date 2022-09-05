//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const productos = require('../Datos/Productos.json');

//Array para almacenar datos solicitados
let result = [];
for(var i = 0 ; i < productos.length; i++){
    result[i] = "nombre: " + productos[i].nombre + ", sku: " + productos[i].sku + ", precio: " + productos[i].precio + ", URL: " + productos[i].url + ", marca: " + productos[i].marca + ", iva: " + productos[i].iva*100 + "%, inventario: " + productos[i].inventario;    
}

//Respuesta con los datos de salida
router.get('/', (req,res) =>{
    res.json(result);
});


module.exports = router;