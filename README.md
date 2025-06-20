# saintmartin_tp2
Sistema de gestión para restaurante.
Branch a evaluar: main

## Integrante
- Lucía Saint Martin

## Comandos para compilar codigo fuente

1. Primero instalar las dependencias:
```npm install```
2. Para prisma: // ver
```npx prisma generate```
```npx prisma db push --force-reset``` // no necesario
3. Luego, compilar el codigo:
```npm run build```
4. Finalmente ejecutar con node:
```node dist/index.js```

- Compilar y ejecutar al mismo tiempo (más facil):
```npm run build && node dist/index.js```

## Decisiones de diseño y otras cosas

1. El proyecto esta hecho con TypeScript (JavaScript) como lo indica la consigna.
2. La dependencias que utiliza son: Express, Prisma ORM, etc. // completar
3. Esta estructurado con routers, controllers y services.
4. El proceso de autenticacion esta hecho con JSON Web Tokens.
5. Los errores se manejan con una clase principal BaseError y sus subclases que devuelven distintos codigos de error dependiendo del mismo.

# Documentación de Endpoints
# API REST - Documentación de Endpoints

## Métodos HTTP utilizados

* `GET`
* `POST`
* `PATCH`
* `DELETE`

---

## Admin

### Obtener todos los administradores

* **Método:** GET
* **URL:** `http://localhost:3000/admin/`
* **Header:**

  * Authorization: Bearer `<token_admin>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Admins obtenidos con éxito",
  "data": [admins]
}
```

### Registrar administrador

* **Método:** POST
* **URL:** `http://localhost:3000/admin/register`
* **Header:** Ninguno
* **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

* **HTTP Status:** 200, 400, 409, 500
* **Respuesta:**

```json
{
  "mensaje": "Admin registrado con éxito",
  "data": {admin}
}
```

### Login administrador

* **Método:** POST
* **URL:** `http://localhost:3000/admin/login`
* **Header:** Ninguno
* **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

* **HTTP Status:** 200, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Login exitoso",
  "data": { "token": "..." }
}
```

### Eliminar administrador

* **Método:** DELETE
* **URL:** `http://localhost:3000/admin/:id`
* **Header:**

  * Authorization: Bearer `<token_admin>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Admin eliminado con éxito",
  "data": {deletedAdmin}
}
```

## Cliente

### Obtener todos los clientes

* **Método:** GET
* **URL:** `http://localhost:3000/client`
* **Header:** Authorization: Bearer `<token_admin>`
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Clientes obtenidos con éxito",
  "data": [clients]
}
```

### Registrar cliente

* **Método:** POST
* **URL:** `http://localhost:3000/client/register`
* **Header:** Ninguno
* **Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "number",
  "password": "string",
  "address": "string"
}
```

* **HTTP Status:** 200, 400, 409, 500
* **Respuesta:**

```json
{
  "mensaje": "Cliente registrado con éxito",
  "data": {client}
}
```

### Login cliente

* **Método:** POST
* **URL:** `http://localhost:3000/client/login`
* **Header:** Ninguno
* **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

* **HTTP Status:** 200, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Login exitoso",
  "data": { "token": "..." }
}
```

### Eliminar cliente

* **Método:** DELETE
* **URL:** `http://localhost:3000/client/:id`
* **Header:** Authorization: Bearer `<token_admin/client>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Cliente eliminado con éxito",
  "data": {deletedClient}
}
```

## Platos

### Obtener todos los platos

* **Método:** GET
* **URL:** `http://localhost:3000/menu/`
* **Header:** Ninguno
* **Body:** No
* **HTTP Status:** 200, 500
* **Respuesta:**

```json
{
  "mensaje": "Menú obtenido con éxito",
  "data": [menu]
}
```

### Crear plato

* **Método:** POST
* **URL:** `http://localhost:3000/menu/createDish`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:**

```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string"
}
```

* **HTTP Status:** 200, 500
* **Respuesta:**

```json
{
  "mensaje": "Plato creado con éxito",
  "data": {dish}
}
```

### Cambiar precio del plato

* **Método:** PATCH
* **URL:** `http://localhost:3000/menu/changePrice/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:**

```json
{
  "price": number
}
```

* **HTTP Status:** 200, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Precio cambiado con éxito",
  "data": {changedDish}
}
```

### Eliminar plato

* **Método:** DELETE
* **URL:** `http://localhost:3000/menu/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:** No
* **HTTP Status:** 200, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Plato eliminado con éxito",
  "data": {deletedDish}
}
```

## Pedido

### Obtener todos los pedidos

* **Método:** GET
* **URL:** `http://localhost:3000/order/`
* **Header:** Authorization: Bearer `<token_admin>`
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Pedidos obtenidos con éxito",
  "data": [orders]
}
```

### Ver estado de un pedido

* **Método:** GET
* **URL:** `http://localhost:3000/order/seeStatus/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **HTTP Status:** 200, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Estado obtenido con éxito",
  "data": "string"
}
```

### Crear pedido

* **Método:** POST
* **URL:** `http://localhost:3000/order/createOrder`
* **Header:** Authorization: Bearer `<token_client>`
* **Body:**

```json
{
  "clientId": number,
  "dishes": [number]
}
```

* **HTTP Status:** 200, 400, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Pedido creado con éxito",
  "data": {newOrder}
}
```

### Eliminar pedido

* **Método:** DELETE
* **URL:** `http://localhost:3000/order/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:**

```json
{
  "tableId": number,
  "clientId": number
}
```

* **HTTP Status:** 200, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Pedido eliminado con éxito",
  "data": {deletedOrder}
}
```

### Obtener platos por pedido

* **Método:** GET
* **URL:** `http://localhost:3000/orderDish/`
* **Header:** Authorization: Bearer `<token_admin>`
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Datos obtenidos con éxito",
  "data": [orderDish]
}
```

## Reservación

### Obtener todas las reservas

* **Método:** GET
* **URL:** `http://localhost:3000/reservation/`
* **Header:** Authorization: Bearer `<token_admin>`
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Reservaciones obtenidas con éxito",
  "data": [reservations]
}
```

### Crear una reserva

* **Método:** POST
* **URL:** `http://localhost:3000/reservation/createReservation`
* **Header:** Authorization: Bearer `<token_client>`
* **Body:** No
* **HTTP Status:** 200, 400, 401, 403, 404, 409, 500
* **Respuesta:**

```json
{
  "mensaje": "Reservación creada con éxito",
  "data": {reservation}
}
```

### Eliminar reserva

* **Método:** DELETE
* **URL:** `http://localhost:3000/order/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 404, 409, 500
* **Respuesta:**

```json
{
  "mensaje": "Reserva eliminada con éxito",
  "data": {deletedReservation}
}
```

## Mesas

### Obtener todas las mesas

* **Método:** GET
* **URL:** `http://localhost:3000/table/`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Mesas obtenidas con éxito",
  "data": [tables]
}
```

### Obtener mesas disponibles

* **Método:** GET
* **URL:** `http://localhost:3000/table/disponibility`
* **Header:** Authorization: Bearer `<token_admin>` o `<token_client>`
* **Body:** No
* **HTTP Status:** 200, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Mesas disponibles obtenidas con éxito",
  "data": [tables]
}
```

### Crear mesa

* **Método:** POST
* **URL:** `http://localhost:3000/table/createTable`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:**

```json
{
  "tableId": number,
  "status": "string"
}
```

* **HTTP Status:** 200, 400, 401, 403, 500
* **Respuesta:**

```json
{
  "mensaje": "Mesa creada con éxito",
  "data": {table}
}
```

### Eliminar mesa

* **Método:** DELETE
* **URL:** `http://localhost:3000/table/:id`
* **Header:** Authorization: Bearer `<token_admin>`
* **Body:**

```json
{
  "tableId": number,
  "clientId": number
}
```

* **HTTP Status:** 200, 401, 403, 404, 500
* **Respuesta:**

```json
{
  "mensaje": "Mesa eliminada con éxito",
  "data": {deletedTable}
}
```