import Context from "../context/context";
import Middleware from "./middleware";
import Next from "./next";
import ConditionalCallParameters
    from "../../../../../project/learn-a/packages/function/dist/conditional-call-parameters";

/**
 * execute middleware if {@param validation} match
 *
 * @param valid
 * @param invalid
 * @param validation
 * @constructor
 */
export default function ConditionalParameters<
    ContextType extends Context,
    ContextTypeN extends Context,
>(
    validation : (context:ContextType)=>boolean,
    valid : Middleware<ContextType, ContextTypeN> = Next,
    invalid : Middleware<ContextType, ContextTypeN> = Next,
) : Middleware<ContextType, ContextTypeN> {

    return function (context, next) {

        return ConditionalCallParameters(
            validation(context),
            valid,
            invalid,
            context, next
        )

    };
}
