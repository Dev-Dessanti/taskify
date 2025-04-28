# Usa a imagem oficial do Node.js (versão LTS) como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do frontend
COPY . .

# Expõe a porta 5173 (porta padrão do Vite)
EXPOSE 5173

# Comando para iniciar o frontend em modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]