import SearchPanel from './search-panel'
import List from './list'
import { useState,useEffect } from "react"
import qs from 'qs'
import { cleanObject, useMount,useDebounce } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
const apiUrl=process.env.REACT_APP_API_URL
export default () => {
    const [users,setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: ''
    })
    const [list, setList] = useState([])
    const debounceParam=useDebounce(param,200)
    const client = useHttp()
    useEffect(() => {
        client('projects',{data:cleanObject(debounceParam)}).then(setList)
    }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers)
    })
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            <List list={list} users={users}/>
        </Container>
    )

}

const Container = styled.div`
    padding:3.2rem
`