import search from "antd/lib/transfer/search"
import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParmas,setSearchParams] = useSearchParams()
    return [
        useMemo(()=>keys.reduce((obj,key)=>{
            return {...obj,[key]:searchParmas.get(key) || ''}
        },{} as {[key in K]:string}),[searchParmas]),
        (params:Partial<{[key in K]:unknown}>)=>{
            const o = cleanObject({...Object.fromEntries(searchParmas),...params}) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}