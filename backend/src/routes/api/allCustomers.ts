import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import {getAllCustomers, getCustomer} from '../../db/queries';


export default async function allCustomers(fastify: FastifyInstance){
    fastify.route({
        method: 'GET',
        url: '/customers',
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            customer_id: {type: 'string'},
                            first_name: {type: 'string'},
                            last_name: {type: 'string'},
                            mail: {type: 'string'},
                            tss_ids: {type: 'array', items: {type: 'string'},},
                        }
                    }
                }
            },
        },
        // this function is executed for every request before the handler is executed
        preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
            // E.g. check authentication
            done();
        },
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const customers: Array<Array<string>> = await getAllCustomers();

            reply.send(customers);
        }
    });
}
