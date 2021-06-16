import { Router } from '../deps.ts';
import { serverRouters } from '../modules.ts';

const router = new Router();
router
  .get('/version', (context) => {
    context.response.body = Deno.version;
  });

serverRouters.push(router);
