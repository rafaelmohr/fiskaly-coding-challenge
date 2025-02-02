import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import {doesCustomerExist, insertTssIdToCustomer} from '../../db/queries';

export default async function addTss(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/addTss',
    schema: {
      response: {
        200: { type: 'null' },
        404: { type: 'object', properties: { error: { type: 'string' } } },
      },
      body: {
        type: 'object',
        properties: {
          customerId: { type: 'string' },
          tssId: { type: 'string' },
        },
        required: ['customerId', 'tssId'],
      },
    },
    // this function is executed for every request before the handler is executed
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      // E.g. check authentication
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      // @ts-ignore
      const { customerId, tssId } = request.body;

      // check if customer actually exists
      const exists = (await doesCustomerExist(customerId))[0].exists;
      if (!exists) reply.status(404).send({ error: 'Customer not found' });

      // add new tss
      const insertResult = await insertTssIdToCustomer(customerId, tssId);

      if (insertResult.length === 0) {
        reply.status(500).send();
      }

      reply.send();
    },
  });
}
