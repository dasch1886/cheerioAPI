import { app } from './App';
import * as http from 'http';

const PORT = 8080;
const server = http.createServer(app);
server.listen(process.env.port || PORT, () => {
    console.info(`Listening on port ${process.env.port || PORT}`);
});