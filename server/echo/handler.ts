import { Router } from '../deps.ts';
import { serverRouters } from '../modules.ts';

const router = new Router();
router
  .post('/echo', async (context) => {
    const result = context.request.body();
    const body = await result.value;
    console.log(body);
    context.response.body = body;
  });

serverRouters.push(router);
