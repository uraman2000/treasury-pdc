import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { AccountStatus } from "./entity/statuses/AccountStatus";
import { async } from "q";
import { ReasonForBounceStatus } from "./entity/statuses/ReasonForBounceStatus";
import { CheckDepositeStatus } from "./entity/statuses/CheckDepositeStatus";
import { ResonForHoldStatus } from "./entity/statuses/ResonForHoldStatus";
const cors = require("cors");

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then(result => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    //  await initStatus(connection);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
  })
  .catch(error => console.log(error));

async function initStatus(connection: any) {
  const accountStatus = ["ACTIVE", "RESTRUCTURED", "LEGAL", "MORATORIUM", "PUO", "CLOSED", "WRITE", "OFF"];
  const checkDespositeStatus = [
    "CLEARED",
    "BOUNCED",
    "FOR DEPOSIT-TODAY",
    "HOLD",
    "PDC",
    "UNDEPOSITED-PDC",
    "CHANGE CDS",
    "REDEPOSIT"
  ];
  const reasonForBounce = [
    "DAIF",
    "DAUD",
    "UNAUTHORIZED SIGNATORY",
    "ACCOUNT CLOSED",
    "SIGNATURE DIFFER",
    "AMOUNT & FIGURES DON'T MATCH",
    "OUT OF DATE",
    "STALE"
  ];
  const ResonForHold = [
    "REPLACEMENT OF CASH",
    "ACCOUNT UNDER LEGAL",
    "ACCOUNT UNDER MORATORIUM",
    "ACCOUNT UNDER RESTRUCTURE",
    "ACCOUNT UNDER REMEDIATION",
    "FOR DEPOSIT - SPECIFIC DAY",
    "ACCOUNT UNDER REPO",
    "(ROC):REQUESTED FOR DEPOSIT-CLEARED",
    "(ROC):REQUESTED FOR DEPOSIT-BOUNCED"
  ];

  await saveManager(connection, accountStatus, AccountStatus);
  await saveManager(connection, checkDespositeStatus, CheckDepositeStatus);
  await saveManager(connection, reasonForBounce, ReasonForBounceStatus);
  await saveManager(connection, ResonForHold, ResonForHoldStatus);
}

async function saveManager(connection: any, dataArray: any, dataTable: any) {
  await dataArray.forEach(async (element: string, key: any) => {
    await connection.manager.save(
      connection.manager.create(dataTable, {
        status: element
      })
    );
  });
}
