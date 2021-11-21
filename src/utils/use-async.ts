import { useState } from "react"

interface State<D>{
    error:Error | null,
    data:D | null,
    stat:'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null>={
    stat:'idle',
    data:null,
    error:null
}

const defaultConfig = {
    throwOnError:false,
}

export const useAysnc = <D>(initialState?:State<D>,defaultInitialConfig?:typeof defaultConfig)=>{
    const config = {...defaultInitialConfig}
    const [state,setState]=useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data:D)=>setState({
        data,
        stat:'success',
        error:null
    })

    const setError = (error:Error)=>setState({
        data:null,
        stat:'error',
        error:error
    })

    const run = async (promise:Promise<D>) =>{
        setState({...state,stat:'loading'})
        return promise.then(data=>{
            setData(data)
            return data
        }).catch(err=>{
            setError(err)
            if(config.throwOnError) return Promise.reject(err)
            return err
        })
        
    }

    return {
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        ...state
    }

}