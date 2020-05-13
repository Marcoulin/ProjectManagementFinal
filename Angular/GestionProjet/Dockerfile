FROM node:latest as node
#RUN cd GestionProjet
RUN mkdir /cavpManager
WORKDIR /cavpManager

RUN npm install -g @angular/cli

COPY . /cavpManager

#RUN ng update @angular/cli --migrate-only --from=9.1.1

CMD ng serve --host 127.0.0.1 --port 4200


