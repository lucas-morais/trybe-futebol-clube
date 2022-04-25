FROM node:16-alpine

WORKDIR /api

COPY . .

RUN ["npm", "install"]

EXPOSE 3001

ENTRYPOINT [ "npm" ]

CMD ["run", "dev"]