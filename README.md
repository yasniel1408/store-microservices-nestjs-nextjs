## Generar un recurso

```
nest generate resource <nombre_del_recurso>
```

Con este comando podemos generar codigo

## Documentar el api

```
npm install --save @nestjs/swagger

```

Podemos ir a la documentació y seguir los pasos
https://docs.nestjs.com/openapi/introduction

## Conexion a BD

```
npm i @nestjs/typeorm
npm install --save typeorm mysql2
npm install --save sqlite3

```

Podemos usar TypeORM, Mongoose o Sequealize
https://docs.nestjs.com/recipes/sql-typeorm

## Paths de desarollo

```
npm install tsconfig-paths -D
```

Para que los paths funciones tienes que instalar esta dependencia, ademas configurar jest dentro del package.json, jest-e2e.json y el tsconfig

## Validaciones de datos de entradas

```
npm i class-validator class-transformer
```

Agregamos este modulo para agregar a traves de anotaciones validaciones a los Dtos

adicionar esto en el main:

```
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```

## Para usar JWT

```
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
```

Puedes ir a esta direccion y seguir los pasos
https://docs.nestjs.com/recipes/passport#implementing-passport-jwt

## Para generar un monorepo despues de crear el proyecto base

```
nest g app users

```

Con este comando vamos a generar un proyecto de usuarios dentro de la carpeta app
https://docs.nestjs.com/cli/monorepo#workspace-projects

## Configurar .env

```
npm i --save @nestjs/config
```

https://docs.nestjs.com/techniques/configuration
