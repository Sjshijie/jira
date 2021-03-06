import React,{ ReactNode, useState } from 'react';
import * as auth from 'authProvider'
import { User } from 'screen/project-list/search-panel';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAysnc } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoding } from 'components/lib';
interface AuthForm {
    username: string,
    password: string
}

const AuthContext = React.createContext<{
    user:User|null,
    register:(form:AuthForm)=>Promise<void>,
    login:(form:AuthForm)=>Promise<void>,
    logout:()=>Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext'

const bootstrapUser =async ()=>{
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user

}

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAysnc<User | null>()
    const login = (form:AuthForm)=> auth.login(form).then(setUser)
    const register = (form:AuthForm)=> auth.register(form).then(setUser)
    const logout = ()=> auth.logout().then(()=>setUser(null))

    useMount(()=>{
        run(bootstrapUser())
    })
    if(isIdle || isLoading){
        return <FullPageLoding />
    }

    if(isError){
        return <FullPageErrorFallback error={error} />
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }

    return context
}

