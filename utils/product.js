const fetch= require ('node-fetch') //require and import es lo mismo 

const getAllProducts = async () => {
    const data = await fetch('https://fakestoreapi.com/products')
    const allProducts = await data.json()
        // .then(res=>res.json())
        // .then(json=>console.log(json))
        // console.log(products)
    return(allProducts)
}

const getProductById = async (id) => {
    const data = await fetch('https://fakestoreapi.com/products/'+id)
    const oneProduct = await data.json()
        // .then(res=>res.json())
        // .then(json=>console.log(json))
        // console.log(oneProduct)
    return(oneProduct)
}

const createProduct = async (product) => {
    const data = await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(product)
        })
        const res = await data.json()
        return res
}

const product = {
    getProductById,
    getAllProducts,
    createProduct
}

module.exports = product;


// //Uso de promesa para imprimir todos los productos 
getAllProducts()
.then(data=>console.log(data)) 

// //Uso de promesa para imrpimir un producto por id 
getProductById()
.then(data=>console.log(data)) 

const newProduct = {
    title: 'My added product',
    price: 13,
    description: 'lorem ipsum lorem ipsum set set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}

// Crear un producto 
    createProduct(newProduct).then(data=>console.log(data))

//No vale un console.log en este caso porque imprime la promersa console.log(getAllProducts()) 
