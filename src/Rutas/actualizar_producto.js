//Requerimos enrutador desde express guardamos su ejecucion en la variable router
const { Router} = require ('express');
const { route } = require('express/lib/application');
const { body, validationResult } = require('express-validator');
const router = Router();
const fs = require('fs');

//Acceso a la lectura del archivo Productos.json
const archivoProductos = fs.readFileSync('./src/Datos/Productos.json', 'utf-8');
const fileName = '../Datos/Productos.json';
const file = require(fileName);
const archivoProductosJson = JSON.parse(archivoProductos);

router.put('/:sku',[
    //Validacion de los valores recibidos
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

    //Almacenamiento del request del body y el sku de la URI
    var registro = (req.body);
    let sku = req.params.sku;

    //Buscamos el producto con el sku ingresado y reemplazamos temporalmente los nuevos valores
    for(var i = 0 ; i < file.length; i++){
        if(sku == file[i].sku){
            file[i].nombre = registro.nombre;
            file[i].precio = registro.precio;
            file[i].url = registro.url;
            file[i].marca = registro.marca;
            file[i].descripcion = registro.descripcion;
            file[i].iva = registro.iva;
            file[i].descuento = registro.descuento;
            file[i].inventario = registro.inventario;
        }
    }

    //Actualizamos el archivo Productos.json y enviamos respuesta
    fs.writeFile('./src/Datos/Productos.json', JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
    res.json("El producto fue actualizado satisfactoriamente");
});


module.exports = router;