import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
import { Form,Input,Button, } from 'antd'
const apiUrl=process.env.REACT_APP_API_URL
export const RegisterScreen =()=>{
    const { register } = useAuth()
    const handleSubmit = (values:{username:string,password:string}) =>{
        register(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true}]}>
                <Input placeholder={'用户名'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true}]}>
                <Input placeholder={'密码'} type="password" id={'password'}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType={'submit'} type={'primary'}>注册</Button>
            </Form.Item>
            
        </Form>
    )
}