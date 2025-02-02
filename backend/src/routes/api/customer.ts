import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import {insertNewCustomer} from '../../db/queries';
import {newUUID} from "../../helper/UUIDGenerator";


export default async function addCustomer(fastify: FastifyInstance){
  fastify.route({
    method: 'POST',
    url: '/customer',
    schema: {
      response: {
        200: { type: 'null' }
      },
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          mail: { type: 'string' },
        },
        required: ['firstName', 'lastName', 'mail'],
      }
    },
    // this function is executed for every request before the handler is executed
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      // E.g. check authentication
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      // @ts-ignore
      const {firstName, lastName, mail} = request.body;
      const customerId = newUUID();

      await insertNewCustomer(customerId, firstName, lastName, mail);

      reply.status(200).send()
    }
  });
}
