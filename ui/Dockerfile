FROM node:latest as builder

WORKDIR /usr/src/app/client
ENV PATH /client/node_modules/.bin:$PATH
COPY package*.json ./
COPY . .
RUN npm install --save
RUN npm run build

FROM node:latest
RUN yarn global add serve
WORKDIR /usr/src/app/client
COPY --from=builder /usr/src/app/client/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
