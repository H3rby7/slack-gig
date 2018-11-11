import * as express from "express";
import {processSlackSlashCommand} from "./slack";
import {NextFunction, Request, Response} from 'express-serve-static-core';
import {SlackSlashCommandBody} from './model/slack-slash-command-body';

export const router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('alive');
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  if (!req || !req.body) {
    console.log('no body');
    res.status(500).send('Missing Request Body');
    return next;
  }
  const body = req.body as SlackSlashCommandBody;
  res.send(processSlackSlashCommand(body));
});
