# Usa la imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el contenido de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD [ "node", "app.js" ]
