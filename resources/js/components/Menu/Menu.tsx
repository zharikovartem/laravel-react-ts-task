import React from 'react'
import { Menu } from 'antd'
import {Link, useHistory} from 'react-router-dom'

const MenuComponent: React.FC = (props) => {
    return(
            <Menu
                onClick={()=>{}} 
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key="1" >
                    <Link to={''}>Home</Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to={'/login'}>login</Link>
                </Menu.Item>
            </Menu>
    )
}

export default MenuComponent