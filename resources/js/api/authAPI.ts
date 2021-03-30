import { credsType } from "../redux/authReducer";
import { instance } from "./api";

export type RegisterFormType = {
    name: string,
    email: string,
    password: string,
    remember?: boolean,
    status?: 'guest' | 'admin'
}

export const authAPI = {
    authMe() {
        let remember_token: string | null = 'error'
        if (localStorage.getItem('remember_token')) {
            remember_token = localStorage.getItem('remember_token')
        }
        if (sessionStorage.getItem('remember_token')) {
            remember_token = sessionStorage.getItem('remember_token')
        }
        return instance.get(`authMe/`+remember_token)
        .then( (response) => {
            console.log('me:', response)
            return response
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    login(data: credsType) {
        return instance.post('login', data)
        .then(response => {
            if (data.remember) {
                if (response.data.remember_token !== null) {
                    localStorage.setItem('remember_token', response.data.remember_token);
                } else {
                    localStorage.removeItem('remember_token');
                }
            } else {
                if (response.data.remember_token !== null) {
                    sessionStorage.setItem('remember_token', response.data.remember_token);
                } else {
                    sessionStorage.removeItem('remember_token');
                }
            }
            console.log(response)
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },

    register(creds: RegisterFormType) {
        return instance.post('register', creds)
        .then(response => {
            if (response.data.remember_token !== null) {
                localStorage.setItem('remember_token', response.data.token);
            } else {
                localStorage.removeItem('remember_token');
            }
            console.log(response)
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}