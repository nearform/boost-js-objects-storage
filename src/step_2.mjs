import { buildFastifyInstance } from './fastify.mjs';

const REDIS_KEY = 'step_2';

async function postHandler() {
    let cachedValue = await this.redis.hgetall(REDIS_KEY);

    if (Object.keys(cachedValue).length === 0) {
        cachedValue = {
            step: 2,
            createdAt: Date.now()
        }
        await this.redis.hset(REDIS_KEY, cachedValue)
    }

    return cachedValue
}

await buildFastifyInstance(postHandler)