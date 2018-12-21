"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactstrap_1 = require("reactstrap");
var karcin_ui_1 = require("karcin-ui");
var HomePage_1 = require("./HomePage");
var react_router_dom_1 = require("react-router-dom");
var Components_1 = require("./Components");
var Docs_1 = require("./Docs");
var NotFound_1 = require("./NotFound");
var tr = require("./jsons/tr.json");
var en = require("./jsons/en.json");
var language = {
    tr: tr,
    en: en
};
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.toggle = _this.toggle.bind(_this);
        var lang = "en";
        if (localStorage.getItem("lang") != undefined && localStorage.getItem("lang") != null) {
            lang = localStorage.getItem("lang");
        }
        _this.state = {
            isOpen: false,
            sideMenuOpen: false,
            responsiveMenu: false,
            menuResponsiveSize: 900,
            lang: lang
        };
        if (_this.state.menuResponsiveSize >= window.innerWidth) {
            _this.setState({
                responsiveMenu: true,
                sideMenuOpen: true
            });
        }
        window.addEventListener('resize', function () {
            if (window.innerWidth <= _this.state.menuResponsiveSize) {
                _this.setState({
                    responsiveMenu: true,
                    sideMenuOpen: true
                });
            }
            else {
                _this.setState({
                    responsiveMenu: false,
                    sideMenuOpen: false
                });
            }
        });
        return _this;
    }
    Main.prototype.render = function () {
        var _this = this;
        karcin_ui_1.I18n.addLanguageData(language[this.state.lang]);
        return (React.createElement("div", { id: "showcase-content" },
            React.createElement(reactstrap_1.Navbar, { className: "main-menu " + ((window.location.hash == "#/") ? "active-menu" : ""), expand: "md" },
                React.createElement("div", { className: "header-logo" },
                    React.createElement("a", { href: "#", className: "logo-img" },
                        React.createElement("img", { src: "./img/logo-reverse.png", height: "50" })),
                    (window.location.hash !== "#/" && window.location.hash.search("#/Components") !== -1) ?
                        React.createElement("div", { className: "side-menu-button " + (this.state.sideMenuOpen ? 'active' : ''), onClick: function () { return _this.sideMenuToggle(); } },
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null))
                        : ''),
                React.createElement(reactstrap_1.NavbarToggler, { onClick: this.toggle },
                    React.createElement(karcin_ui_1.FaIcon, { code: "" + ((this.state.isOpen) ? "fa-times" : "fa-bars") })),
                React.createElement(reactstrap_1.Collapse, { isOpen: this.state.isOpen, navbar: true },
                    React.createElement(reactstrap_1.Nav, { className: "ml-auto", navbar: true },
                        React.createElement(reactstrap_1.NavItem, null,
                            React.createElement(reactstrap_1.NavLink, { href: "#Components" }, karcin_ui_1.I18n.message("title.component"))),
                        React.createElement(reactstrap_1.NavItem, null,
                            React.createElement(reactstrap_1.NavLink, { href: "#Docs" }, karcin_ui_1.I18n.message("title.doc"))),
                        React.createElement(reactstrap_1.NavItem, null,
                            React.createElement(reactstrap_1.NavLink, { href: "#Samples" }, karcin_ui_1.I18n.message("title.sample"))),
                        React.createElement(reactstrap_1.NavItem, null,
                            React.createElement(reactstrap_1.NavLink, { href: "#About" }, karcin_ui_1.I18n.message("title.about"))),
                        React.createElement(reactstrap_1.NavItem, null,
                            React.createElement(reactstrap_1.NavLink, { href: "https://github.com/ysimsek/karcin-ui" }, "Github")),
                        React.createElement(reactstrap_1.UncontrolledDropdown, { nav: true, inNavbar: true },
                            React.createElement(reactstrap_1.DropdownToggle, { nav: true, caret: true }, karcin_ui_1.I18n.message("title.language")),
                            React.createElement(reactstrap_1.DropdownMenu, { right: true },
                                React.createElement(reactstrap_1.DropdownItem, { onClick: this.langChange.bind(this, "tr") }, karcin_ui_1.I18n.message("title.tr")),
                                React.createElement(reactstrap_1.DropdownItem, { onClick: this.langChange.bind(this, "en") }, karcin_ui_1.I18n.message("title.en"))))))),
            React.createElement("div", { className: "" + ((window.location.hash == "#/") ? "main-content" : "subpage-content") },
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomePage_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/Components", render: function () { return React.createElement(Components_1.default, { menuToggle: _this.state.sideMenuOpen, responsiveMenu: _this.state.responsiveMenu }); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/Docs", component: Docs_1.default }),
                    React.createElement(react_router_dom_1.Route, { component: NotFound_1.default }))),
            React.createElement("div", { className: "footer" },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement(reactstrap_1.Row, null,
                        React.createElement(reactstrap_1.Col, { className: "footer-left" },
                            React.createElement("iframe", { src: "https://ghbtns.com/github-btn.html?user=ysimsek&repo=karcin-ui&type=star&count=true", scrolling: "0", width: "100", height: "20px" }),
                            React.createElement("iframe", { src: "https://ghbtns.com/github-btn.html?user=ysimsek&repo=karcin-ui&type=fork&count=true", scrolling: "0", width: "100", height: "20px" })),
                        React.createElement(reactstrap_1.Col, { className: "footer-right" },
                            React.createElement("img", { src: "./img/logo_asis.png", height: "50" })))))));
    };
    Main.prototype.langChange = function (lang) {
        this.setState({
            lang: lang
        });
        localStorage.setItem("lang", lang);
    };
    Main.prototype.toggle = function () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    Main.prototype.sideMenuToggle = function () {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen
        });
    };
    return Main;
}(React.Component));
exports.default = Main;
//# sourceMappingURL=Main.js.map