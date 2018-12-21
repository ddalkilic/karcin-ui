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
var reactstrap_1 = require("reactstrap");
var PanelExample = /** @class */ (function (_super) {
    __extends(PanelExample, _super);
    function PanelExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelExample.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { title: "Example Panel", collapse: true, collapsible: true, onOpened: this.onOpened, onClosed: this.onClosed }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")),
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { titleRenderer: this.renderer, collapse: true, collapsible: true, color: "primary" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")),
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { title: "Example Panel", collapse: true, collapsible: true, color: "info" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")),
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { title: "Example Panel", icon: "fa-home", collapse: true, collapsible: true, color: "warning" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")),
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { title: "Example Panel", collapse: true, collapsible: true, color: "danger" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")),
                React.createElement(reactstrap_1.Col, { xs: 6 },
                    React.createElement(karcin_ui_1.Panel, { collapse: true, collapsible: true, color: "success" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.")))));
    };
    PanelExample.prototype.renderer = function () {
        return 'Example Title Renderer';
    };
    PanelExample.prototype.onOpened = function () {
        console.log('opened');
    };
    PanelExample.prototype.onClosed = function () {
        console.log('closing');
    };
    return PanelExample;
}(React.Component));
exports.default = PanelExample;
//# sourceMappingURL=PanelExample.js.map