FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . ./
RUN npm run build --aot --prod
EXPOSE 8080
ENV MONGODB_URL=mongodb+srv://admin:i6808pREhmdCW5JR@clustermanagment-ibgct.mongodb.net/managment?retryWrites=true&w=majority
ENV JWT_KEY=WinterIsComingGOT2019
ENV PORT=8080
ENV DB=app
ENV GITLAB_TOKEN=WYY1WY2Esv63mpsabrqU
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
CMD [ "node", "app.js" ]
