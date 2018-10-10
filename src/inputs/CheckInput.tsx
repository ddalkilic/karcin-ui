import * as React from "react";


export interface CheckListProps{
    /**
     * Set the array data
     */
    items ?: Array<any>;
    /**
     * Set the object data
     */
    item ?: object;
    /**
     * Set the default component name
     */
    name ?: string;
    /**
     * Set the Selected checked elements id
     */
    checkObjects ?: Array<any>;
    /**
     * Set the show value
     */
    value : string;
    /**
     * Set the default id
     */
    id : string | number;
    /**
     * Change the checklist
     */
    onChange ?: React.EventHandler<any> | any;
    /**
     * render the data (return val)
     */
    onRenderer ?: any;
    /**
     * Set the string label
     */
    label?: string;
    /**
     * Set the unique key
     */
    key ?: string | number;
}

export default class CheckInput extends React.Component<CheckListProps,any>{
    state :any = {};
    isChecked = false;
    constructor(props:any){
        super(props);
        props.items != undefined ?
        props.items.map((v:any, i:number) => {
            this.state[v[props.id]] = false
        })
            : this.state[props.item.id] =false
    }


    /**
     * isChecked false olana kadar seçili datalar ayıklanır ve
     * tüm datanın state durumu güncellenir,
     * id : true or false şeklinde tüm checkinputlar state te tutulur.
     * @returns {any}
     */
    render():any{
        let me:any = this;
        return <div>
            {this.props.label != undefined ? <b>{this.props.label}</b> : ""}
            <div className="list-group-item form-group">
            {me.props.items != undefined ? this.returnItems() : this.returnItem()}
            {this.isChecked = true}
        </div>
        </div>
    }

    returnItems(){
        let me:any = this;

        return me.props.items.length > 0 ?
            me.props.items.map((value:any, i:number) => (
                <div key={i}>
                    <label className={"check-container"}>
                        {this.props.onRenderer != undefined ? this.props.onRenderer(value) : value[me.props.value] }
                        {this.childInputElements(value)}
                        <span className={"checkmark"}></span>
                    </label>
                </div>
            )) : <div key={-1}>
                <label className={"check-container"}>
                    {this.childInputElements(null)}
                    <span className={"checkmark"}></span>
                </label>
            </div>;
    }
    returnItem(){
        let me : any = this;
        return <div key={this.props.key}>
            <label className={"check-container"}>
                {me.props.onRenderer != undefined ? me.props.onRenderer(me.props.item) : me.props.item[me.props.value] }
                {this.childInputElements(me.props.item)}
                <span className={"checkmark"}></span>
            </label>
        </div>
    }

    /**
     * CheckObjects varsa checked ile kontrol sağlanıyor,
     * Eğer ki yoksa inputun kendinden kontrol sağlanıyor
     * @param value
     * @returns {any}
     */
    childInputElements(value:any){
        let me = this;
        return value != null ? (this.props.checkObjects != undefined ?
            <input
                className={"checkbox"}
                onChange={(e:any) => this.onChange(value[me.props.id], e.target.checked)}
                type='checkbox'
                value={this.state[value[me.props.value]]}
                checked={this.isChecked == false ?
                    this.returnTrueOrFalseChecked(value) :
                    this.isCheckedControl(value)}
            /> :
            <input
                className={"checkbox"}
                onChange={(e:any) => this.onChange(value[me.props.id], e.target.checked)}
                type='checkbox'
                value={this.state[value[me.props.value]]}
            />) : "item undefined";
    }

    /**
     * State kontrolü ile check olup omadığı kontrol edilir.
     * Daha önce onChange metodunda state ki kontrol direkt olarak değiştiği
     * için true ya da false değeri direkt return olunur.
     * @param val
     * @returns {boolean}
     */
    isCheckedControl(val:any):boolean{
        return this.state[val[this.props.id]];
    }

    /**
     * Props methoda array şeklinde return oluyor
     * @param key
     * @param value
     */
    onChange(key:any, value:any) {
        this.setState({ [key]: value }, () => {
            let state = [];
            let name = this.props.name;
            for(let i in this.state){
                if(this.state.hasOwnProperty(i)) {
                    let idx = parseInt(i);
                    let data = this.returnTrueData(idx);
                    let value = this.state[i];
                    if(value != false) {
                        state.push(data);
                    }
                }
            }
            let returnValue = {
                    target : {
                        name: this.props.name,
                        value: state
                    }
            }
            this.props.onChange(returnValue)
        })
    }

    /**
     * Return the selectedData
     * @param idx
     * @returns {any}
     */
    returnTrueData(idx:any){
        let propsData:Array<any> | any = this.props.items;
        let data:any = null;
        let me = this;
        propsData != undefined ?
        propsData.forEach(function (val:any,id:number) {
            if(val[me.props.id] == idx){
                data = val;
            }
        })
        : data = me.props.item;
        return data;
    }

    /**
     * İlk değer de hangi elemeanların checkeleneceğinin kontrolünü sağlar
     * @param val
     * @returns {boolean}
     */
    returnTrueOrFalseChecked(value:any){
        let me = this;
        let bool = false;
        me.props.checkObjects != undefined ?
            me.props.checkObjects.forEach(function (val:any, idx:number) {
                if(val[me.props.id] == value[me.props.id]){
                    bool = true;
                    me.state[value[me.props.id]] = true;
                }
            }) : null;
        return bool;
    }

}
