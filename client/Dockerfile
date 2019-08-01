FROM node:10

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

COPY . .

# start app
CMD ["npm", "run", "serve"]
