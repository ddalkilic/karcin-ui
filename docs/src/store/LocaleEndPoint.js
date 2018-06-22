"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Applications_1 = require("../applications/Applications");
var LocaleEndPoint = /** @class */ (function () {
    function LocaleEndPoint(props, callback) {
        this.__dataMap = [];
        this.props = {
            data: [],
            idField: 'id',
            endPoint: 'localEndPoint'
        };
        this.props = Applications_1.default.mergeObject(this.props, props);
        this.__callback = callback;
        this.read();
    }
    LocaleEndPoint.prototype.read = function (data) {
        var _this = this;
        var datas = data !== undefined ? data : this.props.data;
        if (datas !== undefined) {
            this.reset();
            datas.forEach(function (value) {
                _this.create(value);
            });
        }
        this.__callback(this.__dataMap);
        return this.__dataMap;
    };
    LocaleEndPoint.prototype.reset = function (successCallback) {
        this.__dataMap = [];
        if (successCallback !== undefined) {
            successCallback();
        }
        return this.__dataMap;
    };
    LocaleEndPoint.prototype.create = function (item, successCallback, errorCallback) {
        if (item !== undefined) {
            this.__dataMap.push(item);
            var result = {
                data: this.__dataMap,
                totalCount: this.__dataMap.length
            };
            if (successCallback !== undefined) {
                successCallback(result);
            }
        }
        else {
            if (errorCallback !== undefined) {
                errorCallback('item not undefined');
            }
        }
        return this.__dataMap;
    };
    LocaleEndPoint.prototype.update = function (items, successCallback, errorCallback) {
        if (items !== undefined && items.length > 0) {
            this.reset();
            this.__dataMap = items;
            var result = {
                data: this.__dataMap,
                totalCount: this.__dataMap.length
            };
            if (successCallback !== undefined) {
                successCallback(result);
            }
        }
        else {
            if (errorCallback !== undefined) {
                errorCallback('item not undefined');
            }
        }
        return this.__dataMap;
    };
    LocaleEndPoint.prototype.orderSort = function (fieldName, callback) {
        this.__dataMap.sort(function (first, last) {
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
        if (callback !== undefined)
            callback(this.__dataMap, 'asc', fieldName);
        return this.__dataMap;
    };
    ;
    LocaleEndPoint.prototype.orderReverse = function (fieldName, callback) {
        this.__dataMap = this.orderSort(fieldName);
        this.__dataMap.reverse();
        if (callback !== undefined)
            callback(this.__dataMap, 'desc', fieldName);
        return this.__dataMap;
    };
    LocaleEndPoint.prototype.filter = function (fieldName, value) {
        var data = this.__dataMap.filter(function (val, index) {
            if (val[fieldName].toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                return val;
            }
        });
        return data;
    };
    return LocaleEndPoint;
}());
exports.default = LocaleEndPoint;
//# sourceMappingURL=LocaleEndPoint.js.map