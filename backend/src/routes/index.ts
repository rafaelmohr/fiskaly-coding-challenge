import { FastifyInstance } from 'fastify';
import api from './api';

export default async function(fastify: FastifyInstance) {
    fastify.register(api);
}
