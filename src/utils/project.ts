
import {useEffect} from 'react'
import { useAysnc } from 'utils/use-async'
import { Project } from '../screen/project-list/list'
import { cleanObject, useMount,useDebounce } from 'utils'
import { useHttp } from 'utils/http'
export const useProjects = (param?:Partial<Project>)=>{
    const client = useHttp()
    const {run,...result} = useAysnc<Project[]>()
    useEffect(() => {
        run(client('projects',{data:cleanObject(param || {} )}))
    }, [param])
    return result

}
