import { buildFastifyInstance } from './fastify.mjs';

import flat from 'flat';

const { flatten, unflatten } = flat

const REDIS_KEY = 'step_3_flatten';

async function postHandler() {
    let cachedValue = await this.redis.hgetall(REDIS_KEY);

    if (Object.keys(cachedValue).length === 0) {
        cachedValue = {
            step: 3,
            createdAt: Date.now(),
            nested: {
                object: true
            }
        }
        await this.redis.hset(REDIS_KEY, flatten(cachedValue))
    } else {
        cachedValue = unflatten(cachedValue)
    }

    return cachedValue
}

await buildFastifyInstance(postHandler)