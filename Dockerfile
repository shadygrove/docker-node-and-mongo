# syntax=docker/dockerfile:1

FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

# Copy in our dependency definitions into image
# The last item in array is the destination path on the image
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies on image
RUN npm install --production

# Copy our source files into the image
COPY . .

# What to execute when container is booted up
CMD [ "node", "server.js" ]