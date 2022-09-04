//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const { body, validationResult } = require('express-validator');
const productos = require('../Datos/Productos2.json');
const router = Router();


router.post('/', [
    //Validacion de los valores recibidos
    body('sku', 'Ingrese el sku del producto (Valor entero)').exists().isString().notEmpty(),
    body('nombre', 'Ingrese el nombre del producto').exists().isString().notEmpty(),
    body('precio', 'Ingrese el precio del producto (Valor entero)').exists().isNumeric().notEmpty(),
    body('url', 'Ingrese la URL de la imagen del producto').exists().isString().notEmpty(),
    body('marca', 'Ingrese la marca del producto').exists().isString().notEmpty(),
    body('descripcion', 'Ingrese una descripcion del producto').exists().isString().notEmpty(),
    body('iva', 'Ingrese el iva del producto (En decimales)').exists().isDecimal().notEmpty(),
    body('descuento', 'Ingrese el descuento del producto (En decimales)').exists().isDecimal().notEmpty(),
    body('inventario', 'Ingrese la cantidad en el inventario (Valor entero)').exists().isNumeric().notEmpty()
], (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
        console.log(errors);
    }
    var registro = (req.body);
    let fecha = new Date();
    let año = fecha.getFullYear();
    let mes = fecha.getMonth()+1;
    let dia = fecha.getDate();
    let fecha_creacion
    if(mes < 10){
        fecha_creacion = año + "-"+ 0 + mes + "-" + dia;
    }else{
        fecha_creacion = año + "-"+ mes + "-" + dia;
    }   
    registro.fecha_creacion=fecha_creacion;
    res.send('recibido');
});


module.exports = router;