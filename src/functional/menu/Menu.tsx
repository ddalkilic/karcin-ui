import * as React from "react";
import {Nav, NavItem, NavLink, Collapse, Badge} from "reactstrap";
import {FaIcon} from "../../index";
import "../../css/sass/menu.scss";

export interface MenuProps {
    data: Array<MenuItemsProps>;
    onChange?: React.EventHandler<any>;
    active?: MenuItemsProps;
    type?: string;
}

export interface MenuItemsProps {
    id:number,
    name:string,
    title?:string,
    icon?:string,
    href?:string,
    collapse?:boolean,
    items?:Array<MenuItemsProps>,
    badgeColor?:string,
    badge?:string
}

export interface MenuState {
    active?: any
}


export default class Menu extends React.Component<MenuProps,MenuState> {

    static defaultProps: Partial<MenuProps> = {
        type: 'dropDown'
    };

    constructor(props:MenuProps){
        super(props);
        this.state = {
            active: {}
        };
    }


    render() {
        let menu = this.getMenu(this.props.data);
        return (menu);
    }

    getMenu(arr:Array<MenuItemsProps>){
        let me = this;
        let menu:any = [];
        if (Array.isArray(arr) && arr.length > 0){
            arr.forEach((v,i)=>{
                let subMenu = null;
                if (v.items != undefined && Array.isArray(v.items) && v.items.length > 0){
                    subMenu = me.getMenu(v.items);
                    menu.push(<CollapseMenu key={i} item={v} collapse={v.collapse} type={me.props.type}>
                        {subMenu}
                    </CollapseMenu>);
                } else {
                    menu.push(me.getMenuItem(v,i));
                }
            });
        }
        return <Nav vertical className={`karcin-menu ${(this.props.type === 'hover') ? 'hover-menu' : ''}`}>{menu}</Nav>;
    }

    getMenuItem(item:MenuItemsProps,key:any){
        let activeClass = (item.id == this.state.active.id && item.name == this.state.active.name)?"active":"";
        return <NavItem key={key} className={activeClass}>
            <div className="menu-head" onClick={()=>{ if(this.props.type === 'dropDown'){this.setActiveItem(item)} }}>
                <NavLink href={(item.href) ? item.href : "#"}>
                    {(item.icon !== undefined) ? <FaIcon code={item.icon} className="menu-icon"/> : ''}
                    {item.title}{(item.badge !== undefined) ? <Badge color={item.badgeColor}>{item.badge}</Badge> : ''}
                    {(item.items !== undefined) ? (activeClass === "active" ? <FaIcon code="fa-angle-down" className="open-icon"/> : <FaIcon code="fa-angle-right" className="open-icon"/>) : ''}
                </NavLink>
            </div>
        </NavItem>;
    }

    setActiveItem(item:MenuItemsProps){
        this.setState({active:item});
        if (this.props.onChange){
            this.props.onChange(item);
        }
    }
}

export class CollapseMenu extends React.Component<any,any> {


    constructor(props:any){
        super(props);
        this.state = { collapse: props.collapse || false };
    }

    render(){
        let item = this.props.item;
        let self = this;
        return <NavItem className={(this.state.collapse ? "opened" : "")}>
            <div className="menu-head" onClick={()=>{
                if(self.props.type === 'dropDown'){self.toggle()}
            }}>
                {(item.icon !== undefined) ? <FaIcon code={item.icon} className="menu-icon"/> : ''}
                <NavLink href={(item.href) ? item.href : '#'}>{item.title}</NavLink>
                {(item.badge !== undefined) ? <Badge color={item.badgeColor}>{item.badge}</Badge> : ''}
                {(item.items !== undefined) ? (this.state.collapse ? <FaIcon code="fa-angle-down" className="open-icon"/> : <FaIcon code="fa-angle-right" className="open-icon"/>) : ''}
            </div>
            <Collapse isOpen={this.state.collapse}>
                {this.props.children}
            </Collapse>
        </NavItem>
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
}