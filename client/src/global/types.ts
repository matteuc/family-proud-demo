export enum SortOrderOpts {
    Ascending = "ascending",
    Descending = "descending",
}


export interface IResourceResponseBody<T> {
    data: T
}

export interface IResourceRequestBody<T> {
    payload: T
}

export interface IResourceQuery<T> {
    sort: keyof T,
    order: SortOrderOpts,
}


export type TNewCareReceiver = {
    firstName: string,
    lastName: string,
    givers: Array<string>,
}

export type TNewCareGiver = {
    firstName: string,
    lastName: string,
    receivers: Array<string>,
}

export type TCareReceiver = {
    _id: string,
    firstName: string,
    lastName: string,
    givers: Array<string>,
}

export type TCareGiver = {
    _id: string,
    firstName: string,
    lastName: string,
    receivers: Array<string>,
}

export type TCareReceiverUpdate = Partial<TCareReceiver>

export type TCareGiverUpdate = Partial<TCareGiver>

export enum UpsertEntity {
    CareGiver = "CareGiver",
    CareReceiver = "CareReceiver",
}

export enum UpsertType {
    Create = "Create",
    Update = "Update",
}

export type SpeedDialActions = {
    icon: React.ReactElement,
    name: string, 
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export type APIResult = {
    id: string,
    message: string
}

