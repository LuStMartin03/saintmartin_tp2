# saintmartin_tp2
Sistema de gestión para restaurante.
Branch a evaluar: main

## Integrante
- Lucía Saint Martin

## Comandos para compilar codigo fuente

1. Primero, clonar repositorio y entrar en la raiz.

2. Despues instalar las dependencias:
```npm install```

3. Crear la base de datos:
```npx prisma migrate dev```

4. Luego, compilar el codigo:
```npm run build```

5. Finalmente ejecutar con node:
```node dist/index.js```

- Compilar y ejecutar al mismo tiempo (más facil):
```npm run build && node dist/index.js```

## Decisiones de diseño y otras cosas

1. El proyecto esta hecho con TypeScript (JavaScript) como lo indica la consigna.
2. La dependencias que utiliza son: Express, Prisma ORM, JWT
3. Esta estructurado con routers, controllers y services.
4. El proceso de autenticacion esta hecho con JSON Web Tokens.
5. Los errores se manejan con una clase principal BaseError y sus subclases que devuelven distintos codigos de error dependiendo del mismo.

# Documentación de Endpoints
## Endpoints y Métodos HTTP

### Información General

* **Métodos HTTP utilizados:** `GET`, `POST`, `PATCH`, `DELETE`
* **Formato general por endpoint:**

  * **Ruta:** URL completa
  * **Header:** Autenticación
  * **Body:** Cuerpo en formato JSON
  * **Status HTTP:** Respuestas esperadas
  * **Respuesta JSON:** Datos devueltos por el servidor

---

### Admin

#### Obtener todos los administradores

* **GET** `/admin/`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body:** No lleva
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Admins obtenidos con éxito", data: admins }`

#### Registrar administrador

* **POST** `/admin/register`
* **Body JSON:** `{ email, password }`
* **Status:** `200`, `400`, `409`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Admin registrado con éxito", data: { adminId, email, password } }`

#### Login administrador

* **POST** `/admin/login`
* **Body JSON:** `{ email, password }`
* **Status:** `200`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Login exitoso", data: token }`

#### Eliminar administrador

* **DELETE** `/admin/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body:** No lleva
* **Status:** `200`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Admin eliminado con éxito", data: deletedAdmin }`

---

### Cliente

#### Obtener todos los clientes

* **GET** `/client`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Clientes obtenidos con éxito", data: clients }`

#### Registrar cliente

* **POST** `/client/register`
* **Body JSON:** `{ name, email, phone, password, address }`
* **Status:** `200`, `400`, `409`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Cliente registrado con éxito", data: client }`

#### Login cliente

* **POST** `/client/login`
* **Body JSON:** `{ email, password }`
* **Status:** `200`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Login exitoso", data: token }`

#### Eliminar cliente

* **DELETE** `/client/:id`
* **Header:** `Authorization: Bearer <token_admin/client>`
* **Status:** `200`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Cliente eliminado con éxito", data: deletedClient }`

---

### Platos

#### Obtener todos los platos

* **GET** `/menu/`
* **Status:** `200`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Menú obtenido con éxito", data: menu }`

#### Crear plato

* **POST** `/menu/createDish`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body JSON:** `{ name, description, price, category }`
* **Status:** `200`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Plato creado con éxito", data: { dishId, name, description, price, category } }`

#### Cambiar precio del plato

* **PATCH** `/menu/changePrice/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body JSON:** `{ price }`
* **Status:** `200`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Precio cambiado con éxito", data: changedDish }`

#### Eliminar plato

* **DELETE** `/menu/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Plato eliminado con éxito", data: deletedDish }`

---

### Pedido - Platos

#### Obtener registros de platos por pedido

* **GET** `/orderDish/`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Datos obtenidos con éxito", data: orderDish }`

---

### Pedido

#### Obtener todos los pedidos

* **GET** `/order/`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Pedidos obtenidos con éxito", data: orders }`

#### Ver estado de un pedido

* **GET** `/order/seeStatus/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Estado obtenido con éxito", data: status }`

#### Crear pedido

* **POST** `/order/createOrder`
* **Header:** `Authorization: Bearer <token_client>`
* **Body JSON:** `{ clientId, dishes }`
* **Status:** `200`, `400`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Pedido creado con éxito", data: newOrder }`

#### Eliminar pedido

* **DELETE** `/order/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Pedido eliminado con éxito", data: deletedOrder }`

#### Cambiar estado del pedido

* **PATCH** `/order/changeStatus`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body JSON:** `{ orderId, status }`
* **Status:** `200`, `400`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Estado cambiado con éxito", data: changedOrder }`

---

### Reservación

#### Obtener todas las reservas

* **GET** `/reservation/`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Reservaciones obtenidas con éxito", data: reservations }`

#### Crear una reserva

* **POST** `/reservation/createReservation`
* **Header:** `Authorization: Bearer <token_client>`
* **Status:** `200`, `400`, `401`, `403`, `404`, `409`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Reservación creada con éxito", data: reservation }`

#### Eliminar reserva

* **DELETE** `/reservation/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `404`, `409`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Reserva eliminada con éxito", data: deletedReservation }`

---

### Mesas

#### Obtener todas las mesas

* **GET** `/table/`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Mesas obtenidas con éxito", data: tables }`

#### Obtener mesas disponibles

* **GET** `/table/disponibility`
* **Header:** `Authorization: Bearer <token_admin|cliente>`
* **Status:** `200`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Mesas disponibles obtenidas con éxito", data: tables }`

#### Crear mesa

* **POST** `/table/createTable`
* **Header:** `Authorization: Bearer <token_admin>`
* **Body JSON:** `{ tableId, status }`
* **Status:** `200`, `400`, `401`, `403`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Mesa creada con éxito", data: table }`

#### Eliminar mesa

* **DELETE** `/table/:id`
* **Header:** `Authorization: Bearer <token_admin>`
* **Status:** `200`, `401`, `403`, `404`, `500`
* **Respuesta 200:** `{ ok: true, mensaje: "Mesa eliminada con éxito", data: deletedTable }`
