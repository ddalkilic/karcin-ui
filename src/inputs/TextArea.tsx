import * as React from "react";
import Input from "./base/BaseInput";
import {Label,InputGroup,InputGroupAddon} from "reactstrap";
//css de hem veritical hem horizontal olması sağlandı

export interface TextAreaProps extends React.InputHTMLAttributes<HTMLInputElement>{
    /**
     * css style name describe .class
     */
    className?:string;
    /**
     *  Set the name
     */
    name?:string;
    /**
     * Set the value
     */
    value?:string;
    properties?:object | any;
    /**
     * Return function
     */
    onChange?: any;
    /**
     * Set the string title
     */
    label?: string | any;
    /**
     * Null or empty control
     */
    valid?:boolean | any;
}


export default class TextArea extends React.Component<TextAreaProps,any>{
    /**
     * Initial props value
     * @type {{properties: {}; name: string; value: string}}
     */
    public static defaultProps:Partial<TextAreaProps> = {
        properties : {},
        name:"textArea",
        value: ""
    }

    /**
     * Initial values
     * @param props
     */
    constructor(props:any){
        super(props);
    }

    /**
     * @returns {any}
     */
    render():any{
        let validColor:string = this.props.valid != undefined ? (this.props.valid != false ? (this.isValid() == false ? "red" : "") : "") : "";
        return <div className="karcin-input">
            {this.props.label != undefined ? <Label className={"label-properties"}>{this.props.label}</Label> : null}
            <textarea
                className={this.props.className+ " form-control"}
                name={this.props.name}
                value={this.props.value}
                autoFocus={this.props.properties.autoFocus}
                readOnly={this.props.properties.readOnly}
                required={this.props.properties.required}
                disabled={this.props.properties.disabled}
                cols={this.props.properties.cols}
                rows={this.props.properties.rows}
                onChange={this.onChange.bind(this)}
                style={{borderColor:validColor}}
            />
            </div>
    }
    onChange(e:any){
        this.props.onChange(e);
    }
    isValid(){
        //Kontrol true ise boş değil , false ise boş veya null
        let control:boolean = true;
        if(this.props.value == "" || this.props.value == null){
            control = false;
        }
        return control;
    }
}
