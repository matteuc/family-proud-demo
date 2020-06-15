import CareGiverAPI from "./caregiver"
import CareReceiverAPI from "./carereceiver"

const DOMAIN = process.env.REACT_APP_API_URL || "http://localhost:3030";

const API_BASE = `${DOMAIN}/api`;


const API = {
    CareGiver: (): CareGiverAPI => {
        return new CareGiverAPI(API_BASE)
    },
    CareReceiver: (): CareReceiverAPI => {
        return new CareReceiverAPI(API_BASE)
    }
}

export default API;