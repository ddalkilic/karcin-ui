import * as React from "react";
import {Badge as Labelx} from 'reactstrap';

export default class Label extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {}
    }
    render(){
        return <Labelx color={this.props.color}>{this.props.text}</Labelx>
    }
}