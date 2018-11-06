import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "./../../button/Button";

export default class Confirm extends React.Component<any,any>{


    state:any;

    constructor(props:any){
        super(props)
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(props:any){
        this.state = {
            show : props.show
        }
    }

    render (){
        return this.getMessageElement()
    }

    getMessageElement(){
        return <div className={"modal fade show-box "+(this.state.show == true ? "show" : "")}
                    style={this.state.show == true ? {display:"block"} : {display:"none"}}
                    id="exampleModalCenter"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {this.props.message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.tmm.bind(this)} name="OK" className="btn btn-primary" data-dismiss="modal">Tamam</button>
                        <button type="button" onClick={this.ipt.bind(this)} name="CANCEL" className="btn btn-primary btn-outline-dark">İptal</button>
                    </div>
                </div>
            </div>
        </div>
    }

    componentWillUnmount(){
        let mount:any = ReactDOM.findDOMNode(this);
        document.body.style.removeProperty('overflow');
        document.body.removeChild(mount.parentElement);
    }

    tmm(e:any){
        this.setState({show : false})
        e.response = {name:e.target.name, value:true};
        this.props.callBack != undefined ? this.props.callBack(e) : null;
        let mount:any = ReactDOM.findDOMNode(this);
        ReactDOM.unmountComponentAtNode(mount.parentElement);
    }

    ipt(e:any){
        this.setState({show : false})
        let mount:any = ReactDOM.findDOMNode(this);
        e.response = {name:e.target.name, value:false};
        this.props.callBack != undefined ? this.props.callBack(e) : null;
        ReactDOM.unmountComponentAtNode(mount.parentElement);
    }
}
