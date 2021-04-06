import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes } from './store'
import { GetAnnouncementsResponseType, GetAnnouncementsParamsType, parserAPI, AnnouncementType } from "./../api/parserAPI"

type InitialStateType = {
    parsingPage: number,
    totalAnnouncementCountToParsing: number | '???',
    totalAnnouncementCount: number,
    announcementsList: Array<AnnouncementType>
}
let initialState: InitialStateType = {
    parsingPage: 0,
    totalAnnouncementCountToParsing: '???',
    totalAnnouncementCount: 999,
    announcementsList: []
}

const parserReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PARSER/SET_PARSING_COUNT':
            console.log(action.count)
            return{
                ...state, 
                totalAnnouncementCountToParsing: action.count
            }

        case 'SN/PARSER/SET_TOTAL_ANNOUNCEMENT_COUNT':
            return{
                ...state, 
                totalAnnouncementCount: action.count
            }
        case 'SN/AUTH/SET_AUTH_ERROR':
            return{
                ...state, 
                // authError: action.error
            }

        case 'SN/PARSER/SET_PARSING_PAGE':
            return {
                ...state,
                parsingPage: action.part
            }

        case 'SN/PARSER/SET_AANOUNCRMENT_LIST':
            return {
                ...state,
                announcementsList: action.announcementsList
            }
        default:
            return state
    }
}

export const actions = {
    setAuthError: (error: string) => ({type: 'SN/AUTH/SET_AUTH_ERROR', error } as const),
    setParsingPage: (part: number) => ({type: 'SN/PARSER/SET_PARSING_PAGE', part } as const),
    setAnnouncementsList: (announcementsList: Array<AnnouncementType>) => ({type: 'SN/PARSER/SET_AANOUNCRMENT_LIST', announcementsList } as const),
    setTotalAnnouncementCount: (count: number) => ({type: 'SN/PARSER/SET_TOTAL_ANNOUNCEMENT_COUNT', count}as const),
    setParsingCount: (count: number) => ({type: 'SN/PARSER/SET_PARSING_COUNT', count}as const),
}

export const startAnnouncementsParsing = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await parserAPI.startAnnouncementsParsing()
        console.log(response.data.totalCount.count)
        dispatch(actions.setParsingPage(response.data.part+1))
        dispatch(actions.setParsingCount(response.data.totalCount.count))
    }
}

export const getAnnouncements = (params: GetAnnouncementsParamsType):ThunkType => {
    return async (dispatch, getState) => {
        let response = await parserAPI.getAnnouncements(params)
        dispatch(actions.setAnnouncementsList(response.data.announcementsList))
        dispatch(actions.setTotalAnnouncementCount(response.data.count))
    }
}

export const getCurrentAnnouncement = (announcementId: number):ThunkType => {
    return async (dispatch, getState) => {
        let response = await parserAPI.getCurrentAnnouncement(announcementId)
        dispatch(actions.setAnnouncementsList(response.data.announcement))
        // dispatch(actions.setTotalAnnouncementCount(response.data.count))
    }
}
export default parserReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>