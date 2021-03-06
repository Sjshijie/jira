import * as auth from 'authProvider'
import { useAuth } from 'context/auth-context'
import qs from 'qs'
const apiUrl=process.env.REACT_APP_API_URL

interface Config extends RequestInit{
    token?:string,
    data?:object
}

export const http = async (endpoint:string,{data,token,headers,...customConfig}:Config = {})=>{
    const config = {
        method:'get',
        headers:{
            Authorization:token?`Bearer ${token}`:'',
            'content-type':data?'application/json':''
        },
        ...customConfig
    }
    if(config.method.toUpperCase()==='GET'){
        endpoint+=`?${qs.stringify(data)}`
    }else{
        config.body=JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`,config)
        .then(async response=>{
            if(response.status==401){
                auth.logout()
                window.location.reload()
                return Promise.reject({message:'pls re login'})
            }
            const data = await response.json()
            if(response.ok){
                return data
            }else{
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const {user} = useAuth()
    return (...[endpoint,config]:Parameters<typeof http>) => http(endpoint,{...config,token:user?.token})
}