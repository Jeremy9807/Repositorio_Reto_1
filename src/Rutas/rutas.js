//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();
const orden = require('../Datos/Ordenes.json');

console.log(orden.lenght);
let result = [];
for(var i = 0; i < orden.lenght; i++){
    result[i] = "id: " + ordenes[i].id
}

router.get('/', (req,res) =>{
    res.json(result);
});


module.exports = router;