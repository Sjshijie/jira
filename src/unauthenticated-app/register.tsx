import { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
import { Form,Input,Button, } from 'antd'
import { useAysnc } from 'utils/use-async'
const apiUrl=process.env.REACT_APP_API_URL
export const RegisterScreen =({onError}:{onError:(error : Error) => void})=>{
    const { register } = useAuth()
    const {run,isLoading} = useAysnc(undefined,{throwOnError:true})
    const handleSubmit = async (values:{username:string,password:string}) =>{
        try {
            await run(register(values))
        }catch (e){
            onError(e as Error)
        }
        
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