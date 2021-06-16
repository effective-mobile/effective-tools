#!/usr/bin/env -S deno run --allow-read=../.. --allow-write=../.. --allow-run --unstable --allow-net

import './configs/handler.ts';
import { Result } from './core.ts';
import { Application } from './deps.ts';
import './echo/handler.ts';
import { serverRouters } from './modules.ts';

import './version/handler.ts';

const app = new Application();

// Result converter
app.use(async (ctx, next) => {
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
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

/*
app.use((ctx) => {
  ctx.response.body = 'Hello World!';
});
*/

serverRouters.forEach(router => {
  app.use(router.routes());
  app.use(router.allowedMethods());
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
  console.log(`TypeCcript: ${typescript}`);
}
