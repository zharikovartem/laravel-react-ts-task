
import { Dispatch } from 'redux'
// import { usersAPI, } from '../api/usersAPI'
// import { UserType } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './store'
// import { actions as authActions } from './authReducer'

export type InitialStateType = {
    usersList: Array<any>,
    isUsersDataChanged: boolean
}

let initialState: InitialStateType = {
    usersList: [],
    isUsersDataChanged: false
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/SET_IS_USERS_DATA_CHANGED':
            return { ...state, isUsersDataChanged: action.isUsersDataChanged }

        case 'SN/USERS/UPDATE_USERS_LIST':
            let statetCopy = { ...state }
            const newUserList = statetCopy.usersList.map((item: any) => {
                if (item.id !== action.changedUserData.id) {
                    return item
                } else {
                    return action.changedUserData
                }
            })
            return { ...state, usersList: newUserList }

        case 'SN/USERS/SET_USERS_LIST':
            return { ...state, usersList: action.usersList }

        default:
            return state
    }
}

export const actions = {
    setUsersList: (usersList: Array<any>) => ({ type: 'SN/USERS/SET_USERS_LIST', usersList } as const),
    updateUserList: (changedUserData: any) => ({ type: 'SN/USERS/UPDATE_USERS_LIST', changedUserData } as const),
    setUsersDataChanged: (isUsersDataChanged: boolean) => ({ type: 'SN/USERS/SET_IS_USERS_DATA_CHANGED', isUsersDataChanged } as const),
}

export const getUsersList = (): ThunkType => {
    return async (dispatch, getState) => {
        // let response = await usersAPI.getUsersList()
        // dispatch(actions.setUsersList(response.data.UsersList))
    }
}

export const updateUser = (values: any, userId: number): ThunkType => {
    return async (dispatch, getState) => {

        // let response = await usersAPI.updateUser(values, userId)
        // dispatch(actions.updateUserList(response.data.changedUserData))
        // dispatch( actions.setUsersDataChanged(true) )
        // const state = getState()
        // if (state.auth.user && state.auth.user.id === response.data.changedUserData.id) {
        //     const data: UserType = response.data.changedUserData
        //     // @ts-ignore
        //     dispatch(authActions.setAuthUserData(data, null))
        // }
    }
}

export default usersReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>