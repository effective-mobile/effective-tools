import { serverRouters } from '../modules.ts';

serverRouters.pushMiddleware(
  async (ctx, next) => {
    console.log('Logger...');
    await next();
    const rt = ctx.response.headers.get('X-Response-Time');
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    console.log('Logger done');
  },
  'Logger',
);
