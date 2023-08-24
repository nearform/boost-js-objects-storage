import { once } from 'events';
import fs from 'fs';

fs.rmSync('./src/large-json.json')
const writeStream = fs.createWriteStream('./src/large-json.json')

writeStream.write('[')
for (let i = 0; i < 10_000_000; i++) {
    const toWrite = JSON.stringify({
        createdAt: Date.now(),
        nested: {
            object: true
        }
    })

    if (!writeStream.write(toWrite)) {
        await once(writeStream, 'drain');
    }

    if (i < 9_999_999) {
        writeStream.write(',')
    }

    writeStream.write('\n')
}
writeStream.end(']')