import Validatable from '@axiona/validator/validatable/validatable.js';
import Code from '@axiona/code/code.js';
import Context from '../context/context.js';
import ValidatableParameters from './validatable-parameters.js';

export default function ValidatableParameter(
    {
        context,
        validatable
    } : {
        context: Context,
        validatable : Validatable & Code<number>,
    }
) {

    ValidatableParameters(context, validatable);
}
