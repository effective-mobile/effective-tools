import { serverRouters } from '../modules.ts';

serverRouters.pushMiddleware(
  async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = { msg: err.message };
    }
  },
  'Error',
);
