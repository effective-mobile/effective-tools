import { serverRouters } from '../modules.ts';

serverRouters.pushMiddleware(
  async (ctx, next) => {
    console.log('Timing...');
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set('X-Response-Time', `${ms}ms`);
    console.log('Timing done');
  },
  'Timing',
);
