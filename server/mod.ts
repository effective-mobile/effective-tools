#!/usr/bin/env -S deno run --allow-read=../.. --allow-write=../.. --allow-run --unstable --allow-net

import { Application } from './deps.ts';
import { serverRouters } from './modules.ts';

// Использован такой подход, так как важен порядок импортов
await import('./common/error.handler.ts');
await import('./common/logger.handler.ts');
await import('./common/timing.handler.ts');
await import('./common/response.handler.ts');
// обычные роутеры
await import('./configs/handler.ts');
await import('./echo/handler.ts');
await import('./version/handler.ts');
// замыкающие
await import('./common/notFound.handler.ts');

const app = new Application();

serverRouters.items.forEach(item => {
  const { router, middleware } = item;
  if (router) {
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
  if (middleware) {
    app.use(middleware);
  }
});

const controller = new AbortController();
const { signal } = controller;

printInfo();
await app.listen({ port: 8088, signal });

function printInfo() {
  const { deno, v8, typescript } = Deno.version;
  console.log('Start server');
  console.log(`Deno: ${deno}`);
  console.log(`V8: ${v8}`);
  console.log(`TypeScript: ${typescript}`);
}
