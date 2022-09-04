//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const router = Router();

/*router.get('/', (req,res) =>{
    res.json({"Test": "resultado test"});
});*/


module.exports = router;