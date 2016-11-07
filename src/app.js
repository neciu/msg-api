import koa from 'koa';
import logger from 'koa-logger';
import route from 'koa-route';
import bodyParser from 'koa-bodyparser';


const app = koa();

app.use(logger());
app.use(bodyParser());

app.use(route.get('/webhook', getWebhook));
app.use(route.post('/webhook', postWebhook));

function *getWebhook() {
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

function *postWebhook() {
    console.log(this.request);
    console.log('body', JSON.stringify(this.request.body, null, 2));
    this.status = 200;
}

app.listen(80);
