/// <reference path="./deps.ts" />

import * as express from 'express';
import * as staticApp from './static';

let app: express.Application = express();

app.use(staticApp.app);

app.listen(3000, () => {
    console.log('http://localhost:3000');
});