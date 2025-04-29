# Estágio de construção
FROM node:20 AS builder

# Instale o OpenSSL para compatibilidade com Prisma
RUN apt-get update -y && apt-get install -y openssl

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração do npm
COPY package*.json ./

# Instale todas as dependências (incluindo devDependencies para build)
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Gere o Prisma Client e compile o código TypeScript
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM node:20-slim

# Instale o OpenSSL no estágio de produção
RUN apt-get update -y && apt-get install -y openssl

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários do estágio de construção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/prisma ./prisma

# Instale apenas as dependências de produção
RUN npm install --omit=dev

# Exponha a porta da aplicação
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["node", "dist/src/main.js"]