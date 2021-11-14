import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Card,Divider } from 'antd'
import styled from '@emotion/styled'
export const UnauthenticatedApp = ()=>{
    const [isRegister,setIsRegister] = useState(false)
    return (
        <Container>
            <ShadowCard>
                {
                    isRegister?<RegisterScreen /> :<LoginScreen />
                }
                <Divider></Divider>
                <a onClick={()=>setIsRegister(!isRegister)}>切换到{isRegister?'登陆':'注册'}</a>
            </ShadowCard>
            
        </Container>
    )
}

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing:border-box;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items: center;
    min-height: 100vh;
`