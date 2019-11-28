import { app } from './config/Use';
import * as http from 'http';
import * as mongoose from 'mongoose';
import { Initscrapping } from './scrapper/Index';
import { recipe } from './models/Recipe';

const PORT = 8080;
export const server = http.createServer(app);
const username = 'test';
const password = 'test';
const url = `mongodb+srv://${username}:${password}@cheeriov2-daxgk.mongodb.net/test?retryWrites=true&w=majority`;

server.listen(process.env.port || PORT, async () => {
    console.info(`Listening on port ${process.env.port || PORT}`);

    await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).catch(err => {
        console.error(err);
    })

    await recipe.find({}).then(async (doc) => {
        if(doc.length === 0){
            await Initscrapping();
        }
    });
});

