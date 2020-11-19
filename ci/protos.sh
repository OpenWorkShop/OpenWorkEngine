#!/bin/bash

proto_src="../Makerverse/Protos"
npm_oc="./npm-packages/open-controller"
web_out="${npm_oc}/src/grpc"

protoc "greet.proto" --proto_path ${proto_src} \
 --js_out=import_style=commonjs:${web_out} \
 --grpc-web_out=import_style=typescript,mode=grpcwebtext:${web_out}
