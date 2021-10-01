import Context from "../../middleware/context/context";
import {Next} from "koa";
import Log from "@dikac/t-syslog/syslog";
import {Middleware} from "koa";

/**
 * call log
 *
 * @param log
 *
 * @param severity
 * default : 'debug'
 *
 * @param after
 */
export default function Log(
    log : Log<[string, any, any]>,
    severity : keyof Log = 'debug',
    after: boolean = true
) : Middleware {

    const call = function (context : Context) {

        log[severity](
            `${context.response.status} ${context.response.message}`,
            context.response.headers,
            context.response.body
        );
    }

    if(!after) {

        return function (context : Context, next : Next) {

            call(context);
            return next();
        }

    } else {

        return function (context : Context, next : Next) {

            return next().then(()=>call(context));
        }
    }


}
