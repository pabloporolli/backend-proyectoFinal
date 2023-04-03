import axios from 'axios';

// PRUEBAS CON AXIOS: 

axios.get('http://localhost:8080/productos/')
  .then(response => {
    let docs = response.data
    console.log(docs);
  })
  .catch(error => {
    console.log(error)
  })
  .then(()=>{
    console.log(`Request finalizado`)
  });

const nuevoProducto = {
    title: "Producto Prueba",
    price: 5000,
    thumbnail: "../../uploads/1668948120923_madonesl7.png"
}

axios.post('http://localhost:8080/productos/', nuevoProducto)
    .then(response => {
        let docs = response.data
        console.log(docs);
    })
    .catch(error => {
        console.log(error)
    })
    .then(()=>{
        console.log(`Request finalizado`)
    });

