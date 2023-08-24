import fastifyRedis from '@fastify/redis'
import fastify from 'fastify'

export const buildFastifyInstance = async (postHandler) => {
    const fastifyInstance = fastify()

    await fastifyInstance.register(fastifyRedis)

    await fastifyInstance.redis.flushall()

    fastifyInstance.post('/', postHandler)

    await fastifyInstance.listen({ port: 3000 })
}