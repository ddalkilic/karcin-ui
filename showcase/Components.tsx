import * as React from "react";
import {Menu} from "karcin-ui";
import RenderComponents from "./RenderComponent";

export interface ComponentsProps {
    menuToggle ?: any
}

export interface ComponentsState {
    data?:any,
    active?:any[] | any
}



export default class Components extends React.Component<ComponentsProps, ComponentsState> {
    constructor(props:ComponentsProps){
        super(props);
        const json = require('./ComponentList.json');
        this.state = {
            data:json.data,
            active : []
        };
    }

    render() {
        let item = this.getItem(window.location.hash, this.state.data);
        let detailCmp = null;
        if (item.length > 0){
            detailCmp = (
                <RenderComponents item={item[0]}/>
            );
        } else {
            detailCmp = <span>Component Bulunamadı...</span>;
        }

        return (<div className="content-component">
            <div className={`side-menu ${this.props.menuToggle ? 'close-menu' : ''}`}>
                <div className="side-menu-container">
                    <Menu data={this.state.data} accordion={true} active={this.state.active}/> 
                </div>
            </div>
            <div className="container-component content-page">{detailCmp}</div></div>);
    }

    componentDidMount(){
        this.setActiveMenu();
    }

    componentWillReceiveProps(){
        this.setActiveMenu();
    }

    setActiveMenu(){
        let item = this.getItem(window.location.hash, this.state.data);
        if (window.location.hash.split("#/Components/")[1] == undefined){
            window.location.hash = "#Components/Button";
        }
        if (item.length > 0){
            this.state.active.length = 0;
            this.state.active.push(item[0]);
            this.forceUpdate();
        }
    }

    getItem(href,data, item=[]){
        if (data && this.state.data.length > 0){
            data.forEach((v,i)=>{
                if (v.items && v.items.length > 0){
                    this.getItem(href,v.items, item);
                } else {
                    if (v.href == href){
                        item.push(v);
                    }
                }
            });
        }
        return item;
    }

}