import Callable from "../../../function/dist/callable";
import Priority, {PriorityValue} from "@alirya/set/priority";
import Once, {OnceValue} from "@alirya/set/once";
import Server from "../server/server";


export default interface Event<
    ServerType extends  Server = Server,
    Argument extends unknown[] = unknown[],
    Return extends unknown = unknown
> extends globalThis.Set<PriorityValue & OnceValue<Callable<[ServerType, ...Argument], Promise<any>|any>>> {


}