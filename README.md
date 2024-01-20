# Tokenización de Tarjetas

Las pasarelas de pagos guardan las tarjetas de crédito en una bóveda encriptada (encriptación en reposo) para evitar que la información sensible se pueda filtrar o que pueda ser interceptada en otro proceso del sistema.

El proceso de tokenización funciona enviando los datos de la tarjeta al tokenizador, este valida y guarda la información en la BD encriptada y devuelve un ID (token) como llave del registro el cual puede ser usado luego en los distintos procesos de culqi.

En el siguiente gráfico puedes ver donde se usa este API de tokenización en el proceso de autorización de una tarjeta de crédito.

### Tecnologías Utilizadas

- Backend: NodeJS Typescript
- BD no relacional: Redis
- Test: Jest Typescript

## Uso

Antes que nada clone el repositorio con `git clone` en su computadora o equipo de trabajo.

### Instalar dependencias

```bash
$ cd tokenizer-culqi
$ yarn ó npm install
```

### Instalación de Redis:

Este proyecto usa `redis` como base de datos. Asegúrate de tenerlo instalador en tu equipo de desarrollo. Esta aplicación se conectará usando los parámetros por defecto de `redis`.

```bash
# .env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

También existen otra variables de entornos para configurar cosas más expecíficas de la aplicación:

```bash
# .env
TOKENIZER_EXPIRATION_TOKEN=900 # in seconds = 15 min
TOKENIZER_TOKEN_LENGTH=16
```

### Ejecutando la aplicación

Una vez instaladas todas las dependencias ejecute los siguientes comandos:

#### Ejecute los test para validar que todo va como debe:

```bash
yarn run test
```

#### Ejecute la aplicación localmente (modo offline):

Esto levantará un servidor local que simulará en entorno de API Gateway Service.

```bash
yarn run dev
```

#### Desplegar la aplicación en la nube:

```bash
yarn run deploy
```