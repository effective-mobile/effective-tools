import { Router, Status } from '../deps.ts';
import { serverRouters } from '../modules.ts';
import { ConfigsService } from './service.ts';

const router = new Router();
router
  .get('/config', async (context) => {
    const configsService = new ConfigsService();
    context.response.body = await configsService.list();
  })
  .get('/config/:name', async (context) => {
    const configsService = new ConfigsService();
    const name = context.params.name;
    // const text = await configsService.configText(name!);
    const text = await configsService.configJson(name!);
    if (text === undefined) {
      context.response.status = Status.NotFound;
    } else {
      context.response.body = text;
    }
  });

serverRouters.push(router);
