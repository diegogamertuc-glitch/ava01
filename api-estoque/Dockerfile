# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o código-fonte da aplicação para o contêiner
COPY . .

# Expõe a porta que a aplicação usa dentro do contêiner
EXPOSE 3000

# Define o comando para executar a aplicação quando o contêiner iniciar
CMD ["node", "index.js"]