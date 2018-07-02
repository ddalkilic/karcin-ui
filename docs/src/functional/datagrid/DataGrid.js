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
require("bootstrap/dist/css/bootstrap.css");
require("../../css/karcin-ui.css");
var TableBody_1 = require("./TableBody");
var TableHead_1 = require("./TableHead");
var Toolbar_1 = require("./Toolbar");
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    /**
     * Initial values
     */
    function DataGrid(props) {
        var _this = _super.call(this, props) || this;
        /**
         * @type {number}
         */
        _this.dataGridId = Math.floor(Math.random() * 20);
        _this.init(props);
        debugger;
        _this.props.store.__callback = function () {
            _this.resetData();
            _this.columnStyle();
            _this.resetSelected();
        };
        return _this;
    }
    DataGrid.prototype.UNSAFE_componentWillReceiveProps = function (props) {
        this.init(props);
        this.forceUpdate();
    };
    /**
     * set the first values
     */
    DataGrid.prototype.init = function (props) {
        this.props = props;
        this.state = {
            store: props.store,
            fields: props.fields,
            eventDataGrid: null,
            pageShowData: { page: this.props.page, pageShow: this.props.pageShow, pagination: this.props.pagination }
        };
    };
    /**
     *
     */
    DataGrid.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: "karcin-data-grid", id: 'karcinDataGrid' + this.dataGridId, ref: function (e) {
                _this.eventDataGrid = e;
            } }, this.dataGridLoadComponent());
    };
    DataGrid.prototype.dataGridLoadComponent = function () {
        var _this = this;
        var self = this;
        this.returnComponent = React.createElement("div", null,
            React.createElement(Toolbar_1.default, { data: this.props.toolbar, store: this.props.store }),
            React.createElement("div", { className: "data-grid-body" },
                React.createElement("table", { className: "table table-bordered dataGrid" },
                    React.createElement(TableHead_1.default, { fields: this.state.fields, fieldOption: this.fieldOption, store: this.props.store, resetData: function () {
                            _this.resetData();
                        } }),
                    React.createElement(TableBody_1.default, { ref: function (ref) { _this.tbodyRef = ref; }, onSelected: this.props.onSelected, fieldOption: this.fieldOption, store: this.props.store, cellRenderer: this.props.cellRenderer, rowRenderer: this.props.rowRenderer, fields: this.state.fields, showingPageData: this.state.pageShowData }))),
            React.createElement(Toolbar_1.default, { type: "footer", store: this.props.store, options: {
                    'pagination': this.props.pagination,
                    'pageShow': this.props.pageShow,
                    'changePageFunc': function (e) {
                        self.pageChange(e);
                    }
                } }));
        return this.returnComponent;
    };
    DataGrid.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.columnStyle();
            _this.dataGridLoadComponent();
        }, 200);
        window.addEventListener('load', function () {
            _this.columnStyle();
            _this.dataGridLoadComponent();
        });
    };
    DataGrid.prototype.resetData = function () {
        this.forceUpdate();
    };
    DataGrid.prototype.resetSelected = function () {
        this.tbodyRef.resetSelected();
    };
    DataGrid.prototype.columnStyle = function () {
        if (this.eventDataGrid !== null) {
            this.fieldOption = {};
            // field width
            var fieldWidth_1 = {};
            var dataGridWidth = this.eventDataGrid.offsetWidth;
            var dataGridHeight = this.eventDataGrid.offsetHeight;
            var tableBodyHeight = this.eventDataGrid.querySelector('tbody') !== null ? this.eventDataGrid.querySelector('tbody').offsetHeight : 0;
            var totalWidth_1 = 0;
            var emptyFieldCount_1 = 0;
            var newField_1 = [];
            var scrollSize = 0;
            if (tableBodyHeight <= 0 && tableBodyHeight > dataGridHeight) {
                scrollSize = 8;
            }
            this.state.fields.forEach(function (value) {
                if (value.visibility === undefined || value.visibility) {
                    newField_1.push(value);
                    fieldWidth_1[value.value] = (value.width > 0 ? value.width : 0);
                    totalWidth_1 += (value.width > 0) ? value.width : 0;
                    emptyFieldCount_1 += (value.width <= 0 || value.width === undefined ? 0 : 1);
                }
            });
            if (dataGridWidth >= totalWidth_1) {
                var newCount = (newField_1.length - emptyFieldCount_1);
                var newWid = ((dataGridWidth - 2) - totalWidth_1) - scrollSize;
                for (var item in fieldWidth_1) {
                    if (fieldWidth_1[item] === 0) {
                        fieldWidth_1[item] = ((newWid - 1) / newCount);
                    }
                }
            }
            this.fieldOption = fieldWidth_1;
            this.eventDataGrid = null;
            this.forceUpdate();
        }
    };
    DataGrid.prototype.pageChange = function (event) {
        if (event !== undefined && this.props.changePage) {
            this.props.changePage(event.page);
        }
    };
    DataGrid.defaultProps = {
        pagination: false,
        page: 1
    };
    return DataGrid;
}(React.Component));
exports.default = DataGrid;
//# sourceMappingURL=DataGrid.js.map