import * as React from "react";
import { Container, Row, Col, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import {FaIcon,I18N,I18NProvider} from "karcin-ui";
import HomePage from "./HomePage";
import { HashRouter as Router, Route, Link, browserHistory, Switch } from "react-router-dom";
import Components from "./Components";
import Docs from "./Docs";
import NotFound from "./NotFound";
import {IntlProvider, FormattedMessage,addLocaleData} from 'react-intl';
const tr = require("./jsons/tr.json");
const en = require("./jsons/en.json");


const lang = {
    tr: tr,
    en:en
};


export default class Main extends React.Component<any, any> {

    constructor(props:any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        let lang = "tr";

        if (localStorage.getItem("lang") != undefined && localStorage.getItem("lang") != null){
            lang = localStorage.getItem("lang")
        }
        this.state = {
            isOpen: false,
            sideMenuOpen: false,
            responsiveMenu : false,
            menuResponsiveSize:900,
            lang:lang
        };

        if(this.state.menuResponsiveSize >= window.innerWidth){
            this.setState({
                responsiveMenu : true,
                sideMenuOpen:true
            });
        }

        window.addEventListener('resize', () => {
            if(window.innerWidth <= this.state.menuResponsiveSize){
                this.setState({
                    responsiveMenu : true,
                    sideMenuOpen : true
                });
            }else {
                this.setState({
                    responsiveMenu : false,
                    sideMenuOpen: false
                });
            }
        });
    }

    render() {
        return (
                <I18NProvider language={lang[this.state.lang]}>
                    <div id="showcase-content">
                        <Navbar className={`main-menu ${(window.location.hash == "#/")?"active-menu":""}`} expand="md">
                            <div className="header-logo">
                                <a href="#" className="logo-img">
                                    <img src={`./img/logo-reverse.png`} height="50" />
                                </a>
                                {(window.location.hash !== "#/" && window.location.hash.search("#/Components") !== -1)?
                                    <div className={`side-menu-button ${this.state.sideMenuOpen ? 'active' : ''}`} onClick={()=>this.sideMenuToggle()}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    :''}
                            </div>

                            <NavbarToggler onClick={this.toggle}><FaIcon code={`${(this.state.isOpen)?"fa-times":"fa-bars"}`}  /></NavbarToggler>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#Components">
                                            <I18N id="title.component"/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#Docs">
                                            <I18N id="title.doc"/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#Samples">
                                            <I18N id="title.sample"/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#About">
                                            <I18N id="title.about"/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/ysimsek/karcin-ui">Github</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <I18N id="title.language"/>
                                        </DropdownToggle>
                                        <DropdownMenu right={true}>
                                            <DropdownItem onClick={this.langChange.bind(this,"tr")}>
                                                <I18N id="title.tr"/>
                                            </DropdownItem>
                                            <DropdownItem onClick={this.langChange.bind(this,"en")}>
                                                <I18N id="title.en"/>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        <div className={`${(window.location.hash == "#/")?"main-content":"subpage-content"}`}>
                            <Switch >
                                <Route exact path="/" component={HomePage} />
                                <Route path="/Components" render={()=><Components menuToggle={this.state.sideMenuOpen} responsiveMenu={this.state.responsiveMenu} />} />
                                <Route path="/Docs" component={Docs} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                        <div className="footer">
                            <Container>
                                <Row>
                                    <Col className="footer-left">
                                        <iframe src="https://ghbtns.com/github-btn.html?user=ysimsek&amp;repo=karcin-ui&amp;type=star&amp;count=true" scrolling="0" width="100" height="20px"></iframe>
                                        <iframe src="https://ghbtns.com/github-btn.html?user=ysimsek&amp;repo=karcin-ui&amp;type=fork&amp;count=true" scrolling="0" width="100" height="20px"></iframe>
                                    </Col>
                                    <Col className="footer-right"><img src="./img/logo_asis.png" height="50" /></Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </I18NProvider>
            );
    }

    langChange(lang){
        this.setState({
            lang:lang
        });
        localStorage.setItem("lang", lang);
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    sideMenuToggle(){
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen
        });
    }

}
