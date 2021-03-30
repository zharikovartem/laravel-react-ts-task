import { credsType } from "../redux/authReducer";
import { instance } from "./api";

export type ParsingResponseType = {
    message: string
}

export const parserAPI = {
    startAnnouncementsParsing() {
        return instance.get<ParsingResponseType>(`startAnnouncementsParsing`)
        .then(response => {
            console.log('startAnnouncementsParsing: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}