import koa from 'koa';
import logger from 'koa-logger';
import route from 'koa-route';


const app = koa();

app.use(logger());

app.use(route.get('/webhook', webhook));

function *webhook() {
    console.log(this.request);

    const {query} = this.request;
    const mode = query['hub.mode'];
    const challenge = query['hub.challenge'];
    const verifyToken = query['hub.verify_token'];

    if (mode === 'subscribe') {
        if (verifyToken === 'LOLTOKEN') {
            this.body = challenge;
            this.status = 200;
        } else {
            this.status = 400;
        }
    } else {
        this.status = 400;
    }
}

app.listen(80);
