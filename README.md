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

## Rutas
// completar