const { selectCountries, split } = require("./init");

const Koa = require("koa");
const Router = require("@koa/router");

const cors = require("@koa/cors");
const logger = require("koa-logger");

const app = new Koa();
app.use(cors()).use(logger());

const router = new Router();

router.get("/gamedata", async ctx => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
        const result = await response.json();
        
        const shortlist = [];
        await selectCountries(shortlist, result);
        ctx.body = JSON.stringify(split(shortlist));
    } catch (error) {
        console.error(error);
    }
})

app.use(router.routes());

const port = 8080;
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));