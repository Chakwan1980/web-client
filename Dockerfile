# Etapa de construcción
FROM node:22-alpine AS buildstage

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:1.27-alpine

# Copiar los archivos compilados a la imagen de nginx
COPY --from=buildstage /usr/src/app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
