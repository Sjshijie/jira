import { useAuth } from "context/auth-context"
import React, { useState } from "react"
import ProjectListScreen from 'screen/project-list'
import { ProjectScreen } from 'screen/project'
import styled from '@emotion/styled'
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import {Dropdown,Menu,Button} from 'antd'
import {Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'

export const AuthenticatedApp = ()=>{
    
    return (
        <div>
            <PageHeader />
            <Main>
                <Router>
                  <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen />}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                    <Route index element={<ProjectListScreen />}></Route>
                  </Routes>
                </Router>
                
            </Main>
        </div>
    )
}

const PageHeader = () => {
  const {logout, user} = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
          <Button type='link' onClick={ ()=>window.location.href =  window.location.origin}>
            <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"}/>
          </Button>
      </HeaderLeft>
      <HeaderRight>
          <User />
      </HeaderRight>
    </Header>
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