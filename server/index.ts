// import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';
import * as os from 'os';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export function fthRoute(req, _res) {
  console.log('hereee', os.hostname());
  // const infos = {
  //   hostname: os.hostname(),
  //   cpus: os.cpus()
  // };
  // console.log('infos', infos);
  // res.send(infos);
  return req;
}

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get('/api/fth', (_req, res) => {
    const infos = {
      hostname: os.hostname(),
      cpus: os.cpus()
    };
    console.log('infos', infos);
    res.json(infos);
    // console.log('hre1', os.hostname());
  });
  // console.log('hre1', os.hostname());

  app.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else if (pathname === '/fth') {
      const cpus = os.cpus();
      console.log('cpus', cpus);
      app.render(req, res, '/b', {});
    } else {
      handle(req, res, parsedUrl);
    }
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
