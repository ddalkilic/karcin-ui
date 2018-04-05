import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Row, InputGroup, InputGroupAddon, Input, Button, ButtonGroup, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import FaIcon from '../faicon/FaIcon';

export interface TableHeadProps {
    fields : any
}

export interface TableHeadState {
    fields : any,
    clickActive : any[],
    popover : any[]
}

export default class TableHead extends React.Component<TableHeadProps, TableHeadState> {
    constructor(props:TableHeadProps){
        super(props);

        this.state = {
            fields: this.props.fields,
            clickActive : [],
            popover : []
        };
    }

    componentWillReceiveProps(props:any){
        this.setState({
            fields : this.props.fields
        })
    }



    render() {
        let Cell = [];
        let self = this;

        for(let i = 0; i < this.state.fields.length; i++) {
            let value = this.state.fields[i];

            if(self.state.popover[i] === undefined) {
                self.state.popover[i] = false;
            }

            Cell.push(<th key={i}>
                <span>{value.name}</span>
                <div className="title-option">
                    <span className="filter" id={'Popover' + i} onClick={() => {
                        self.popoverOpen(i)
                    }}><FaIcon code="fa-filter"/></span>
                    <span className="order"><FaIcon code="fa-sort"/></span>

                    <Popover placement="bottom" isOpen={self.state.popover[i]} target={`Popover${i}`}
                             toggle={() => {
                                 self.popoverOpen(i)
                             }} className="popup-over-search">
                        <PopoverHeader>Adı</PopoverHeader>
                        <PopoverBody>
                            <InputGroup>
                                <Input placeholder="Arama"/>
                                <InputGroupAddon addonType="append"><Button><FaIcon
                                    code="fa-search"/></Button></InputGroupAddon>
                            </InputGroup>
                        </PopoverBody>
                    </Popover>
                </div>
                </th>);
        }
        return <thead><tr>{Cell}</tr></thead>;
    }


    public popoverOpen(param: number): void {
        this.state.popover[param] = !this.state.popover[param];
        this.forceUpdate();
    }


}