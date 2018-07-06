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
var Applications_1 = require("../applications/Applications");
var BaseClass_1 = require("../applications/BaseClass");
var LocaleEndPoint = /** @class */ (function (_super) {
    __extends(LocaleEndPoint, _super);
    function LocaleEndPoint(props, callback) {
        var _this = _super.call(this, props) || this;
        _this.__dataMap = [];
        _this.__oldDataMap = [];
        _this.props = {
            data: [],
            idField: 'id',
            endPoint: 'localEndPoint'
        };
        _this.mergeProps(props);
        _this.__callback = callback;
        _this.read(props);
        return _this;
    }
    LocaleEndPoint.prototype.mergeProps = function (props) {
        this.props = Applications_1.default.mergeObject(this.props, props);
    };
    /**
     * read data
     * @param callback
     */
    LocaleEndPoint.prototype.read = function (props, callback) {
        this.__oldDataMap = this.__dataMap.slice(0);
        this.mergeProps(props);
        return this.response(callback);
    };
    /**
     * reset data
     * @param callback
     */
    LocaleEndPoint.prototype.reset = function (callback) {
        this.__dataMap = [];
        if (callback !== undefined) {
            callback();
        }
        return this.response(callback);
    };
    /**
     * create data
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    LocaleEndPoint.prototype.create = function (items, callback) {
        var _this = this;
        if (items !== undefined && items.length > 0) {
            items.forEach(function (value) {
                _this.__dataMap.push(value);
            });
            return this.response(callback);
        }
    };
    /**
     * update data
     * @param items
     * @param successCallback
     * @param errorCallback
     */
    LocaleEndPoint.prototype.update = function (items, callback) {
        var _this = this;
        if (items !== undefined && items.length > 0) {
            this.__dataMap.forEach(function (value, index) {
                items.forEach(function (values) {
                    if (value[_this.props.idField] === values[_this.props.idField]) {
                        _this.__dataMap[index] = values;
                    }
                });
            });
            return this.response(callback);
        }
    };
    LocaleEndPoint.prototype.delete = function (items, callback) {
        var _this = this;
        if (items !== undefined && items.length > 0) {
            this.__dataMap.forEach(function (value, index) {
                items.forEach(function (values) {
                    if (value[_this.props.idField] === values[_this.props.idField]) {
                        _this.__dataMap.splice(index, 1);
                    }
                });
            });
            return this.response(callback);
        }
    };
    /**
     * order sort data
     * @param fieldName
     * @param callback
     */
    LocaleEndPoint.prototype.orderSort = function (fieldName, callback) {
        var orderData = this.__dataMap.slice();
        orderData.sort(function (first, last) {
            var firstName = first[fieldName].toUpperCase();
            var lastName = last[fieldName].toUpperCase();
            //
            if (firstName < lastName) {
                return -1;
            }
            //
            if (firstName > lastName) {
                return 1;
            }
            return 0;
        });
        return this.response(callback, orderData);
    };
    ;
    /**
     * old data
     * @param callback
     */
    LocaleEndPoint.prototype.oldDataSort = function (callback) {
        if (callback !== undefined) {
            callback(this.__oldDataMap);
        }
        return this.response(callback);
    };
    /**
     * order reverse data
     * @param fieldName
     * @param callback
     */
    LocaleEndPoint.prototype.orderReverse = function (fieldName, callback) {
        var orderData = [];
        this.orderSort(fieldName, function (data) {
            orderData = data.reverse();
        });
        return this.response(callback, orderData);
    };
    /**
     * filter data
     * @param fieldName
     * @param value
     * @param callback
     */
    LocaleEndPoint.prototype.filter = function (fieldName, value, callback) {
        var data = this.__dataMap.filter(function (val, index) {
            if (val[fieldName].toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                return val;
            }
        });
        return this.response(callback, data);
    };
    return LocaleEndPoint;
}(BaseClass_1.default));
exports.default = LocaleEndPoint;
//# sourceMappingURL=LocaleEndPoint.js.map