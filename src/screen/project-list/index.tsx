import SearchPanel from './search-panel'
import List from './list'
import { useState,useEffect } from "react"
import { cleanObject, useMount,useDebounce } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import {useProjects} from '../../utils/project'
import {useUsers} from '../../utils/users'
import { useDocumentateTitle } from 'components/lib'
const apiUrl=process.env.REACT_APP_API_URL
export default () => {
    
    const [param, setParam] = useState({
        name: "",
        personId: ''
    })
    useDocumentateTitle('项目列表',false);
    const debounceParam=useDebounce(param,200)
    const {error,data,isLoading} = useProjects(debounceParam)
    const users = useUsers()
    
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
            <List dataSource={data || []} users={users} loading={isLoading}/>
        </Container>
    )

}

const Container = styled.div`
    padding:3.2rem
`