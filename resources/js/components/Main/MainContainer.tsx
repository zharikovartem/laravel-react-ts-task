import {connect} from 'react-redux'
import Main from './Main'
import { AppStateType } from '../../redux/store'
import {startAnnouncementsParsing, getAnnouncements} from './../../redux/parserReducer'
import { GetAnnouncementsParamsType } from '../../api/parserAPI'
// import { RegisterFormType } from '../../api/authAPI'

type OwnMainPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    startAnnouncementsParsing: ()=>void,
    getAnnouncements: (params: GetAnnouncementsParamsType)=>void
}

export type MainPropsType = MapPropsType & MapDispatchPropsType & OwnMainPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        parsingPage: state.parser.parsingPage,
        totalAnnouncementCountToParsing: state.parser.totalAnnouncementCountToParsing,
        announcementsList: state.parser.announcementsList,
        totalAnnouncementCount: state.parser.totalAnnouncementCount
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMainPropsType, AppStateType>(mapStateToProps, 
    {startAnnouncementsParsing, getAnnouncements}) 
    (Main)
    

