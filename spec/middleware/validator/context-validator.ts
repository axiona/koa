import Validatable from '@axiona/validator/validatable/simple.js';
import Context from '../../../dist/context/context.js';
import Validation from '@axiona/boolean/function/validation.js';


export default function ContextValidator<
    Ctx extends Context
>(
    context : Context,
    validation : Validation<unknown[]>
) : Validatable<
        Ctx,
        Ctx
> {

    const valid = validation(context);

    return {

        valid,
        message : valid ? 'valid' : 'invalid',
        value : context as Ctx
    };
}
