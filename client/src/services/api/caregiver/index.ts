import axios, { AxiosResponse } from "axios"
import { TCareGiver, TCareGiverUpdate, IResourceResponseBody, IResourceQuery, TNewCareGiver } from "../../../global/types";

export default class CareGiverAPI {
    private base: string

    constructor(base: string) {
        this.base = `${base}/care-giver`
        this.delete = this.delete.bind(this)
        this.create = this.create.bind(this)
        this.getAll = this.getAll.bind(this)
        this.update = this.update.bind(this)
        this.getOne = this.getOne.bind(this)

    }

    async getOne (id: string): Promise<TCareGiver | undefined> {

        try {
            const result: AxiosResponse<IResourceResponseBody<TCareGiver>> = await axios.get(`${this.base}/${id}`)

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async getAll(sortQuery?: IResourceQuery<TCareGiver>): Promise<Array<TCareGiver> | undefined> {
        let url = this.base;

        if (sortQuery) url += `?sort=${sortQuery.sort}&order=${sortQuery.order}`

        try {
            const result: AxiosResponse<IResourceResponseBody<Array<TCareGiver>>> = await axios.get(url);

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async create(document: TNewCareGiver): Promise<TCareGiver | undefined> {


        try {
            const result: AxiosResponse<IResourceResponseBody<TCareGiver>> = await axios.post(this.base, {
                payload: document
            });

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }
    }

    async update(id: string, updates: TCareGiverUpdate): Promise<TCareGiver | undefined> {
        try {
            const result: AxiosResponse<IResourceResponseBody<TCareGiver>> = await axios.put(`${this.base}/${id}`, {
                payload: updates
            });

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }   

     }

    async delete(id: string): Promise<TCareGiver | undefined> { 
        try {
            const result: AxiosResponse<IResourceResponseBody<TCareGiver>> = await axios.delete(`${this.base}/${id}`);

            return result.data.data;
        }
        catch (_) {
            return undefined;
        }   
    }
}