import React from "react"

type tableProps={
    heads?:Array<string>
    data?:Array<Array<string>>
    pageSize?:number
    dataSource?:Array<Array<{value:string,title:string}>>
}

type tableState={
    page:number
}

class Table extends React.Component<tableProps,tableState>{
    constructor(props:tableProps){
        super(props)
        this.state={page:1}
    }

    private handleDataSource() {
        let heads:Array<string> | undefined=this.props.heads
        let data:Array<Array<string>> | undefined=this.props.data
        let tableData:Array<JSX.Element>=[]
        if(this.props.dataSource && this.props.dataSource.length > 0){
            heads=[]
            this.props.dataSource.forEach((item,index)=>{
                let temp:Array<JSX.Element>=[]
                item.forEach(val=>{
                    if(val.value){
                        if((heads as Array<string>).indexOf(val.title)<0){
                            (heads as Array<string>).push(val.title)
                        }
                        temp.push(<td>{val.value}</td>)
                    }
                })
                if(temp){
                    tableData.push(<tr key={`table-data-${index}`}>{temp}</tr>)
                }
            })
        }else if(data){
            data.forEach((item,index)=>{
                let temp:Array<JSX.Element>=[];
                item.forEach(val=>{
                    temp.push(<td>{val}</td>)
                })
                tableData.push(<tr key={`table-data-${index}`}>{temp}</tr>)
            })
        }
        return (<tbody>
                <tr>{(heads as Array<string>).map(item=><td>{item}</td>)}</tr>
                        {data}  
            </tbody>)
    }
    
    private getContent():JSX.Element {
       if((this.props.data && this.props.heads) || this.props.dataSource){
        return <table>{this.handleDataSource()}</table>
       }
       return <span/>
    }

    /**
     * render
     */
    public render():JSX.Element {
        return (
            
                    this.getContent()
        )
    }
}

export default Table