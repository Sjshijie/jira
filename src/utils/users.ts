
import {useEffect,useState} from 'react'
import { useAysnc } from 'utils/use-async'
import { cleanObject, useMount,useDebounce } from 'utils'
import { useHttp } from 'utils/http'
import { User } from 'screen/project-list/search-panel'
export const useUsers = ()=>{
    const client = useHttp()
    const [users,setUsers] = useState([])
    useMount(() => {
        client('users').then(setUsers)
    })
    return users

}
