const express = require('express')
const product = require('./controllers/product') //Importo el .js donde he metido las funciones 
const app = express()
const port = 3000
app.use(express.json()) // Para habilitar envio de JSON al servidor
app.set('view engine', 'pug'); //usa la libreria de pug 
app.set('views','./views'); //busca las vistas en estas carpetas 

// Funcion para validar si se envia en la peticion (url) que se envía un ApiKey
function hasApiKey(req, res, next){
  if(req.query.API_KEY && req.query.API_KEY=="hola123"){
    next();
  }
  else{
    const errorData ={
      message: "Missing or wrong Api key",
      url: "https://blogs.unsw.edu.au/nowideas/files/2018/11/error-no-es-fracaso.jpg"
    }
    res.status(403).render("error", errorData);
  }
}

// añadir middleware para validacion de apikey en todas las rutas 
// app.use(hasApiKey) 


app.get('/', (req, res) => {
  res.send('Mi home de productos')
})

//http://localhost:3000/things/taniu/5?age=3&location=madrid --> Para añadir parametros de tura sin afectar la ruta base 
//http://localhost:3000/things/taniu/5 -->'/things/:name/:id' 
app.get('/things/:name/:id', function(req, res) {
    console.log(req.params);
    console.log(req.query);
    res.send(`He recibido esto: --> id: ${req.params.id} and name:${req.params.name}
    Y de query params: ${req.query.age} ${req.query.location}`);
}); 

//http://localhost:3000/products/6?API_KEY=123
app.get('/products/:id?',hasApiKey, product.getProduct); //Se le añade la validacion del apikey 

//Retiro la funcion de este .js y la envío al fichero products.js para importarla 
app.post('/products', product.createProduct); 
    // app.post('/products', function(req, res) {
    // console.log(req.body);
    // res.status(201).send("Nuevo producto");
    // });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Uso de libreria de pug en first_template.html
app.get('/first_template', function(req, res){
    const othernumber= Math.floor(Math.random() * (7 - 1) + 1);
    res.render('first_view', {name: "Taniu", number:Math.random(), othernumber}); //res.render sirve para renderizar (reemplazamos el send)
 });

// function isAdmin(req, res, next){
//   if(req.body.isAdmin){
//     next();
//   } else{
//     res.status(403).send("Sorry, you need to be admin")
//   }
// }
// app.use(isAdmin) 


//  Capture All 404 errors
 app.use(function (req,res,next){
    const errorData = {
    message:"Error! 404 not found",
    url: "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
  }
  res.status(404).render("error", errorData)
 });


