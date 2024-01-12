import express from 'express';
import messageRouter from "./routes/message";
import {promises as fs} from 'fs';

const app = express();
const port = 8000;

app.use(express.json());

app.use('/messages', messageRouter);

const run = async () => {
  const files = await fs.readdir('./messages');
  files.forEach(file => {
    console.log('./message' + '/' + file);
  });
};

app.listen(port, () => {
  console.log('we online port: ' + port);
});

void run().catch(console.error);
