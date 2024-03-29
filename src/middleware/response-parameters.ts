import Response from '@axiona/http/response/response.js';
import Context from '../context/context.js';
import Next from './next.js';
import FromResponseParameters from '../response/from-response-parameters.js';
import Middleware from './middleware.js';
import IsFunction from '@axiona/function/boolean/function.js';
import Replace from '../context/response/replace.js';
/**
 * use {@param response} value or return for response data
 *
 * @param response
 * Value or Value from callback to be applied to response
 *
 * @param middleware
 * @default {@see Next}
 * to be executed after
 */

/**
 * promise factory
 */
export default function ResponseParameters<
    ContextType extends Context,
    Subject extends Response,
>(
    response : (context : ContextType) => Promise<Subject>,
    middleware ?: Middleware
) : Middleware<ContextType, Replace<ContextType, ['body'], Subject['body']>>;

/**
 * response factory
 */
export default function ResponseParameters<
    ContextType extends Context,
    Subject extends Response,
>(
    response : (context : ContextType) => Subject,
    middleware ?: Middleware
) : Middleware<ContextType, Replace<ContextType, ['body'], Subject['body']>>;

/**
 * direct response value
 */
export default function ResponseParameters<
    ContextType extends Context,
    Subject extends Response,
    >(
    response : Subject,
    middleware ?: Middleware
) : Middleware<ContextType, Replace<ContextType, ['body'], Subject['body']>>;

export default function ResponseParameters<
    ContextType extends Context,
    Subject extends Response,
>(
    response : Subject|((context : ContextType) => Promise<Subject>|Subject),
    middleware : Middleware = Next
) : Middleware<ContextType> {

    if(IsFunction(response)) {

        return function (context : ContextType, next ) {

            return Promise.resolve(response(context)).then(function (subject) {

                FromResponseParameters(context, subject);

                return middleware(context, next);

            });
        };

    } else {

        return function (context : ContextType, next ) {

            FromResponseParameters(context, response);

            return middleware(context, next);
        };
    }

}
