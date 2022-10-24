# Building image
# docker build . -t example-image-name

# Install dependencies only when needed
FROM node:14-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
#COPY package.json yarn.lock ./
COPY package.*  ./
#RUN yarn install --production
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install --production
#RUN npm install && npm cache clean --force --loglevel=error

COPY . .

EXPOSE 4000

#ENV PORT 4000

CMD [ "node", "index.js"]
