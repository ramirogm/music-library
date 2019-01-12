FROM node:8.12-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# sources
COPY . .

EXPOSE 3001

# run it!
CMD ["node", "."]
