import axios, { AxiosResponse } from "axios"
import { TCareReceiver, TCareReceiverUpdate, IResourceResponseBody, IResourceQuery, TNewCareReceiver } from "../../../global/types";

export default class CareReceiverAPI {
    private base: string

    constructor(base: string) {
        this.base = `${base}/care-receiver`
        this.delete = this.delete.bind(this)
        this.create = this.create.bind(this)
        this.getAll = this.getAll.bind(this)
        this.update = this.update.bind(this)
        this.getOne = this.getOne.bind(this)
    }

    async getOne(id: string): Promise<TCareReceiver | undefined> {
        try {
            const result: AxiosResponse<IResourceResponseBody<TCareReceiver>> = await axios.get(`${this.base}/${id}`)

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async getAll(sortQuery?: IResourceQuery<TCareReceiver>): Promise<Array<TCareReceiver> | undefined> {
        let url = this.base;

        if (sortQuery) url += `?sort=${sortQuery.sort}&order=${sortQuery.order}`

        try {
            const result: AxiosResponse<IResourceResponseBody<Array<TCareReceiver>>> = await axios.get(url);

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async create(document: TNewCareReceiver): Promise<TCareReceiver | undefined> {


        try {
            const result: AxiosResponse<IResourceResponseBody<TCareReceiver>> = await axios.post(this.base, {
                payload: document
            });

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async update(id: string, updates: TCareReceiverUpdate): Promise<TCareReceiver | undefined> {
        try {
            const result: AxiosResponse<IResourceResponseBody<TCareReceiver>> = await axios.put(`${this.base}/${id}`, {
                payload: updates
            });

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }   

     }

    async delete(id: string): Promise<TCareReceiver | undefined> { 
        try {
            const result: AxiosResponse<IResourceResponseBody<TCareReceiver>> = await axios.delete(`${this.base}/${id}`);

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }   
    }
}