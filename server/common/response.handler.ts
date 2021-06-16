import { Result } from '../core.ts';
import { serverRouters } from '../modules.ts';

serverRouters.pushMiddleware(
  async (ctx, next) => {
    console.log('Result converter...');
    await next();
    const result = ctx.response.body;
    // console.log('result', result)
    if (result instanceof Result) {
      const { status, body } = result.response;
      if (status !== undefined) {
        ctx.response.status = status;
      }
      ctx.response.body = body;
    }
    console.log('Result converter done');
  },
  'Response converter',
);
