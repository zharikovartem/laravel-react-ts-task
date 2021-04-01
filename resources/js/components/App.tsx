import React, {useEffect} from 'react'
import { BrowserRouter, Redirect, Route, Switch, withRouter, useLocation, Link } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import store, { AppStateType } from './../redux/store'
import { compose } from 'redux'
import { Layout, Spin, Result, Button } from 'antd'
import './../index.css'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd-mobile/dist/antd-mobile.css'
import Menu from './Menu/Menu'
import LoginContainer from './Login/LoginContainer'
import RegisterContainer from './Register/RegisterContainer'
import MainContainer from './Main/MainContainer'
import {getAuthUserData} from './../redux/authReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getAuthUserData: () => void,
    // addLocation: (location: string) => void,
    // login: (data: credsType) => void,
}

const AppRouter: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    useEffect( () => {
        props.getAuthUserData()
    },[])
    return(
        <Layout>
            <Menu />
            <Switch>
                <Route path={'/login'} component={LoginContainer} />
                <Route path={'/register'} component={RegisterContainer} />
                <Route exact path={'/'}
                        render={() => <MainContainer />} />
                <Route path={'*'} component={Page404} />
            </Switch>
        </Layout>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    // initialized: state.app.initialized,
    // appLocation: state.app.location,
    // isAuth: state.auth.isAuth,
    // userStatus: state.auth.user?.status
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { getAuthUserData }))(AppRouter)

let ws = new WebSocket('ws://127.0.0.1:2346')
ws.addEventListener('message', (e)=> {
    console.log('message: ',e.data)
})

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="container">
                    <AppContainer />
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App

const Page404:React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to={''}>Back Home</Link></Button>}
        />
    )
}
