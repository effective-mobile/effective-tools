import { serverRouters } from '../modules.ts';

serverRouters.pushMiddleware(
  (ctx) => {
    ctx.response.status = 404;
    ctx.response.body = { msg: 'Not Found' };

    console.log('notFound.handler.ts invoked');
  },
  'Not found route',
);
