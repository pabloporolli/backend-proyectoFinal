### 1. Envío de mail de confirmación
Se realiza cuando se agrega un producto al carrito.
Para que funcione, hay que volver a configurar el mail del receptor. Ahora hay un ethereal mail que expira.
La nueva dirección de correo se debe agregar en el archivo mensajes.js, dentro de la carpeta gestionMensajes, en las líneas 6 y 12. En la línea 13, se debe poner el pass.

### 2. Envío de WhatsApp
La entrega es un entorno de desarrollo. Por ello, se utiliza un console.log para mostrar el envío correcto del WA. Para que la persona lo reciba, tiene que configurar su número en la línea 47 de mensajes.js.

### 3. PRUEBAS EN POSTMAN

## Agregar un producto al listado de productos
Método Post
http://localhost:8070/productos
{
    "title": "Madone SLX",
    "price": 6000,
    "thumbnail": "bici.com"
}

## Borrar un producto del listado de productos
Método Delete
http://localhost:8070/productos/40
El 40 es un ejemplo de id del producto

## Ver un producto del listado de productos según su id
Método get
http://localhost:8070/productos/40
El 40 es un ejemplo de id del producto
También se puede hacer por el navegador

## Modificar un producto del listado de productos a partir de su id
Método Put
http://localhost:8070/productos/40
{
    "title": "nueva bici",
    "price": 999,
    "thumbnail": "bici.com"
}

## Crear un carrito y asignarle productos
Importante: Para estas acciones sobre el carrito, el cliente tiene que estar loggeado.
Método Post (Body - Raw - Json)
http://localhost:8070/carrito
[{
    "title": "Madone SLX",
    "price": 6000,
    "thumbnail": "bici.com",
    "id": 1
},
{
    "title": "Madone",
    "price": 900,
    "thumbnail": "bici.com",
    "id": 2
}
]

## Ver un carrito según su id
Método Get
http://localhost:8070/carrito/2

## Borrar un producto de un carrito
Método Delete
http://localhost:8070/carrito/3/1
Se borra el producto 1 del carrito 3

## Borrar todo un carrito
Método Delete
http://localhost:8070/carrito/1

## Agregar un producto a un carrito ya existente
Método Post
http://localhost:8070/carrito/4/1
Se agrega el producto 1 al carrito 4

### 4. Administradores
¿Cómo realizar la prueba de administrador para las rutas de agregar producto, modificar producto y borrar producto?
Al no haber front para productos y tener que utilizar Postman para pasar las queries, no se pueden usar los middlewares de validación de manera directa y automática. Por ello, hemos dejado comentadas las líneas 34, 35 y 36 de código en el archivo routerProductos.js. Para hacer las pruebas, esas líneas deben des-comentarse y comentar las líneas 43, 45 y 47.

Todos los ususarios se guardan como usuarios por default (admin: flase). 

El usuario administrador es:
email: enzo@river.com
pass: 1234

### 5. Persistencias
La persistencia de productos y carritos está desarrollada en Mongo Atlas.
La persistencia de los mensajes está desarrollada en archivo.

### 6. Finalizar compra
Para ver la funcionalidad de finalizar compra, se debe hacer desde el navegador, poniendo por parámetro el carrito que se desea comprar. Ejemplo:
http://localhost:8070/carrito/2/finalizar-compra

