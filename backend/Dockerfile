# Usa una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json primero (para aprovechar el cache)
COPY backend/package*.json ./

# Instalar dependencias (suponiendo que las dependencias están en la carpeta node_modules fuera de backend)
RUN npm install

# Copiar el directorio de Prisma primero (para que Prisma tenga su schema antes de generar)
COPY backend/prisma ./prisma

# Copiar el resto del código dentro de backend
COPY backend/src ./src

# Verificar que el archivo schema.prisma está en el contenedor
RUN ls -l prisma/

# Exponer el puerto en el que corre la app (si usas Express o similar)
EXPOSE 3000

# Comando para iniciar la aplicación con Prisma generate antes de ejecutar la app
CMD ["sh", "-c", "npx prisma generate && node src/app.js"]