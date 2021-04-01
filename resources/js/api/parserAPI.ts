import { credsType } from "../redux/authReducer";
import { instance } from "./api";

export type ParsingResponseType = {
    message: string
}

export type  GetAnnouncementsParamsType = {
    count: number,
    page: number,
}

export type AnnouncementType = {
    additionally: string,
    adress: string,
    appliances: string,
    city_area: string,
    created_at: string,
    deleted_at: string,
    desriptions: string,
    floor: string,
    fullDesriptions?: string,
    furniture: string,
    id: number
    image_url: string,
    isParse: boolean
    isPhone: string,
    locality: string,
    metro: string,
    notes: string,
    number_of_berths: string,
    phone?: string,
    price: number,
    public_date: string,
    realt_id: number
    region: string,
    renovation: string,
    rooms: string,
    saller_name?: string,
    square: string,
    title: string,
    updated_at: string,
}

export type GetAnnouncementsResponseType = {
    announcementsList: Array<AnnouncementType>,
    count: number
}

export const parserAPI = {
    startAnnouncementsParsing() {
        const object:string = 'Announcement'
        const part:number = 0
        const params = {object, part}
        return instance.get<any>(`startAnnouncementsParsing/${object}/`+ part)
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
    getAnnouncements(params: GetAnnouncementsParamsType) {
        return instance.get<GetAnnouncementsResponseType>("announcements", {params})
        .then((response) => {
            console.log('getAnnouncements: ', response)
            return response
        })
        .catch(err => {
            if (err.response) {
                console.log('getAnnouncements ERROR', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
      },
}