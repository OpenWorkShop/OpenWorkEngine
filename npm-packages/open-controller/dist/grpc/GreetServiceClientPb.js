/**
 * @fileoverview gRPC-Web generated client stub for greet
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
import * as grpcWeb from 'grpc-web';
import * as greet_pb from './greet_pb';
export class GreeterClient {
    constructor(hostname, credentials, options) {
        this.methodInfoSayHello = new grpcWeb.AbstractClientBase.MethodInfo(greet_pb.HelloReply, (request) => {
            return request.serializeBinary();
        }, greet_pb.HelloReply.deserializeBinary);
        if (!options)
            options = {};
        if (!credentials)
            credentials = {};
        options['format'] = 'text';
        this.client_ = new grpcWeb.GrpcWebClientBase(options);
        this.hostname_ = hostname;
        this.credentials_ = credentials;
        this.options_ = options;
    }
    sayHello(request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/greet.Greeter/SayHello', request, metadata || {}, this.methodInfoSayHello, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/greet.Greeter/SayHello', request, metadata || {}, this.methodInfoSayHello);
    }
}
//# sourceMappingURL=GreetServiceClientPb.js.map