import { useAuth } from "context/auth-context"
import { useState } from "react"
import ProjectListScreen from 'screen/project-list'
import styled from '@emotion/styled'
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import {Dropdown,Menu,Button} from 'antd'
export const AuthenticatedApp = ()=>{
    const {logout} = useAuth()
    return (
        <div>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"}/>
                </HeaderLeft>
                <HeaderRight>
                    <User />
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </div>
    )
}


const User = () => {
    const { logout, user } = useAuth();
    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"logout"}>
              <Button onClick={logout} type={"link"}>
                登出
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button type={"link"} onClick={(e) => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    );
  };

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;