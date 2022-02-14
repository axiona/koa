import Context from '../context';


type Infer<Type> = Type extends Context<any, any, infer As> ? As : never;
export default Infer;