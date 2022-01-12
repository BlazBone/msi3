# FROM golang:1.8
# WORKDIR /serv
# COPY main.go .
# RUN go build -o webserver .
# CMD ./webserver

FROM golang:1.8-alpine AS prvi
WORKDIR /serv
COPY main.go .
RUN go build -o webserver .

FROM alpine
WORKDIR /serv
COPY --from=prvi /serv /serv/
CMD ./webserver



