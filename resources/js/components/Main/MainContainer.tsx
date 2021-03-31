import {connect} from 'react-redux'
import Main from './Main'
import { AppStateType } from '../../redux/store'
import {startAnnouncementsParsing} from './../../redux/parserReducer'
// import { RegisterFormType } from '../../api/authAPI'

type OwnMainPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    startAnnouncementsParsing: ()=>void
}

export type MainPropsType = MapPropsType & MapDispatchPropsType & OwnMainPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        parsingPage: state.parser.parsingPage,
        totalAnnouncementCountToParsing: state.parser.totalAnnouncementCountToParsing
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMainPropsType, AppStateType>(mapStateToProps, 
    {startAnnouncementsParsing}) 
    (Main)
    

