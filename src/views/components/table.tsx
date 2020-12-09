import React from "react"

type tableProps={
    heads:Array<string>
    data:Array<string>
    pageSize?:number
}

type tableState={
    page:number
    
}

class Table extends React.Component<tableProps>{
    private setHeads():JSX.Element {
        let tds= this.props.heads.map((item,index)=><td key={`table-heads-${index}`}>{item}</td>)
        return <tbody><tr>{tds}</tr></tbody>
    }

    private setData():JSX.Element {
        let tds= this.props.data.map((item,index)=><td key={`table-data-${index}`}>{item}</td>)
        return <tbody><tr>{tds}</tr></tbody>
    }
    /**
     * render
     */
    public render():JSX.Element {
        return (
            <table>
                {/* heade */}
                {this.setHeads()}
                {/* data */}
                <tbody> 
                    {this.setData()}
                </tbody>
            </table>
        )
    }
}

export default Table