import React from "react";

type FallbackRender = (props:{error:Error | null}) => React.ReactElement;
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>,{error:Error | null}> {
    state={
        error:null
    }

    //自组件渲染出现异常 会执行这个 并返回值会自动调用setState
    static getDerivedStateFromError(error : Error){
        return {error}
    }

    render(){
        const {error} = this.state
        const {fallbackRender,children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}