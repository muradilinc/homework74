import {Router} from "express";
import {promises as fs} from 'fs';
import {Message} from "../types";

const messageRouter = Router();
let data: Message[] = [];

messageRouter.post('/', async (req, res) => {
  const datetime = new Date().toString();
  const message: Message = {
    message: req.body.message,
    datetime,
  };
  await fs.mkdir('./messages', {recursive: true});
  await fs.writeFile(`./messages/${datetime}.txt`, JSON.stringify(message));
  res.send(message);
});

messageRouter.get('/', async (req, res) => {
  try {
    const files = await fs.readdir('./messages');
    for (let i = files.length - 1; i >= 0 && data.length < 5; i--) {
      const fileContent = await fs.readFile('./messages' + '/' + files[i]);
      data.push(JSON.parse(fileContent.toString()));
    }
  } catch (e) {
    return data;
  }
  res.send(data);
})

export default messageRouter;