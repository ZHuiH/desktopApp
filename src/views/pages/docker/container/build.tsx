import React from "react"
import Back from "../../../components/back"
import{RouteComponentProps} from "react-router-dom"
import {Row,Col,Switch,Button,Form} from 'antd'

type dockerBuildState={
    tty:boolean
    daemon:boolean
}

class Build extends React.Component<RouteComponentProps,dockerBuildState>{
    constructor(props:RouteComponentProps){
        super(props)
        this.state={
            tty:false,
            daemon:false
        }
    }

    private raito():JSX.Element {
        return (
            <Row>
                <Col span={12}>
                    <Form.Item label="tty" name="tty">
                    <Switch 
                        onChange={()=>this.setState({tty:!this.state.tty})}
                        checkedChildren="开启" 
                        unCheckedChildren="关闭"/>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="daemon" name="daemon">
                        <Switch 
                        onChange={()=>this.setState({daemon:!this.state.daemon})}
                        checkedChildren="开启" 
                        unCheckedChildren="关闭"/>
                    </Form.Item>
                </Col>
            </Row>
        )
    }
    private buttons():JSX.Element {
        let goBack=()=>this.props.history.goBack();
        let style={
            shape:("round" as "round" | "circle" | undefined ),
            size:"large" as "small" | "large" | "middle" | undefined
        }
        return (
            <Form.Item>
                <Row justify="center">
                    <Col span={6}>
                        <Button block={true} type="primary" {...style}> 运 行 </Button>
                    </Col>
                    <Col span={6} offset={6}>
                        <Button block={true} type="ghost" {...style} onClick={goBack}> 返 回 </Button>
                    </Col>
                </Row>
            </Form.Item>
        )
    }
    /**
     * render
     */
    public render() {
        return (
            <div>
                <Back title="后退" />
                <div className="docker-build-content">
                    <Form>  
                        <this.raito/>
                        {this.buttons()}
                    </Form>
                </div>
            </div>
        )
    }
}

export default Build