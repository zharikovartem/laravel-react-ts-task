import { credsType } from "../redux/authReducer";
import { instance } from "./api";

export type ParsingResponseType = {
    message: string
}

// declare module 'axios' {
//     export interface AxiosRequestConfig {
//         part?: number;
//         objectType?: string
//     }
//   }

export const parserAPI = {
    startAnnouncementsParsing() {
        const object:string = 'Announcement'
        const part:number = 0
        const params = {object, part}
        return instance.get<ParsingResponseType>(`startAnnouncementsParsing/${object}/`+ part)
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
    },
    getAnnouncements() {

    }
}