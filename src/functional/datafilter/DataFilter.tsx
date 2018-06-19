import * as React from 'react';
import FaIcon from '../faicon/FaIcon'
import {Input} from 'reactstrap';
import { ENGINE_METHOD_DIGESTS } from 'constants';

export interface DataFilterProps {
    /**
     * Set the fields model (Array)
     */
    field: Array<any> | any;
    /**
     * Manage the values (function)
     */
    onChange?: React.EventHandler<any> | any;

    /**
     * label text
     */
    label?: string | any;

    /**
     * label position : [up(default), left, right]
     */
    labelPosition?: string | any;

    /**
     * label case boolean (default:true)
     */
    labelCase?: boolean | any;

    /**
     * data name get field name
     */
    nameFieldName?: string | any;

    /**
     * data name get field type
     */
    typeFieldName?: string | any;

    /**
     * data name get field label
     */
    labelFieldName?: string | any;

    /**
     * data child items name
     */
    itemsFieldName?: string | any
}

export interface DataFilterState {
    inputText?: any,
    showing?: any,
    selectedItem?: any[] | any,
    selectText?: any[] | any,
    getListResult?: object | any,
    active ?: object | any,
    dropDownList ?: any,
    focusControl ?: object | any
}


export default class DataFilter extends React.Component<DataFilterProps, DataFilterState> {
    /**
     * @type {null}
     */
    inputText:any = null;
    /**
     * @type {string}
     */
    inputType:string =  "text";


    /**
     * Default props
     * @type {{labelPosition: string}}
     */
    static defaultProps: Partial<DataFilterProps> = {
        labelPosition : 'up',
        labelCase : true,
        nameFieldName: 'name',
        typeFieldName: 'type',
        labelFieldName: 'label',
        itemsFieldName : 'items'
    };

    /**
     * @type {{label: string; name: string}[]}
     */
    operators:any[] = [
        {[this.props.labelFieldName]: '=', [this.props.nameFieldName]: 'equal'},
        {[this.props.labelFieldName]: '!=', [this.props.nameFieldName]: 'not equal'},
        {[this.props.labelFieldName]: '<', [this.props.nameFieldName]: 'less'},
        {[this.props.labelFieldName]: '<=', [this.props.nameFieldName]: 'less or equal'},
        {[this.props.labelFieldName]: '>', [this.props.nameFieldName]: 'greater'},
        {[this.props.labelFieldName]: '>=', [this.props.nameFieldName]: 'greater or equal'},
        {[this.props.labelFieldName]: '~=', [this.props.nameFieldName]: 'like'},
        {[this.props.labelFieldName]: '|=', [this.props.nameFieldName]: 'in(use | to separate)'}
    ];

    /**
     * Initial values
     * @param {DataFilterProps} props
     */
    constructor(props: DataFilterProps) {
        super(props);

        this.state = {
            inputText: {value: ""},
            showing: {filterName: false, operator: false, value: false, dropValue:false},
            selectedItem: [],
            selectText: [],
            getListResult : {data:[]},
            active: {arrowActive:null},
            focusControl: {control:false}
        };


        // boş alana tıklanıldığını kontol eden method
        window.addEventListener('click', (event:any) => {
            if(this.state.focusControl.control !== false) {
                let control = false;
                event.path.forEach((value: any) => {
                    if (value.className !== undefined && value.className !== "" && value.className.indexOf("karcin-data-filter") !== - 1) {
                        control = true;
                    }
                });

                if (!control) {
                    this.inputOutFocus();
                }
            }
        });
    }

    /**
     * @returns {any}
     */
    render():any {

        let getFilterItem = this.getSelectFieldItem();

        return (<div className={`karcin-data-filter ${this.props.labelPosition}`} onClick={() => {
            this.focusInput()
        }}>
            {this.labelResult()}
            <div className={`filter-content ${(this.state.focusControl.control) ? 'input-focus' : ''}`}>
                {(this.state.selectedItem.length > 0) ?
                    <div className="selected-items">
                        {this.getSelectedItem()}
                    </div>
                    : ''}

                <div className="half-select">
                    {this.getSelectText()}
                </div>
                <div className="text-input">
                    <input value={this.state.inputText.value}
                           className="form-control" type={this.inputType} name="inputText" onKeyDown={(e) => {
                        this.inputKeyControl(e)
                    }} id="inputText"
                           onChange={(e) => {
                               this.handleChange(e)
                           }} ref={(e) => {
                        this.inputText = e;
                    }}/>

                    {(this.state.showing.filterName || this.state.showing.operator || this.state.showing.value) ?
                        (getFilterItem.length > 0) ? <div className="selected-field" key={0}>{getFilterItem}</div> : ""
                        : ''}

                </div>
            </div>
        </div>);
    }


    /**
     * input value control methodu
     * @param e
     */
    handleChange(e:any) {
        this.state.inputText.value = e.target.value;
        this.forceUpdate();
        this.fieldShowingControl()
    }

    /**
     * label return methodu
     */
    labelResult(){
        let returnLabel:any = null;
        if(this.props.label !== undefined){
            returnLabel = <label className="karcin-label">{this.props.label}</label>
        }
        return returnLabel;
    }

    /**
     * input ' a focus olduğunda çalışan method
     */
    focusInput() {
        this.setState({
            focusControl: {control: true}
        });
        this.inputText.focus();
        this.fieldShowingControl();
        this.forceUpdate();
    }

    /**
     * dropdown ' u ve itemlarını aktifliğini sıfırlayan methos
     */
    inputOutFocus() {
        this.setState({
            showing: {filterName:false, operator:false, value:false, dropValue:false},
            active : {arrowActive:null},
            focusControl: {control: false}
        });
    }

    /**
     * input ' yazılan verileri ve inputu sıfırlayan method
     */
    inputReset() {
        this.setState({
            selectText: [],
            inputText: {value:""}
        });

        this.inputType = "text";
    }

    /**
     * dropdown ' a basılacak itemları return eden method
     * @returns {JSX.Element[]}
     */
    getSelectFieldItem():JSX.Element[] {
        let getLists: any[] = [];
        let getListResultData:any[] = [];
        let getArray:any = [];

        if (this.props.field !== undefined) {

            if (this.state.showing.filterName) {
                getArray = [];

                // dropdown items
                this.props.field.forEach((value:any, index:number)=>{
                    if (this.state.inputText.value !== "") {
                        if(!this.props.labelCase) {
                            if (value[this.props.labelFieldName].search(this.state.inputText.value) !== -1) {
                                getArray.push(value);
                            }
                        }else {
                            if (value[this.props.labelFieldName].toLowerCase().search(this.state.inputText.value.toLowerCase()) !== -1) {
                                getArray.push(value);
                            }
                        }
                    } else {
                        getArray.push(value);
                    }
                });

                getArray.forEach((value: any, index: number) => {
                    let returnHtml: JSX.Element = <div key={index} className={`item ${(this.state.active.arrowActive === index) ? 'active' : ''}`} onClick={() => {
                        this.setName(value)
                    }}><span>{value[this.props.labelFieldName]}</span></div>;

                    getLists.push(returnHtml);
                    getListResultData.push(value);

                });
            } else if (this.state.showing.operator) {
                getArray = [];

                // dropdown items
                this.operators.forEach((value:any, index:number)=>{
                    if (this.state.inputText.value !== "") {
                        if(!this.props.labelCase) {
                            if (value[this.props.labelFieldName].search(this.state.inputText.value) !== -1) {
                                getArray.push(value);
                            }
                        }else {
                            if (value[this.props.labelFieldName].search(this.state.inputText.value.toLowerCase()) !== -1) {
                                getArray.push(value);
                            }
                        }
                    } else {
                        getArray.push(value);
                    }
                });

                getArray.forEach((value: any, index: number) => {
                    let returnHtml: JSX.Element = <div key={index} className={`item ${(this.state.active.arrowActive === index) ? 'active' : ''}`} onClick={() => {
                        this.setOperator(value)
                    }}><span>{value[this.props.labelFieldName] + " " + value[this.props.nameFieldName]}</span></div>;
                    getLists.push(returnHtml);
                    getListResultData.push(value);
                });

            } else if (this.state.showing.value) {
                let getItems = this.fieldValueShowing();
                getArray = [];
                this.state.showing.dropValue = false;
                if (getItems.length > 0) {
                    this.state.showing.dropValue = true;

                    // dropdown items
                    getItems.forEach((value:any, index:number)=>{
                        if (this.state.inputText.value !== "") {
                            if(!this.props.labelCase) {
                                if (value[this.props.labelFieldName].toLowerCase().search(this.state.inputText.value) !== -1) {
                                    getArray.push(value);
                                }
                            }else {
                                if (value[this.props.labelFieldName].toLowerCase().search(this.state.inputText.value.toLowerCase()) !== -1) {
                                    getArray.push(value);
                                }
                            }
                        } else {
                            getArray.push(value);
                        }
                    });

                    getArray.forEach((value: any, index: number) => {
                        let returnHtml: JSX.Element = <div key={index} className={`item ${(this.state.active.arrowActive === index) ? 'active' : ''}`} onClick={() => {
                            this.setValue(value)
                        }}><span>{value[this.props.labelFieldName]}</span></div>;
                        getLists.push(returnHtml);
                        getListResultData.push(value);
                    });
                }
            }
        }

        this.state.getListResult.data.length = 0;
        this.state.getListResult.data = getListResultData;

        return getLists;
    }

    /**
     * input typenı belirleyen method
     * @returns {JSX.Element[]}
     */
    fieldValueShowing():JSX.Element[] {
        let getLists: any[] = [];
        let inputType: any = "text";

        this.props.field.forEach((value: any, index: number) => {
            if (this.state.selectText.length > 0 && this.state.selectText[0][this.props.nameFieldName] === value[this.props.nameFieldName]) {
                if (value[this.props.typeFieldName] === "password") {
                    getLists = [];
                    inputType = "password";
                } else if (value[this.props.typeFieldName] === "number") {
                    getLists = [];
                    inputType = "number";
                } else if (value[this.props.typeFieldName] === "select" || value[this.props.typeFieldName] === "radio") {
                    if (value[this.props.itemsFieldName] !== undefined) {
                        getLists = value[this.props.itemsFieldName];
                    }
                    inputType = "text";
                } else {
                    getLists = [];
                    inputType = "text";
                }
            }
        });

        this.inputType = inputType;
        return getLists;
    }

    /**
     * filtername seçildikten sonra setlemek için kullanılan method
     * @param val
     */
    setName(val: any) {
        val['openType'] = "filterName";
        this.state.selectText.push(val);
        this.state.showing.filterName = false;
        this.state.showing.operator = true;
        this.state.inputText.value = "";
        this.state.active.arrowActive = null;
        this.forceUpdate();
    }

    /**
     * operator seçildikten sonra setlemek için kullanılan method
     * @param val
     */
    setOperator(val: any) {
        val['openType'] = "operator";
        this.state.selectText.push(val);
        this.state.showing.operator = false;
        this.state.showing.value = true;
        this.state.inputText.value = "";
        this.state.active.arrowActive = null;
        this.forceUpdate();
    }

    /**
     * value seçildikten sonra setlemek için kullanılan method
     * @param val
     */
    setValue(val: any) {
        val['openType'] = "value";
        this.state.selectText.push(val);
        this.state.showing.value = false;
        this.state.inputText.value = "";
        this.forceUpdate();
        this.textConvertItem();
    }

    /**
     * selected yaptıktan sonra seçili değişkenine atayan method
     * @returns {JSX.Element[]}
     */
    getSelectedItem():JSX.Element[] {
        let getList: any[] = [];

        this.state.selectedItem.forEach((value: any, index: number) => {

            // items value print
            let itemsName: any[] = [];
            value.forEach((val: any, id: number) => {
                itemsName.push(val[this.props.labelFieldName]);
            });

            getList.push(<div className="item" key={index}>
                <span>{itemsName.join(' ')}</span>
                <span className="close-button" onClick={() => {
                    this.removeSelectItem(index)
                }}><FaIcon code="fa-times"/></span>
            </div>);
        });
        return getList;
    }

    /**
     * seçili itemları silen method
     * @param {number} id
     */
    removeSelectItem(id: number) {
        this.state.selectedItem.splice(id, 1);
        this.state.active.arrowActive = null;

        if(this.props.onChange !== undefined){
            this.props.onChange(this.state.selectedItem);
        }
        this.forceUpdate();
    }

    /**
     * filter namelerin dropdown u açan method
     */
    fieldShowingControl() {
        if (this.state.selectText.length <= 0) {
            this.state.showing.filterName = true;
            this.forceUpdate();
        }
    }

    /**
     * input da seçtikten sonra selectText ' e atayan method
     * @returns {JSX.Element[]}
     */
    getSelectText():JSX.Element[] {
        let getLists: any[] = [];

        if (this.state.selectText.length > 0) {
            this.state.selectText.forEach((val: any, index:number) => {
                getLists.push(<span key={index}>{val[this.props.labelFieldName]}</span>);
            });
        }
        return getLists;
    }

    /**
     * selectText' i selectItem' a atayan method
     */
    textConvertItem() {
        if (this.state.selectText.length >= 3) {
            let text: any = [];
            this.state.selectText.forEach((value: any, index: number) => {
                text.push(value);
            });

            this.state.selectedItem.push(text);
            this.inputReset();

            this.props.onChange(this.state.selectedItem);
        }
    }

    /**
     * input focusken key controlu yapan ona göre metodları çalıştıran method
     * @param event
     */
    inputKeyControl(event: any) {
        // "enter" key code
        if (event.keyCode === 13) {
            // value select item 
            if(this.state.getListResult.data.length <= 0 && this.state.selectText.length >= 2 && this.state.inputText.value !== "" && !this.state.showing.dropValue){
                this.setValue({[this.props.labelFieldName]: this.state.inputText.value});
            }

            if(this.state.active.arrowActive !== null){
                this.enterSelectArrowItem();
            }

        } else if (event.keyCode === 8 && this.state.inputText.value === "" && (this.state.selectedItem.length > 0 || this.state.selectText.length > 0)) {
            this.backSpaceRemoveItem();
        }else if(event.keyCode == 38) {
            this.arrowSelectFieldUp();
        }else if(event.keyCode == 40){
            this.arrowSelectFieldDown();
        }
    }


    /**
     * backspace bastığımızda itemları ve karakterleri silen method
     */
    backSpaceRemoveItem() {
        let lastItem: any[] = [];
        let inItemLast: any = {};

        if (this.state.selectText.length > 0) {
            inItemLast = this.state.selectText[this.state.selectText.length - 1];
            lastItem = this.state.selectText.slice(this.state.selectText.length - 1);
            this.state.selectText.splice(this.state.selectText.length - 1, 1);

            this.inputType = "text";
            for (let item in this.state.showing) {
                if (item === lastItem[0].openType) {
                    this.state.showing[item] = true;
                } else {
                    this.state.showing[item] = false;
                }
            }

        } else {
            lastItem = this.state.selectedItem.slice(this.state.selectedItem.length - 1);
            this.state.selectedItem.splice(this.state.selectedItem.length - 1, 1);
            lastItem[0].forEach((value: any, index: number) => {
                let numbers = index + 1;

                if (lastItem[0].length > numbers) {
                    this.state.selectText.push(value);
                } else {
                    inItemLast = value;
                    // fieldShowingControl
                    for (let item in this.state.showing) {
                        if (item === value.openType) {
                            this.state.showing[item] = true;
                        } else {
                            this.state.showing[item] = false;
                        }
                    }
                }
            })


        }

        this.state.active.arrowActive = null;
        this.state.inputText.value = inItemLast[this.props.labelFieldName];
        this.forceUpdate();
    }

    /**
     * arrow up ' a bastığımız zaman dropdowndaki itemları seçmek için kullanılan method
     */
    arrowSelectFieldUp(){
        this.dropdownShowing();
        if(this.state.active.arrowActive > 0){
            let active = this.state.active.arrowActive;
            this.state.active.arrowActive = active - 1;
            this.forceUpdate();

        }
    }

    /**
     * arrow down ' a bastığımız zaman dropdowndaki itemları seçmek için kullanılan method
     */
    arrowSelectFieldDown(){
        this.dropdownShowing();
        if(this.state.getListResult.data.length >= 0){
            let active = 0;

            if(this.state.active.arrowActive !== null){
                active = this.state.active.arrowActive;
                if(active < this.state.getListResult.data.length - 1){
                    this.state.active.arrowActive = active + 1;
                }
            }else {
                this.state.active.arrowActive = active;
            }

            this.forceUpdate();
        }
    }

    /**
     * arrow tuşlarıyla seçtikten sonra enter tuşuna basarak seçmemizi sağlayan method
     */
    enterSelectArrowItem(){
        let value = this.state.getListResult.data[this.state.active.arrowActive];

        if(value !== undefined){
            if(this.state.showing.filterName){
                this.setName(value);
            }else if(this.state.showing.operator){
                this.setOperator(value);
            }else if(this.state.showing.value){
                this.setValue(value);
            }
        }
    }

    /**
     * dropdown content controlling of the showing
     */
    dropdownShowing(){
        if(this.state.selectText.length === 2){
            this.state.showing.value = true;
        }else if(this.state.selectText.length === 1){
            this.state.showing.operator = true;
        }else {
            this.state.showing.filterName = true;
        }
        this.forceUpdate();
    }


}