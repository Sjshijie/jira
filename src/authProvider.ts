import {User} from 'screen/project-list/search-panel'

const localStorageKey = '__auth_provider_token'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStorageKey,user.token || '')
    return user
}

const apiUrl=process.env.REACT_APP_API_URL

export const register = (data:{username:string,password:string}) => {
    return fetch(apiUrl+`/register`,{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async res => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(await res.json())
        }
    })
}

export const login = (data:{username:string,password:string}) => {
    return fetch(apiUrl+`/login`,{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async res => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        }else{
            return Promise.reject(await res.json())
        }
    })
}

export const logout = async ()=> window.localStorage.removeItem(localStorageKey)