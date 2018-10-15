import * as express from "express";
import {AuftrittsHandler} from "./auftritt";

export const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('alive');
});

router.post('/', AuftrittsHandler);
