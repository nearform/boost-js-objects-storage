import { buildFastifyInstance } from './fastify.mjs';

const REDIS_KEY = 'step_1';

async function postHandler() {
    let cachedValue = await this.redis.get(REDIS_KEY);

    if (!cachedValue) {
        cachedValue = "success!"
        await this.redis.set(REDIS_KEY, cachedValue)
    }

    return cachedValue
}

await buildFastifyInstance(postHandler)