import { Dispatch } from 'redux'
import { BaseThunkType, InferActionsTypes } from './store'
import { parserAPI } from "./../api/parserAPI"

type InitialStateType = {
    parsingPage: number,
    totalAnnouncementCountToParsing: number | '???',
    totalAnnouncementCount: number
}
let initialState: InitialStateType = {
    parsingPage: 0,
    totalAnnouncementCountToParsing: '???',
    totalAnnouncementCount: 999
}

const parserReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
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
        default:
            return state
    }
}

export const actions = {
    // setAuthUserData: (user: UserType | null, remember_token: string | null) => ({ type: 'SN/AUTH/SET_USER_DATA', user, remember_token } as const),
    // logout: () => ({type: 'SN/AUTH/LOGOUT'} as const),
    // changeSettings: (settingType: string, settings: SettingasInstanseType) => ({ type: 'SN/AUTH/SET_SETTINGS_DATA', settingType, settings } as const),
    setAuthError: (error: string) => ({type: 'SN/AUTH/SET_AUTH_ERROR', error } as const),
    setParsingPage: (part: number) => ({type: 'SN/PARSER/SET_PARSING_PAGE', part } as const),
}

export const startAnnouncementsParsing = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await parserAPI.startAnnouncementsParsing()
        dispatch(actions.setParsingPage(response.data.part+1))
//         if (response) {
//             if (response.status === 200) {
//                 dispatch(actions.setAuthUserData(response.data.user, response.data.remember_token))
//             } else {
//                 dispatch(actions.setAuthError(response.data.message))
//             }
//         }
    }
}

export default parserReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>