import Response from "@dikac/t-http/response/response";
import Context from "../../middleware/context/context";
import {DefaultContext, DefaultState, Next} from "koa";
import {Middleware} from "koa";
import FromResponse from "../from-response";

/**
 * set {@param response} to response data
 *
 * @param response
 */
// export default function Set<
//     Subject extends Response,
//     Arguments extends unknown[]
// >(
//     response : Subject
// ) : Middleware {
//
//     return function (context : Context, next : Next) {
//
//         FromResponse(context, response);
//
//         return next();
//     }
//
// }
export default function Set<
    State extends DefaultState,
    ContextType extends DefaultContext,
    ResponseBody = any
>(
    response : Context<State, ContextType, ResponseBody>['response']
) : Middleware<State, ContextType, ResponseBody> {

    return function (context : Context<State, ContextType, ResponseBody>, next : Next) {

        FromResponse(context, response);

        return next();
    }

}
