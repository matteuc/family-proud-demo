import { String, Partial, Literal, Array, Record, Union } from 'runtypes';

const RTCareReceiver = Record({
    firstName: String,
    lastName: String
}).And(Partial({
    givers: Array(String)
}))

const RTCareGiverUpdate = Partial({
    firstName: String,
    lastName: String,
    receivers: Array(String)
})

const RTCareReceiverUpdate = Partial({
    firstName: String,
    lastName: String,
    givers: Array(String)
});

const RTCareGiver = Record({
    firstName: String,
    lastName: String
}).And(Partial({
    receivers: Array(String)
}))

const RTCareGiverSortOpts = Union(
    Literal('firstName'),
    Literal('lastName')
);

const RTCareReceiverSortOpts = Union(
    Literal('firstName'),
    Literal('lastName')
);

const RTSortOrderOpts = Union(
    Literal('asc'),
    Literal('desc'),
    Literal('ascending'),
    Literal('descending'),
    Literal("1"),
    Literal("-1")
);

export {
    RTCareReceiver,
    RTCareGiver,
    RTCareGiverUpdate,
    RTCareReceiverUpdate,
    RTSortOrderOpts,
    RTCareReceiverSortOpts,
    RTCareGiverSortOpts
}
