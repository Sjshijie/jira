
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


export const useEditProject = () => {
    const {run, ...result} = useAysnc()
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'PATCH'
        }))
    }
    return {
        mutate,
        ...result
    }
  };

  export const useAddProject = () => {
    const {run, ...result} = useAysnc()
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`,{
            data:params,
            method:'POST'
        }))
    }
    return {
        mutate,
        ...result
    }
  };