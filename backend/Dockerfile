FROM node:20  

WORKDIR /app  

COPY package.json package-lock.json ./  
RUN npm install  

COPY . .  

EXPOSE 3002  

CMD ["node", "src/app.js"]