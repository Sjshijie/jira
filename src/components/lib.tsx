import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import { useEffect, useRef } from "react";
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
  }>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.between ? "space-between" : undefined)};
    margin-bottom: ${(props) => props.marginBottom + "rem"};
    > * {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      margin-right: ${(props) =>
        typeof props.gap === "number"
          ? props.gap + "rem"
          : props.gap
          ? "2rem"
          : undefined};
    }
  `;

const FullPage = styled.div`
height:100vh;
display:flex;
align-items:center;
justify-content:center;
`

export const FullPageLoding = ()=> <FullPage>
  <Spin size={"large"} />
</FullPage>

export const FullPageErrorFallback = ({error}:{error:Error | null}) => <FullPage>
  <DevTools/>
  <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
</FullPage> 

export const useDocumentateTitle = (title:string,keepOnUnmount:boolean=true)=>{
  const oldTitle = useRef(document.title).current;
  useEffect(()=>{
    document.title = title;
    return ()=>{
      if(!keepOnUnmount) {
        document.title = oldTitle;
      }
    }
  },[oldTitle])
}