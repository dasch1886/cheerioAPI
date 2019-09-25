import { app } from './config/Use';
import * as http from 'http';
import * as mongoose from 'mongoose';

const PORT = 8080;
export const server = http.createServer(app);
const url = 'mongodb://localhost:27017/cheerio';

server.listen(process.env.port || PORT, async () => {
    console.info(`Listening on port ${process.env.port || PORT}`);

    await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).catch(err => {
        console.error(err);
    })
});