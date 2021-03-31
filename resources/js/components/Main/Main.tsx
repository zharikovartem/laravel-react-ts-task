import { Avatar, Button, List, Pagination, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { OmitProps } from 'antd/lib/transfer/ListBody'
import {MainPropsType} from './MainContainer'


const Main: React.FC<MainPropsType> = (props) => {
    useEffect( () => {
        // Получить список объявлений
    },[])

    const [pageSize, setPageSize] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [isParse, setIsParse] = useState(false)

    const startParse = () => {
        setIsParse(!isParse)
        props.startAnnouncementsParsing()
    }

    const onShowSizeChange = (current: number, size: number) => {
        setPageSize(size)
    }

    const onChange = (page: number, pageSize: number | undefined) => {
        setPage(page)
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return (
        <div>
            <div className="w-100 d-flex flex-row-reverse">
                <Button onClick={startParse} className="mt-2 ml-2 mr-5 mb-2" type={ !isParse ? 'primary' : 'ghost'}>
                    {isParse ? <Spin indicator={antIcon} /> : <>Обновить список объявлений</>}
                    
                </Button>
                {isParse ? <h5 className="ml-auto mt-3">Получаем объявления {props.parsingPage} из {props.totalAnnouncementCountToParsing}</h5> : null}
            </div>

            <PaginationComponent onShowSizeChange={onShowSizeChange} pageSize={pageSize} onChange={onChange} current={page}/>

            <List
                header={<h4>Список объявлений</h4>}
                bordered
                size="small"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />

            <PaginationComponent onShowSizeChange={onShowSizeChange} pageSize={pageSize} onChange={onChange} current={page}/>

            
            <li>Создать абстракцию</li>
            <li>Создать модель</li>
            <li>Создать джоб</li>
            <li>Создать парсер</li>
            <li>Пробежать по вложенностям</li>

        </div>
    )
}

export default Main

type PaginationComponentPropsType = {
    onShowSizeChange: (current: number, size: number)=>void,
    onChange: (page: number, pageSize: number | undefined)=>void,
    pageSize: number,
    current: number,
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
            total={500}
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