FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY ./src .
CMD ["npm", "run", "start"]