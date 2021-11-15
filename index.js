const express = require('express')
const product = require('./controllers/product') //Importo el .js donde he metido las funciones 
const app = express()
const port = 3000
app.use(express.json()) // Para habilitar envio de JSON al servidor
app.set('view engine', 'pug'); //usa la libreria de pug 
app.set('views','./views'); //busca las vistas en estas carpetas 


app.get('/', (req, res) => {
  res.send('Mi home de productos')
})

//http://localhost:3000/things/taniu/5 -->'/things/:name/:id' 
app.get('/things/:name/:id', function(req, res) {
    console.log(req.params);
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

app.get('/products/:id?', product.getProduct);

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


