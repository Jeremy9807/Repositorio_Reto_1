//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const fs = require('fs');

//Accedemos al archivo Productos.json
const archivoProductos = fs.readFileSync('./src/Datos/Productos.json', 'utf-8');
const archivoProductosJson = JSON.parse(archivoProductos);

let respuesta = [];
router.delete('/:sku', (req,res) =>{

    //Recibimos el parametro sku de la URI
    let sku = req.params.sku;

    //Con la variable cont almacenamos todos los sku de los productos para hacer una verificacion
    let cont = [];
    for(var i = 0; i < archivoProductosJson.length; i++){
        cont[i] = archivoProductosJson[i].sku;
    }

    //Condicional para verificar que el producto que se desea eliminar sea existente
    if(cont.indexOf(sku) != -1){

        //En el array respuesta guardamos todos los productos menos el eliminado
        for(var i = 0; i < archivoProductosJson.length; i++){
            if(sku != archivoProductosJson[i].sku){
                respuesta[i] = archivoProductosJson[i];
            }
        }

        //Reemplazamos el contenido del archivo Productos.json con el producto ya eliminado y enviamos respuesta
        fs.writeFile('./src/Datos/Productos.json', JSON.stringify(respuesta, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            res.json("Producto eliminado");
        });
    }else{

        //En caso de que el producto no exista se envia la respuesta
        res.json("Producto no encontrado");
    }
    
});


module.exports = router;