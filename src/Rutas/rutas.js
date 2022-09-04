//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const productos = require('../Datos/Productos.json');

router.get('/:sku', (req,res) =>{

    let sku = req.params.sku;

    let consulta;
    for(var i = 0; i < productos.length i++){
        if(productos[i].sku == sku){
            consulta = productos[i];
        }
    }
    res.json(consulta);
});


module.exports = router;