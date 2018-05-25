import * as React from "react";
import {
    Col,
    Row,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    ButtonGroup
} from 'reactstrap';
import FaIcon from '../faicon/FaIcon';
import Pagination from '../paging/Pagination';


export interface ToolbarProps {
    type?: string | any;
    store?:Array<any> | any;
    data?:Array<any>;
}

export interface ToolbarState {

}


export default class Toolbar extends React.Component<ToolbarProps, ToolbarState>{
    /**
     * Initial props value
     */
    static defaultProps:Partial<ToolbarProps> = {
      type : "header"
    };
    /**
     * Initial values
     */
    constructor(props:ToolbarProps){
        super(props)
    }

    /**
     * return any
     */
    render():any{
        if(this.props.type == "footer"){
            // footer Html Elements
            return <div className="data-grid-footer">
                <Row>
                    <Col xs="4">
                        <div className="showing">
                            {/*<ButtonGroup>*/}
                                {/*<Button color="defaults" active><span>10</span></Button>*/}
                                {/*<Button color="defaults"><span>20</span></Button>*/}
                                {/*<Button color="defaults"><span>30</span></Button>*/}
                            {/*</ButtonGroup>*/}
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="pagination">
                            {/*<ButtonGroup>*/}
                                {/*<Button color="defaults" className="arrow next"><span><FaIcon*/}
                                    {/*code="fa-angle-left"/></span></Button>*/}
                                {/*<Button color="defaults" active><span>1</span></Button>*/}
                                {/*<Button color="defaults"><span>2</span></Button>*/}
                                {/*<Button color="defaults"><span>3</span></Button>*/}
                                {/*<Button color="defaults" className="arrow next"><span><FaIcon*/}
                                    {/*code="fa-angle-right"/></span></Button>*/}
                            {/*</ButtonGroup>*/}
                        </div>
                    </Col>
                    <Col xs="4" className="data-grid-detail">
                        <Pagination pageCount={3}  data={(this.props.store !== undefined) ? this.props.store.props.data : []} selectedValue={(e:any) => {console.log(e)}}/>
                    </Col>
                </Row>
            </div>;
        }else {
            // header Html Elements

            let data = this.props.data;
            let buttons = [];
            let self = this;
            if (data === undefined) {
            } else {
                for (let i = 0; i < data.length; i++) {
                    let value = data[i];
                    buttons.push(<Button key={i} color="defaults" disabled={(value.disabled !== undefined ? value.disabled : false)} onClick={()=>{
                        if(value.url !== undefined){
                            self.urlDirectory(value.url);
                        }else {
                            if(value.onClick !== undefined) {
                                value.onClick()
                            }
                        }
                    }}>{(value.icon !== undefined ?
                        <FaIcon code={value.icon}/> : "")}<span>{value.name}</span></Button>)
                }
            }

            return <div className="data-grid-header">
                <Row>
                    <Col xs="2" className="data-grid-search">
                        <InputGroup>
                            <Input placeholder="Arama"/>
                            <InputGroupAddon addonType="append"><Button><FaIcon
                                code="fa-search"/></Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col xs={{size: 4, offset: 6}} className="header-buttons">
                        <ButtonGroup>
                            {buttons}
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>;
        }
    }

    /**
     * location url
     * @param url
     */
    urlDirectory(url:any){
        window.location.href = url;
    }


}