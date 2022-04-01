import Middleware from './middleware';
import ErrorHandlerParameter from '../throwable/handler/handler';
import ErrorInstanceParameters from './error-parameters';
import Context from "../context/context";
import Callable from "@alirya/function/callable";


export type ErrorParameterArgument<
    ContextType extends Context,
> = {
    handler :  ErrorHandlerParameter<globalThis.Error, ContextType>,
    instance ?: Callable<[globalThis.Error], boolean>,
    rethrow ?: boolean
};

/**
 * @param instance
 * @default {@see globalThis.Error}
 * instance of error
 *
 * @param middleware
 * executed {@param middleware} if error thrown
 *
 * @param rethrow
 * @default false
 * rethrow exception or not
 */
export default function ErrorParameter<
    ContextType extends Context,
>(
    {
        handler,
        instance,
        rethrow,
    } : ErrorParameterArgument<ContextType>
) : Middleware<ContextType>
{
    return ErrorInstanceParameters(handler, instance, rethrow);
}
