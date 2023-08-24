import { Packr } from 'msgpackr';
import { buildFastifyInstance } from './fastify.mjs';

const REDIS_KEY = 'step_4';

const packr = new Packr({
    maxSharedStructures: 8160,
    structures: []
})

const pack = packr.pack.bind(packr)
const unpack = packr.unpack.bind(packr)

async function postHandler() {
    let cachedValue = await this.redis.getBuffer(REDIS_KEY);

    if (!cachedValue) {
        cachedValue = {
            step: 4,
            createdAt: Date.now(),
            nested: {
                object: true
            }
        }
        await this.redis.set(REDIS_KEY, pack(cachedValue))
    } else {
        cachedValue = unpack(cachedValue)
    }

    return cachedValue
}

await buildFastifyInstance(postHandler)