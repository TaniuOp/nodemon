// const data =require ("../models/product")
//leer los datos de todos los productos (dentro de carpeta models)
// console.log(data)

const dataProduct = require ('../utils/product')

const getProduct = async (req,res) => {
    console.log("*******************");
    console.log(req.params);
    let data
    if(req.params.id){ //si me pasan un id por la url, hago: 
        // res.send('He recibido esto: --> id: ' + req.params.id)
        // res.render('product', {id:req.params.id}) //Obtengo el id Para usarlo en el html de product.pug
        // aqui se haria el manejo de error 
        data = await dataProduct.getProductById(req.params.id);
        // res.render('product', {products: [data[req.params.id]]}) //Array de un elemento de data 
        res.render('product', {products: [data]}) //Obtener la data 

    } else{
        data = await dataProduct.getAllProducts();
        res.render('product', {products:data}) //mostramos todos los productos (array con N datos)
    }
}

const createProduct = async (req,res)=> {
    console.log("***************");
    console.log(req.body); //En re.body esta el objeto a guardar 
    const result = await dataProduct.createProduct(req.body)
    res.status(201).send('Nuevo producto creado');
}

const product = {
    getProduct,
    createProduct
}

module.exports = product;

// MISMA MANERA DE DECLARAR LO DE ARRIBA por separado: 
// const product = {
//     getProduct: (req,res)=>{
//         console.log("*******************");
//         console.log(req.params);
//         res.send('He recibido esto: --> id: ' + req.params.id + ' and name: ' + req.params.name);
//     },
//     createProduct: (req,res)=>{
//         console.log("***************");
//         console.log(req.body);
//         res.status(201).send('Nuevo producto creado');
//     }
// }
