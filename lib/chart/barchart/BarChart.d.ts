import * as React from "react";
import "amcharts3/amcharts/amcharts";
import "amcharts3/amcharts/serial";
import "amcharts3/amcharts/themes/light";
import "amcharts3/amcharts/themes/chalk";
import "amcharts3/amcharts/themes/dark";
import "amcharts3/amcharts/themes/patterns";
import "amcharts3/amcharts/themes/black";
import "amcharts3/amcharts/gantt";
import "ammap3/ammap/ammap";
export interface SimpleBarChartProps {
    /**
     * Views data
     */
    data: Array<any>;
    /**
     * set the theme , default theme = light
     other theme = light , dark , chalk, black, patterns,
     default = 'light'
     */
    theme?: string;
    properties?: object | any;
    /**
     * Set the balloontext field 'a' = 5
     */
    categoryField?: string;
    /**
     * Set the balloontext value a = '5'
     */
    categoryValue?: string;
    /**
     * Set the color chard column
     */
    colorField?: string;
    /**
     * Set the text color
     */
    textColor?: string;
    /**
     *  3d or 2d true or false
     */
    threeD?: boolean;
    /**
     * oval and square
     */
    ovalColumn?: boolean;
    /**
     * Line changes true or false
     */
    inline?: boolean;
    /**
     * valueLine is true or false
     */
    valueLine?: boolean;
    /**
     * Max chart height
     * default 200px
     */
    height?: number;
    /**
     * Scroll true or false
     * default false
     */
    scroll?: boolean;
    report?: boolean;
    menu?: any;
    reportName?: string;
}
export default class SimpleLineChart extends React.Component<SimpleBarChartProps, any> {
    /**
     * @type {{data: any[]; theme: string; threeD: boolean; inline: boolean; height: number}}
     */
    static defaultProps: Partial<SimpleBarChartProps>;
    defaultDownloadType: any;
    defaultDownloadFunction: any;
    state: any;
    reportName: any;
    constructor(props: any);
    createMenus(menu: any): any[] | null;
    seperateType(type: any): any;
    getRandomNumber(): number;
    getPNG(): (this: any) => void;
    getJPG(): (this: any) => void;
    getCSV(): (this: any) => void;
    getXLSX(): (this: any) => void;
    getSVG(): (this: any) => void;
    getJSON(): (this: any) => void;
    defaultMenus(): {
        "class": string;
        "menu": ({
            "label": string;
            "menu": {
                label: string;
                click: (this: any) => void;
            }[];
            "action"?: undefined;
        } | {
            "label": string;
            "action": string;
            "menu": {
                "class": string;
                "menu": ({
                    label: string;
                    action: string;
                    widths: number[];
                    "menu"?: undefined;
                    "format"?: undefined;
                } | {
                    "label": string;
                    "menu": string[];
                    "action"?: undefined;
                    widths?: undefined;
                    "format"?: undefined;
                } | {
                    "label": string;
                    "format": string;
                    "action"?: undefined;
                    widths?: undefined;
                    "menu"?: undefined;
                })[];
            }[];
        })[];
    }[];
    render(): JSX.Element;
}
