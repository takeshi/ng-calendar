import * as express from 'express';

export let app: express.Application = express();

app.use(express.static('./public'));
app.use("/build",express.static('./build'));
app.use("/app", express.static('./app'));
app.use("/node_modules",express.static('./node_modules'));
