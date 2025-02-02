import { FastifyInstance } from 'fastify';
import customer from './customer';
import allCustomers from "./allCustomers";
import addTss from "./addTss";

declare module 'fastify' {
    interface FastifyInstance {
    }
}

export default async function(fastify: FastifyInstance) {
    fastify.register(customer);
    fastify.register(allCustomers);
    fastify.register(addTss);
};
