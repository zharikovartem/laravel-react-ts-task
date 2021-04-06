import React, { useEffect, useState } from 'react'
import { ItemPagePropsType } from './ItemPageContainer'
import {AnnouncementType} from './../../../api/parserAPI'
import { Spin } from 'antd'
import { Formik } from 'formik'
import ItemPageForm from './ItemPageForm'
import moment from "moment"

export type initialValuesType = {
    tittle: string,
    desriptions: string,
    price: number,
    public_date: moment.Moment,
    adress: string,
    region: string,
    locality: string,
    city_area: string,
    metro: string,
    rooms: string,
    number_of_berths: string,
    floor: string,
    square: string,
    furniture: string,
    isPhone: string,
    renovation: string,
    appliances: string,
    additionally: string,
    notes: string,
    phone: string,
}

const ItemPage: React.FC<ItemPagePropsType> = (props) => {
    // const [target, setTarget] = useState(getTargetItem(props.match.params.userId, props.announcementsList))
    const [target, setTarget] = useState<AnnouncementType>()
    useEffect( () => {
        
        if (target === undefined) {
            const announcementId: number = props.match.params.userId
            const dataToTarget = props.announcementsList.filter(item => item.id == announcementId)
            if (dataToTarget.length > 0) {
                setTarget(dataToTarget[0])
            } else {
                props.getCurrentAnnouncement( announcementId )
            }
        } 
    },[props.announcementsList])

    const initialValues: initialValuesType = {
        // ...target,
        tittle: target!==undefined ? target.title : '',
        desriptions: target!==undefined ? target.desriptions : '',
        price: target!==undefined ? target.price : 0,
        public_date: moment(target!==undefined ? target.public_date : '00-00-0000'),
        adress: target!==undefined ? target.adress : '',
        region: target!==undefined ? target.region : '',
        locality: target!==undefined ? target.locality : '',
        city_area: target!==undefined ? target.city_area : '',
        metro: target!==undefined && target.metro!==null ? target.metro : 'нет',
        rooms: target!==undefined ? target.rooms : '',
        number_of_berths: target!==undefined ? target.number_of_berths : '',
        floor: target!==undefined ? target.floor : '',
        square: target!==undefined ? target.square : '',
        furniture: target!==undefined ? target.furniture : '',
        isPhone: target!==undefined ? target.isPhone : '',
        renovation: target!==undefined ? target.renovation : '',
        appliances: target!==undefined ? target.appliances : '',
        additionally: target!==undefined ? target.additionally : '',
        notes: target!==undefined ? target.notes : '',
        phone: target!==undefined && target.phone!==null && target.phone!==undefined  ? target.phone : 'нет',
    }

    const handleSubmit = (val:initialValuesType) => {
        console.log('handleSubmit: ', val)
    }


    if (target) {
        return(
            <div>
                <h3 className="mt-3">{target.title}</h3>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {ItemPageForm}
                </Formik>
            </div>
        )
    } else {
        return <Spin size="large" />
    }
    
}

export default ItemPage