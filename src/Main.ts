import { app } from './config/Use';
import * as http from 'http';
import * as mongoose from 'mongoose';

const PORT = 8080;
const server = http.createServer(app);
const url = 'mongodb://localhost:27017/cheerio';

server.listen(process.env.port || PORT, async () => {
    console.info(`Listening on port ${process.env.port || PORT}`);

    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).then(
        () => console.info(`connected with mongodb ${url}`),
        (err: Error) => console.error(err.message)
    );
});