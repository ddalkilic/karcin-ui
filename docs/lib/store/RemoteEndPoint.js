"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Applications_1 = require("../applications/Applications");
var AjaxRequest_1 = require("../request/AjaxRequest");
var BaseClass_1 = require("../applications/BaseClass");
var RemoteEndPoint = /** @class */ (function (_super) {
    __extends(RemoteEndPoint, _super);
    function RemoteEndPoint(props, callback) {
        var _this = _super.call(this, props) || this;
        _this.__dataMap = [];
        _this.__filters = [];
        _this.__orders = [];
        _this.__paging = { start: 0, limit: 0 };
        _this.__totalCount = null;
        // request
        _this.requestStatus = true;
        _this.props = {
            idField: 'id',
            processor: null,
            type: null,
            url: null,
            param: [],
            method: 'findByFilters',
            readMethod: 'findByFilters',
            createMethod: 'add',
            updateMethod: 'update',
            deleteMethod: 'deleteById',
            endPointName: 'remoteEndPoint',
            responseData: 'data.resultMap.data.data',
            pageTotalData: 'data.resultMap.data.count',
            data: []
        };
        _this.mergeProps(props);
        _this.__callback = callback;
        _this.runMethod = _this.props.method;
        _this.paging(_this.props.pageData, true);
        _this.call();
        return _this;
    }
    ;
    RemoteEndPoint.prototype.mergeProps = function (props) {
        this.props = Applications_1.default.mergeObject(this.props, props);
    };
    /**
     * Remote ajax call
     * @param callback
     */
    RemoteEndPoint.prototype.call = function (callback, item) {
        var _this = this;
        if (this.props.processor !== undefined && this.requestStatus) {
            this.requestStatus = false;
            var data = {};
            var param = this.props.param.length > 0 ? this.props.param[0] : null;
            if (item !== undefined) {
                data = item;
            }
            else {
                // filters object
                if (this.__filters.length > 0) {
                    data['filters'] = this.__filters;
                }
                // orders object
                if (this.__orders.length > 0) {
                    data['orders'] = this.__orders;
                }
                if (param !== null) {
                    for (var col in param) {
                        data[col] = param[col];
                    }
                }
                // pagination object
                for (var item_1 in this.props.pageData) {
                    data[item_1] = this.props.pageData[item_1];
                }
            }
            this.props.data = [];
            this.props.data.push(data);
            this.props.method = this.runMethod;
            var getData = new AjaxRequest_1.default(this.props, function (response) {
                _this.callbackReady(response, callback, item);
            });
            getData.call();
        }
    };
    /**
     * General callback ready
     * @param response
     */
    RemoteEndPoint.prototype.callbackReady = function (response, callback, items) {
        this.requestStatus = true;
        if (response.status !== undefined && response.status === 200 && items === undefined) {
            var dataFind = BaseClass_1.default.mappingDataFind(response, this.props.responseData);
            var totalCount = BaseClass_1.default.mappingDataFind(response, this.props.pageTotalData);
            try {
                if (dataFind !== undefined) {
                    this.props.data = dataFind;
                    this.__totalCount = totalCount;
                    return this.response(callback, undefined, totalCount);
                }
                else {
                    throw "reponse or responseData not undefined";
                }
            }
            catch (err) {
                throw new Error(err);
            }
        }
        else {
            if (callback !== undefined) {
                callback(response);
            }
        }
    };
    /**
     * Data read
     * @param callback
     */
    RemoteEndPoint.prototype.read = function (props, callback) {
        this.mergeProps(props);
        this.runMethod = this.props.readMethod;
        this.call(callback);
    };
    /**
     * reset
     * @param successCallback
     */
    RemoteEndPoint.prototype.reset = function (callback) {
        this.__dataMap = [];
        return this.response(callback);
    };
    RemoteEndPoint.prototype.create = function (items, callback) {
        if (items !== undefined) {
            this.runMethod = this.props.createMethod;
            this.call(function (response) {
                if (callback !== undefined) {
                    callback(response);
                }
            }, items);
        }
    };
    RemoteEndPoint.prototype.update = function (items, callback) {
        if (items !== undefined) {
            this.runMethod = this.props.updateMethod;
            this.call(function (response) {
                callback(response);
            }, items);
        }
    };
    RemoteEndPoint.prototype.delete = function (items, callback) {
        if (items !== undefined) {
            this.runMethod = this.props.deleteMethod;
            this.call(function (response) {
                callback(response);
            }, items);
        }
    };
    RemoteEndPoint.prototype.propsChanges = function (props) {
        for (var item in props) {
            this.props[item] = props[item];
        }
    };
    /**
     * order sort
     * @param fieldName
     * @param callback
     */
    RemoteEndPoint.prototype.orderSort = function (fieldName, callback) {
        var _this = this;
        if (fieldName !== undefined) {
            this.runMethod = this.props.readMethod;
            if (this.__orders.length > 0) {
                var control_1 = false;
                this.__orders.forEach(function (value, index) {
                    if (value['property'] === fieldName) {
                        control_1 = true;
                        value['orderType'] = 'ASC';
                    }
                    _this.__orders[index] = value;
                });
                if (!control_1) {
                    this.__orders.push({ "property": fieldName, "orderType": 'ASC' });
                }
            }
            else {
                this.__orders.push({ "property": fieldName, "orderType": 'ASC' });
            }
            this.call(callback);
        }
        else {
            throw new Error('Field name empty');
        }
    };
    /**
     * order reverse
     * @param fieldName
     * @param callback
     */
    RemoteEndPoint.prototype.orderReverse = function (fieldName, callback) {
        var _this = this;
        if (fieldName !== undefined) {
            this.runMethod = this.props.readMethod;
            if (this.__orders.length > 0) {
                var control_2 = false;
                this.__orders.forEach(function (value, index) {
                    if (value['property'] === fieldName) {
                        control_2 = true;
                        value['orderType'] = 'DESC';
                    }
                    _this.__orders[index] = value;
                });
                if (!control_2) {
                    this.__orders.push({ "property": fieldName, "orderType": 'DESC' });
                }
            }
            else {
                this.__orders.push({ "property": fieldName, "orderType": 'DESC' });
            }
            this.call(callback);
        }
        else {
            throw new Error('Field name empty');
        }
    };
    /**
     * old data
     * @param callback
     */
    RemoteEndPoint.prototype.oldDataSort = function (callback) {
        this.__orders = [];
        this.read(callback);
    };
    /**
     * filters
     * @param fieldName
     * @param value
     * @param callback
     */
    RemoteEndPoint.prototype.filter = function (fieldName, value, operator, callback) {
        var _this = this;
        if (fieldName !== undefined && value !== undefined && operator !== undefined) {
            this.runMethod = this.props.readMethod;
            if (this.__filters.length > 0) {
                var control_3 = false;
                this.__filters.forEach(function (val, index) {
                    if (val['property'] === fieldName && val['operator'] === operator) {
                        control_3 = true;
                        _this.__filters[index]['value'] = value;
                    }
                });
                if (!control_3) {
                    this.__filters.push({ "property": fieldName, "value": value, "operator": operator, "index": 1 });
                }
            }
            else {
                this.__filters.push({ "property": fieldName, "value": value, "operator": operator, "index": 1 });
            }
            this.call(callback);
        }
        else {
            throw new Error('Field name empty');
        }
    };
    RemoteEndPoint.prototype.paging = function (pageData, type) {
        if (pageData !== undefined) {
            for (var item in this.props.pageData) {
                this.__paging[item] = pageData[item];
                this.props.pageData[item] = pageData[item];
            }
            if (type === undefined) {
                this.call();
            }
        }
    };
    return RemoteEndPoint;
}(BaseClass_1.default));
exports.default = RemoteEndPoint;
//# sourceMappingURL=RemoteEndPoint.js.map