# [EASYORDERS](https://github.com/ManoloDisaronnor/EasyOrders)
Proyecto desarrollado por Manuel usando React-Native y Node.js  

## INSTALACIÓN Y EJECUCIÓN
### PASOS PREVIOS A LA INSTALACIÓN
Primero hay que ejecutar el script de la carpeta "CREAR ESQUEMA Y TABLAS" para crear el esquema en base de datos  
  
Después hay que ejecutar ***EN ORDEN SEGÚN INDICAN LOS NÚMEROS*** los scripts de la carpeta "INSERCION DATOS"  
  
Una vez realizados estos pasos previos a la instalación, estaremos listos para instalar y ejecutar el programa
### INSTALACIÓN Y EJECUCIÓN
Para la instalación hay que usar la línea de comandos, primero debemos instalar las dependencias dentro de ambas carpetas con el siguiente comando:


```
npm install
```

Después, podremos ejecutar primero el backend con el comando:

```
npm run dev
```

Y el frontend en react con el comando:

```
npx expo start
```

## OTROS DATOS DE INTERES
### CONEXIÓN A LA BASE DE DATOS
Los parametros para conectarse a la base de datos son los siguientes:  
  
port: 3000,  
db.host: "localhost",  
db.user: "root",  
db.password: "test",  
db.name: "EasyOrders",  
db.port: 3306,
