import {connect} from 'react-redux'
import ItemPage from './ItemPage'
import { AppStateType } from '../../../redux/store'
import {startAnnouncementsParsing, getAnnouncements, getCurrentAnnouncement} from './../../../redux/parserReducer'
import { GetAnnouncementsParamsType } from '../../../api/parserAPI'
// import { RegisterFormType } from '../../api/authAPI'

type OwnItemPagePropsType = {
    match: any
    location: any
    history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    startAnnouncementsParsing: ()=>void,
    getAnnouncements: (params: GetAnnouncementsParamsType)=>void,
    getCurrentAnnouncement: (announcementId: number)=>void,
}

export type ItemPagePropsType = MapPropsType & MapDispatchPropsType & OwnItemPagePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        // parsingPage: state.parser.parsingPage,
        // totalAnnouncementCountToParsing: state.parser.totalAnnouncementCountToParsing,
        announcementsList: state.parser.announcementsList,
        // totalAnnouncementCount: state.parser.totalAnnouncementCount
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnItemPagePropsType, AppStateType>(mapStateToProps, 
    {startAnnouncementsParsing, getAnnouncements, getCurrentAnnouncement}) 
    (ItemPage)
    

