import Set from "@axiona/event/set/create.js";
import EventType from "../event.js";
import {List} from 'ts-toolbelt';

export default function Event<
    Keys extends PropertyKey[],
    Container extends object,
    Type extends Record<List.UnionOf<Keys>, EventType>
>(
    ...keys : Keys
) :  Record<List.UnionOf<Keys>, EventType> {

    const record : Partial<Record<List.UnionOf<Keys>, EventType>> = {};

    for(const key of keys) {

        record[key] = Set();
    }

    return record as Record<List.UnionOf<Keys>, EventType>;

}
