import React, { useEffect, useState } from 'react'
import { ItemPagePropsType } from './ItemPageContainer'
import {AnnouncementType} from './../../../api/parserAPI'

const ItemPage: React.FC<ItemPagePropsType> = (props) => {
    // const [target, setTarget] = useState(getTargetItem(props.match.params.userId, props.announcementsList))
    const [target, setTarget] = useState<AnnouncementType>()
    useEffect( () => {
        
        if (target === undefined) {
            const announcementId: number = props.match.params.userId
            console.log('announcementId: ', announcementId)
            const dataToTarget = props.announcementsList.filter(item => item.id === announcementId)
            console.log('dataToTarget: ', dataToTarget)
    
            if (dataToTarget.length > 0) {
                setTarget(dataToTarget[0])
            } else {
                props.getCurrentAnnouncement( announcementId )
            }
        } else {
            console.log(target)
        }
        
    },[props.announcementsList])

    // console.log('realt_id: ', props.match.params.userId)
    // console.log('props: ', props.announcementsList)
    // console.log('target: ', target)

    if (target) {
        return(
            <div>
                ItemPage for: <b>{target.title}</b>
            </div>
        )
    } else {
        return <div>wait</div>
    }
    
}

export default ItemPage