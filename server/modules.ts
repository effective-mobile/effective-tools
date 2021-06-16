import { Router, Middleware } from './deps.ts';

const _serverRouters: { router?: Router; middleware?: Middleware; name?: string }[] = [];

export const serverRouters = {
  pushRouter(item: Router) {
    _serverRouters.push({ router: item });
  },
  pushMiddleware(item: Middleware, name: string) {
    _serverRouters.push({ middleware: item, name });
  },
  get items() {
    console.log('items', _serverRouters);
    return _serverRouters;
  },
};
