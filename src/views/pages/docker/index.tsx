import React from "react"
import Back from "../../components/back"
import Search from "../../components/search"

class Docker extends React.Component{

    /**
     * render
     */
    public render() {
        window.runCommand('ls').then(res=>{
            console.log("执行的结果：",res)
        })
        return(
            <div>
                <Back/>
                <Search addonAfter="icon-sousuo" addonBefore="icon-rongqifuwuContainerServi" placeholder="请输入容器名称"/>
            </div>
        )
    }
}

export default Docker