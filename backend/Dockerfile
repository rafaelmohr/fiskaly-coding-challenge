FROM node:14-alpine

ENV NODE_ENV=development

WORKDIR /app
COPY . /app/
RUN npm install --save-dev

EXPOSE 3001/tcp

CMD ["npm", "run", "dev"]
