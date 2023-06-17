FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm ci
CMD ["npm", "start"]
EXPOSE 9002