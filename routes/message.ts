import {Router} from "express";
import {promises as fs} from 'fs';
import {Message} from "../types";

const messageRouter = Router();
const data: Message[] = [];

messageRouter.post('/', async (req, res) => {
  const datetime = new Date().toString();
  const message: Message = {
    message: req.body.message,
    datetime,
  };
  await fs.writeFile(`./messages/${datetime}.txt`, JSON.stringify(message));
  res.send(message);
});

export default messageRouter;