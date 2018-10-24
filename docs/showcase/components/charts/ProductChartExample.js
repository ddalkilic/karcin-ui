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
var ProductChart_1 = require("../../../src/chart/productchart/ProductChart");
var ProductChartExample = /** @class */ (function (_super) {
    __extends(ProductChartExample, _super);
    function ProductChartExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductChartExample.prototype.render = function () {
        return React.createElement(ProductChart_1.default, null);
    };
    return ProductChartExample;
}(React.Component));
exports.default = ProductChartExample;
//# sourceMappingURL=ProductChartExample.js.map