import Validator from '@axiona/validator/simple.js';
import InferValidatable from '@axiona/validator/validatable/infer-static.js';
import ApplicationContext from '../context/context.js';
import Middleware from './middleware.js';
import {Object} from 'ts-toolbelt';
import Next from './next.js';
import {SelectPathParameters} from '@axiona/object/value/value/select-path.js';
import ValidatableContainer from '@axiona/validatable/validatable/Validatable.js';
import {ConditionalCallParameters} from '@axiona/function/conditional-call.js';
import { SetPathParameters } from '@axiona/object/set-path.js';

export type PropertyValidatorParametersContext<Properties extends PropertyKey[]> =
    ApplicationContext & Object.P.Record<Properties, unknown>;

export default function ValidatorParameters<
    ContextType extends ApplicationContext = ApplicationContext,
    ValidatorType extends Validator<ContextType> = Validator<ContextType>,
>(
    validator : ValidatorType,
    valid ?: Middleware<ContextType>,
    invalid ?: Middleware<ContextType>,
    replace ?: boolean,
) : Middleware<ContextType, ContextType & ValidatableContainer<InferValidatable<ValidatorType>>>;

export default function ValidatorParameters<
    ContextType extends ApplicationContext = ApplicationContext,
    ValidatorType extends Validator<ContextType> = Validator<ContextType>,
>(
    validator : ValidatorType,
    valid ?: Middleware<ContextType>,
    invalid ?: Middleware<ContextType>,
    replace ?: boolean,
    ...properties : []
) : Middleware<ContextType, ContextType & ValidatableContainer<InferValidatable<ValidatorType>>>;

export default function ValidatorParameters<
    Properties extends PropertyKey[],
    ContextType extends PropertyValidatorParametersContext<Properties> = PropertyValidatorParametersContext<Properties>,
    ValidatorType extends Validator<Object.Path<ContextType, Properties>> = Validator<Object.Path<ContextType, Properties>>,
>(
    validator : ValidatorType,
    valid ?: Middleware<ContextType>,
    invalid ?: Middleware<ContextType>,
    replace ?: boolean,
    ...properties : Properties
) : Middleware<ContextType, ContextType & ValidatableContainer<InferValidatable<ValidatorType>>>;


export default function ValidatorParameters<
    Properties extends PropertyKey[],
    ContextType extends PropertyValidatorParametersContext<Properties>|ApplicationContext,
    ValidatorType extends Validator<Object.Path<ContextType, Properties>>|Validator<ContextType>,
>(
    validator : ValidatorType,
    valid : Middleware<ContextType> = Next,
    invalid : Middleware<ContextType> = Next,
    replace : boolean = true,
    ...properties : Properties
) : Middleware<ContextType, ContextType & ValidatableContainer<InferValidatable<ValidatorType>>> {

    return function (context : ContextType & ValidatableContainer<InferValidatable<ValidatorType>>, next) {

        const value = properties.length !== 0
            ? SelectPathParameters<Properties, PropertyValidatorParametersContext<Properties>>(context as PropertyValidatorParametersContext<Properties>, ...properties)
            : context;

        const validatable = (validator as Validator<ContextType>)(value as ContextType);

        context.validatable = validatable as InferValidatable<ValidatorType>;

        if(replace) {

            SetPathParameters(context as any, validatable.value, ...properties);
        }

        return ConditionalCallParameters(
            validatable.valid,
            valid,
            invalid,
            context,
            next
        );
    };
}
