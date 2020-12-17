import React from "react"
import Back from "../../../components/back"
import{RouteComponentProps} from "react-router-dom"
import {Row,Col,Switch,Button,Form,Input,Select,Space} from 'antd'
import store from "../../../store/index"

type dockerBuildState={
    tty:boolean
    daemon:boolean
    dockerCompose:boolean
    name:string
}
type dockerBuildParam ={
    id:string
    tag:string
    name:string
}


interface dockerBuildProps extends RouteComponentProps<any,any,dockerBuildParam>{
    
}

class Build extends React.Component<dockerBuildProps,dockerBuildState>{
    private store=store.getState()
    constructor(props:dockerBuildProps){
        super(props)
        this.state={
            tty:false,
            daemon:true,
            dockerCompose:false,
            name:""
        }
    }
    //常用的端口列表
    private portList() {
        let ports=[
            {val:80,title:'80 (http(s))'},
            {val:3306,title:'3306 (mysql)'},
            {val:6379,title:'6379 (redis)'},
            {val:27017,title:'27017 (mongo)'},
            ]
        return ports.map((item,index)=>{
            return (
                <Select.Option value={item.val} key={index}>
                    {item.title}
                </Select.Option>
            )
        })
    }
    //已有的容器列表
    private linkList():Array<JSX.Element> {
        let containerList= this.store.container ? this.store.container :[]
        return containerList.map((item,index)=>{
            return (
                <Select.Option value={item.name} key={index}>
                    {item.name}
                </Select.Option>
            )
        })
    }

    private volumeList(fields:Array<any>, { add, remove }:any) {
        let list= fields.map((field,index)=>{
            return (
                <Space key={index} size="large"  >
                    <Form.Item {...field} label="容器目录映射" name={[field.name, 'local']}>
                        <Input placeholder="本机目录" />
                    </Form.Item>

                    <Form.Item {...field} name={[field.name, 'remote']} >
                        <Input placeholder="容器目录" />
                    </Form.Item>

                    <Form.Item {...field}  >
                        <span className="icon-shanchu iconfont remove-volume" onClick={()=>remove(field.name)}/>
                    </Form.Item>
                </Space>
                
            )
        })
        return (
            <>
                {list}
                <Form.Item>
                    <Button onClick={()=>add()}>添加目录映射</Button>
                </Form.Item>
            </>
        )
    }

    private goBack=()=>this.props.history.goBack();

    private hanleLink(links:Array<string>):string {
        links=links ? links :[]
        let data= links.map(item=>{
            return `--link ${item}:${item}`
        })
        return data.join(' ') +' ';
    }

    private hanleProts(prots:Array<string>):string {
        prots=prots ? prots :[]
        let data= prots.map(item=>{
            return `-p  0.0.0.0:${item}:${item}`
        })
        return data.join(' ') +' ';
    }

    private hanleVolume(volumes:Array<{local:string,remote:string}>):string {
        volumes=volumes? volumes :[]
        let data= volumes.map(item=>{
            return `-v ${item.local}:${item.remote}`
        })
        return data.join(' ') +' ';
    }

    private handleSwitch() {
        let restule="";
        this.state.tty ? restule+=`it` : ""
        this.state.daemon ? restule+=`d` : ""
        if(restule){
            restule=` -${restule} `
        }
        return restule
    }

    private submit(values:any) {
        let command="docker run ";
        command+=this.hanleProts(values.prots)
        command+=this.hanleLink(values.link)
        command+=this.hanleVolume(values.volumes)
        command+=this.handleSwitch()
        values.name ? command+=`--name ${values.name} ` : ""
        command+=`${this.props.location.state.name}:${this.props.location.state.tag}`
        console.log(command)
    }
    /**
     * render
     */
    public render() {
        return (
            <div>
                <Back title="后退" />
                <div className="docker-build-content">
                    <Form onFinish={values=>this.submit(values)}>  
                        {/* 输入框 */}
                        <Row>
                            <Col span={10}>
                                <Form.Item label="使用镜像" required className="form-input">
                                    <Input bordered={false} disabled={true} value={this.props.location.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={4}>
                                <Form.Item label="设置别称" name="name" className="form-input">
                                    <Input bordered={false} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* 端口的映射以及link */}
                        <Row>
                            <Col span={10}>
                                <Form.Item name="prots" label="端口映射" className="form-input">
                                    <Select mode="tags" bordered={false}>
                                        {this.portList()}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={4}>
                                <Form.Item name="link" label="容器链接" className="form-input">
                                    <Select mode="tags" bordered={false}>
                                        {this.linkList()}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* 开关选项 */}
                        <Row>
                            <Col span={6}>
                                <Form.Item label="tty" name="tty">
                                <Switch 
                                    checked={this.state.tty}
                                    onChange={()=>this.setState({tty:!this.state.tty})}
                                    checkedChildren="开启" 
                                    unCheckedChildren="关闭"/>
                                </Form.Item>
                            </Col>

                            <Col span={6} offset={3}>
                                <Form.Item label="daemon" name="daemon">
                                    <Switch 
                                    checked={this.state.daemon}
                                    onChange={()=>this.setState({daemon:!this.state.daemon})}
                                    checkedChildren="开启" 
                                    unCheckedChildren="关闭"/>
                                </Form.Item>
                            </Col>

                            <Col span={6} offset={3}>
                                <Form.Item label="dockerCompose" name="dockerCompose">
                                    <Switch 
                                    checked={this.state.dockerCompose}
                                    onChange={()=>this.setState({dockerCompose:!this.state.dockerCompose})}
                                    checkedChildren="保存" 
                                    unCheckedChildren="取消"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.List name="volumes" children={this.volumeList}/>
                        {/* 按钮 */}
                        <Row justify="center">
                            <Col span={6}>
                                <Form.Item>
                                    <Button type="primary" shape="round"  size="large"  block htmlType="submit" > 运 行 </Button>
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={6}>
                                <Button type="ghost" shape="round"  size="large"  block onClick={this.goBack}> 返 回 </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Build