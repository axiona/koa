import ApplicationContext from '../context/context.js';
import * as compose from 'koa-compose.js';
/**
 * alternative to koa router {@see Middleware} with
 * added Response body template
 */


type Middleware<
    Context extends ApplicationContext = ApplicationContext,
    ContextNext extends ApplicationContext = Context,

> =  compose.Middleware<Context>;


export default Middleware;
