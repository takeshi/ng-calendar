/// <reference path="../../typings/main.d.ts" />
import * as express from 'express';

let app: express.Application = express();


app.use(express.static('./public'));
app.use(express.static('./build/client'));
app.use("/app", express.static('./app'));
app.use(express.static('./node_modules'));

app.listen(3000, () => {
    console.log('http://localhost:3000');
});