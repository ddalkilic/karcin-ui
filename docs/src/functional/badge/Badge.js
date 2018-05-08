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
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Badge.prototype.render = function () {
        return React.createElement(reactstrap_1.Badge, { color: this.props.color, style: { fontSize: this.props.size + "px" } }, this.props.children);
    };
    Badge.defaultProps = {
        color: "light",
        size: 14
    };
    return Badge;
}(React.Component));
exports.default = Badge;
//# sourceMappingURL=Badge.js.map