import * as React from "react";
import "amcharts3/amcharts/amcharts";
import "amcharts3/amcharts/themes/light";
import "amcharts3/amcharts/themes/chalk";
import "amcharts3/amcharts/themes/dark";
import "amcharts3/amcharts/themes/patterns";
import "amcharts3/amcharts/themes/black";
import "amcharts3/amcharts/gantt";
import "amcharts3/amcharts/serial";
import "ammap3/ammap/ammap";
export interface ComposedBarChartData {
    /**
     * Set the view data
      title is required, valueField is required
     */
    data: Array<any>;
    /**
     * Set the textColor
     */
    textColor?: string;
    /**
     * set the theme , default theme = light
     other theme = light , dark , chalk, black, patterns,
     default = 'light'
     */
    theme?: string;
    /**
     * Default show field
     */
    categoryField?: string;
    /**
     * Default show value
     */
    categoryValue?: string;
    /**
     * Max chart height
     * default 300px
     */
    height?: number;
    report?: boolean;
    menu?: any;
    reportName?: string;
}
export default class ComposedBarChart extends React.Component<ComposedBarChartData, any> {
    /**
     * Initial props value
     * @type {{height: number; theme: string}}
     */
    static defaultProps: Partial<ComposedBarChartData>;
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
    /**
     * Configüration graphs data
     * @param propsData
     * @returns {any[]}
     */
    returnGrapsData(propsData: any): JSX.Element[];
}
