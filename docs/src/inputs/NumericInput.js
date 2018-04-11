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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BaseInput_1 = require("./base/BaseInput");
var reactstrap_1 = require("reactstrap");
var NumericInput = /** @class */ (function (_super) {
    __extends(NumericInput, _super);
    function NumericInput(props) {
        return _super.call(this, props) || this;
    }
    NumericInput.prototype.render = function () {
        var newProps = __rest(this.props, []);
        //todo: label için sağ sol üst seçenekleri konulsun, hatta button ile birlikte beraber kullanılabilir.
        //selectinput için yapıldı
        var label = this.props.label != null ? React.createElement(reactstrap_1.Label, null, this.props.label) : null;
        return React.createElement("div", null,
            label,
            React.createElement(BaseInput_1.default, __assign({}, newProps, { onChange: this.__onChange.bind(this) })));
    };
    /**
     * number control
     * @param e
     * @returns {boolean}
     * @private
     */
    NumericInput.prototype.__onChange = function (e) {
        var result = true;
        var value = e.target.value;
        this.props.onChange(e);
        // //boşluk karakteri ve diğerlerine bak
        // if (value && isNaN(value)) {
        //     result = false;
        // } else if (this.props.onChange) {
        //     let parsedVal = parseInt(value, 10);
        //     e.target.parsedValue = isNaN(parsedVal) ? undefined : parsedVal;
        //     result = e.target.parsedValue != undefined ? this.props.onChange(e) : false;
        // }
        // if (!result) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // return result;
    };
    NumericInput.defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        type: "number",
        labelType: "prepend"
    };
    return NumericInput;
}(React.Component));
exports.default = NumericInput;
//# sourceMappingURL=NumericInput.js.map