import React from "react"
import {Empty} from "antd"

type imageSearch={
    search?:string
}

class DockerImagesSearch extends React.Component<imageSearch>{
    /**
     * render
     */
    public render() {
        if(this.props.search){
            console.log(this.props.search)
        }
        return <Empty/>
    }
}

export default DockerImagesSearch