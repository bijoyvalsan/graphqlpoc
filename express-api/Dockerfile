FROM node:10
ENV PORT=5003

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
COPY ./ /app/
COPY yarn.lock /app/
RUN yarn install

EXPOSE 3006
CMD [ "yarn", "start" ]