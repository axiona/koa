import ApplicationContext from '../context/context';
import Middleware from './middleware';
import {Object} from 'ts-toolbelt';
import SetPathParameters from "@alirya/object/set-path-parameters";
import PickPathParameters from "@alirya/object/value/value/select-path-parameters";
import ReplacePath from "@alirya/object/replace-path";

export default function ReplaceParameters<
    Properties extends ReadonlyArray<PropertyKey>,
    BodyTo extends unknown = unknown,
    ContextType extends ApplicationContext & Object.P.Record<Properties, unknown> = ApplicationContext & Object.P.Record<Properties, unknown>,
>(
    filter : (data : Object.Path<ContextType, Properties>, context: ContextType) => BodyTo,
    ...properties : Properties
) : Middleware<ContextType, ReplacePath<ContextType, BodyTo, Properties>> {

    return function (context, next) {

        const value = PickPathParameters<Properties>(context as any, ...properties)

        const filtered = filter(value as any, context);

        SetPathParameters(context as any, filtered, ...properties);

        return next();

    } as Middleware<ContextType, ReplacePath<ContextType, BodyTo, Properties>>;
}
