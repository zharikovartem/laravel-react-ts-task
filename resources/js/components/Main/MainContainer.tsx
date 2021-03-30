import {connect} from 'react-redux'
import Main from './Main'
import { AppStateType } from '../../redux/store'
// import {register} from './../../redux/authReducer'
// import { RegisterFormType } from '../../api/authAPI'

type OwnMainPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // register: (creds: RegisterFormType)=>void
}

export type RegisterPropsType = MapPropsType & MapDispatchPropsType & OwnMainPropsType

let mapStateToProps = (state:AppStateType) => {
    return {

    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMainPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (Main)
    

