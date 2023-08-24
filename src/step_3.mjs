import { buildFastifyInstance } from './fastify.mjs';

const REDIS_KEY = 'step_3';

async function postHandler() {
    let cachedValue = await this.redis.get(REDIS_KEY);

    if (!cachedValue) {
        cachedValue = {
            step: 3,
            createdAt: Date.now(),
            nested: {
                object: true
            }
        }
        await this.redis.set(REDIS_KEY, JSON.stringify(cachedValue))
    } else {
        cachedValue = JSON.parse(cachedValue)
    }

    return cachedValue
}

await buildFastifyInstance(postHandler)