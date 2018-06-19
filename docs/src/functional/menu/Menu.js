"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactstrap_1 = require("reactstrap");
var FaIcon_1 = require("../../functional/faicon/FaIcon");
require("../../css/karcin-ui.css");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    /**
     * Initial values
     * @param {MenuProps} props
     */
    function Menu(props) {
        var _this = _super.call(this, props) || this;
        /**
         * @type {null}
         */
        _this.menuChilds = null;
        _this.menuData = [];
        _this.state = {
            menuData: [],
            menuActive: [],
            hover: _this.props.hover,
            active: null,
            activeControl: false,
            collapseActive: false,
            activeItem: _this.props.active
        };
        return _this;
    }
    Menu.prototype.UNSAFE_componentWillReceiveProps = function () {
    };
    /**
     *
     * @param {MenuProps} props
     */
    Menu.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            hover: props.hover,
            activeItem: props.active
        });
        this.activeFind(props.active);
    };
    /**
     * End render finished
     */
    Menu.prototype.componentDidMount = function () {
        // this.activeFind(this.state.activeItem, this.state.menuData);
    };
    /**
     * @returns {any}
     */
    Menu.prototype.render = function () {
        var menusList = this.props.data.slice(0);
        this.menuData = [];
        this.menuChilds = this.menuLoop(menusList, undefined, 0, false);
        return React.createElement(reactstrap_1.Nav, { key: "0", className: "karcin-menu " + ((this.state.hover) ? 'hover-menu' : '') }, this.menuChilds);
    };
    /**
     * get start menu loop
     * @param {any[]} getData
     */
    Menu.prototype.menuLoop = function (getData, key, level, collapse) {
        var _this = this;
        // reset list menu
        this.menuChilds = [];
        // loop main menu titles
        var listMenu = [];
        var self = this;
        var newData = getData.slice(0);
        newData.forEach(function (value, index) {
            // active control
            var keys = (key !== undefined) ? key + "-" + index : index.toString();
            var params = { keys: keys, level: level, collapse: false, hover: false };
            var activeControlBool = false;
            self.menuData.push(value);
            self.state.menuActive.forEach(function (val) {
                if (val.keys === keys) {
                    activeControlBool = true;
                }
            });
            if (!activeControlBool) {
                self.state.menuActive.push(params);
                value['keys'] = keys;
                value['level'] = level;
            }
            var actives = _this.menuItemActive(keys);
            listMenu.push(React.createElement(reactstrap_1.NavItem, { key: index, className: ((actives) ? 'active' : '') + " " + (value.items !== undefined && value.items.length > 0 ? 'downItem' : '') },
                React.createElement("div", { className: "menu-head", onClick: function () {
                        if (!_this.state.hover) {
                            _this.toggleActiveMenu(params, value.items);
                        }
                    } }, (_this.props.renderer !== undefined ?
                    React.createElement(reactstrap_1.NavLink, { href: (value.href) ? value.href : "#" }, _this.props.renderer(value)) :
                    React.createElement(reactstrap_1.NavLink, { href: (value.href) ? value.href : "#" },
                        (value.icon !== undefined) ? React.createElement(FaIcon_1.default, { code: value.icon, className: "menu-icon" }) : '',
                        React.createElement("strong", null,
                            value.title,
                            (value.badge !== undefined) ?
                                React.createElement(reactstrap_1.Badge, { color: value.badgeColor }, value.badge) : ''),
                        (value.items !== undefined) ? (actives ?
                            React.createElement(FaIcon_1.default, { code: "fa-angle-down", className: "open-icon" }) :
                            React.createElement(FaIcon_1.default, { code: "fa-angle-right", className: "open-icon" })) : ''))),
                (value.items !== undefined && value.items.length > 0) ? _this.menuLoop(value.items, keys, level + 1, true) : ''));
        });
        var active = (!this.state.hover) ? this.menuItemActive(key) : false;
        return (collapse ? React.createElement(reactstrap_1.Collapse, { isOpen: active },
            React.createElement(reactstrap_1.Nav, null, listMenu)) : React.createElement(reactstrap_1.Nav, null, listMenu));
    };
    /**
     * click dropdown menu toggle
     * @param param
     * @returns {any}
     */
    Menu.prototype.toggleActiveMenu = function (param, items) {
        var self = this;
        this.state.menuActive.map(function (val, index) {
            if (self.props.accordion) {
                if (param.level === val.level) {
                    if (param.keys === val.keys) {
                        if (items !== undefined && items.length > 0) {
                            val.collapse = true;
                        }
                        else {
                            val.collapse = !val.collapse;
                        }
                    }
                    else {
                        val.collapse = false;
                    }
                    if (self.props.onChange !== undefined) {
                        var changeMenu = self.menuData.slice(0);
                        self.props.onChange(changeMenu.filter(function (v) { return v.keys === val.keys; }));
                    }
                }
            }
            else {
                if (param.keys === val.keys && param.level === val.level) {
                    val.collapse = !val.collapse;
                    if (self.props.onChange !== undefined) {
                        var changeMenu = self.menuData.slice(0);
                        self.props.onChange(changeMenu.filter(function (v) { return v.keys === val.keys; }));
                    }
                }
            }
            return val;
        });
        this.forceUpdate();
    };
    /**
     * active find function
     * @param getActive
     * @returns {any}
     */
    Menu.prototype.activeFind = function (getActive) {
        var _this = this;
        if (this.menuData.length > 0 && getActive !== undefined && getActive !== null && getActive.length > 0 && !this.state.activeControl) {
            getActive = getActive[0];
            this.menuData.forEach(function (val) {
                if (val.href === getActive.href && val.name === getActive.name) {
                    var _loop_1 = function (i) {
                        var splitKey = val.keys.split('-');
                        _this.state.menuActive.map(function (vals) {
                            var id = splitKey.slice(0, i + 1).join('-');
                            if (_this.props.accordion) {
                                if (vals.level === i && id === vals.keys) {
                                    vals.collapse = true;
                                }
                                else if (vals.level === i) {
                                    vals.collapse = false;
                                }
                            }
                            else {
                                if (vals.level === i && vals.keys === id) {
                                    vals.collapse = !vals.collapse;
                                }
                            }
                            return vals;
                        });
                    };
                    for (var i = val.level; i >= 0; i--) {
                        _loop_1(i);
                    }
                }
            });
            this.forceUpdate();
        }
    };
    /**
     * active control func
     * @param id
     * @returns {boolean}
     */
    Menu.prototype.menuItemActive = function (id) {
        var active = false;
        this.state.menuActive.forEach(function (val, index) {
            var keys = (id !== undefined) ? id : "0";
            if (val.keys === keys) {
                active = val.collapse;
            }
        });
        return active;
    };
    /**
     * @type {{hover: boolean; accordion: boolean; active: any[]}}
     */
    Menu.defaultProps = {
        hover: false,
        accordion: false,
        active: [],
    };
    return Menu;
}(React.Component));
exports.default = Menu;
//# sourceMappingURL=Menu.js.map