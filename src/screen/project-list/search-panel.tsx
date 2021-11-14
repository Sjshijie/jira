import { Input,Select,Form } from 'antd'
interface SearchPanelProps {
    users:User[],
    param:{
        name:string,
        personId:string,
    },
    setParam:(param:SearchPanelProps['param'])=>void
}

export interface User {
    id:string,
    name:string,
    email:string,
    title:string,
    organization:string,
    token:string
}


export default  ({ param,setParam,users }:SearchPanelProps)=>{
    return (
        <Form layout={'inline'} style={{marginBottom:'2rem'}}>
            <Form.Item>
                <Input type="text" value={param.name} onChange={evt => setParam({
                    ...param,
                    name:evt.target.value,
                })} />
            </Form.Item>
            <Form.Item>
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId:value,
                })}>
                    <Select.Option value="">负责人</Select.Option>
                    {
                        users.map(user => <Select.Option key={user.id}  value={user.id}>{user.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}