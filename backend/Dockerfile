# Usa a imagem oficial do Node.js (versão LTS) como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do backend
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Gera o cliente Prisma
RUN npx prisma generate

# Expõe a porta 3000 (porta padrão do backend)
EXPOSE 3000

# Comando para iniciar o backend
CMD ["npm", "run", "start:prod"]