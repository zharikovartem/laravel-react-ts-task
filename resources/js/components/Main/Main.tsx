import { Avatar, Button, Empty, List, message, Pagination, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import {MainPropsType} from './MainContainer'
import { Link } from 'react-router-dom'


const Main: React.FC<MainPropsType> = (props) => {
    const [pageSize, setPageSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [isParse, setIsParse] = useState(false)

    useEffect( () => {
        props.getAnnouncements({
            count: 10,
            page: page-1,
        })
    },[])

    

    const startParse = () => {
        setIsParse(!isParse)
        props.startAnnouncementsParsing()
    }

    const onShowSizeChange = (current: number, size: number) => {
        console.log('onShowSizeChange')
        setPageSize(size)
        // props.getAnnouncements({
        //     count: size,
        //     page: page-1,
        // })
    }

    const onChange = (page: number, pageSizeVal: number | undefined) => {
        console.log('onChange', pageSizeVal)
        setPage(page)
        props.getAnnouncements({
            count: pageSizeVal ? pageSizeVal : pageSize,
            page: page-1,
        })
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    // console.log(props.totalAnnouncementCountToParsing)
    return (
        <div>
            <div className="w-100 d-flex flex-row-reverse">
                <Button onClick={startParse} className="mt-2 ml-2 mr-5 mb-2" type={ !isParse ? 'primary' : 'ghost'}>
                    {isParse ? <Spin indicator={antIcon} /> : <>Обновить список объявлений</>}
                    
                </Button>
                {isParse ? <h5 className="ml-auto mt-3">Получаем объявления {props.parsingPage} из {props.totalAnnouncementCountToParsing}</h5> : null}
            </div>

            <PaginationComponent onShowSizeChange={onShowSizeChange} pageSize={pageSize} onChange={onChange} current={page} total={props.totalAnnouncementCount}/>

            {props.announcementsList.length !== 0 ?
            <List
                header={<h4>Список объявлений</h4>}
                bordered
                size="small"
                itemLayout="horizontal"
                dataSource={props.announcementsList}
                renderItem={item => (
                    <List.Item
                        extra={
                            item.image_url !== null ?
                            <img
                                width={272}
                                alt="Empty"
                                src={item.image_url}
                            />
                            : <div className="border h-100" style={{width: 272}}><Empty/></div>
                        }
                    >
                        <List.Item.Meta
                            // avatar={<Avatar shape="square" size="large" src={item.image_url} alt="123"/>}
                            title={<Link to={'/'+item.id}>{item.title}</Link>}
                            description={item.desriptions}
                        />
                    </List.Item>
                )}
            />
            : <Empty /> }

            <PaginationComponent onShowSizeChange={onShowSizeChange} pageSize={pageSize} onChange={onChange} current={page} total={props.totalAnnouncementCount}/>

            
            <li><s>Создать абстракцию</s></li>
            <li><s>Создать модель</s></li>
            <li>Создать джоб</li>
            <li>Создать парсер</li>
            <li>Пробежать по вложенностям</li>
            <li>Ограничеть время и кол-во проходов</li>
            <br/>
            <li>Добавить params в index()</li>
            <li>Реализовать отображение</li>
            <li>Реализовать пагинацию</li>
            <br/>
            <li>Реализовать удаление при повторном проходе</li>

        </div>
    )
}

export default Main

type PaginationComponentPropsType = {
    onShowSizeChange: (current: number, size: number)=>void,
    onChange: (page: number, pageSize: number | undefined)=>void,
    pageSize: number,
    current: number,
    total: number,
}
const PaginationComponent: React.FC<PaginationComponentPropsType> = (props) => {
    return(
        <Pagination
            className="my-2"
            showSizeChanger
            defaultPageSize={10}
            pageSize={props.pageSize}
            current={props.current}
            onShowSizeChange={props.onShowSizeChange}
            onChange={props.onChange}
            defaultCurrent={1}
            total={props.total}
        />
    )
}


const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];