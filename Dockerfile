FROM node:14.15-alpine
EXPOSE 8000
RUN npm i -g nodemon
RUN mkdir -p /var/www/smootbox/backend
WORKDIR /var/www/smootbox/backend
COPY . /var/www/smootbox/backend
CMD ["npm", "run", "serve"]
