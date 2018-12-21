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
var karcin_ui_1 = require("karcin-ui");
var SelectInputExample = /** @class */ (function (_super) {
    __extends(SelectInputExample, _super);
    function SelectInputExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectInputExample.prototype.render = function () {
        return React.createElement(karcin_ui_1.FileUpload, null);
    };
    return SelectInputExample;
}(React.Component));
exports.default = SelectInputExample;
//# sourceMappingURL=FileUploadExample.js.map