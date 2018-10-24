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
export interface LineChartProps {
    /**
     * Views data
     */
    data: Array<any>;
    /**
     * set the theme,
     * default theme = light,
     * other theme = light , dark , chalk, black, patterns
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
     * Set the colorField
     */
    colorField?: string;
    /**
     * Set the text color
     */
    textColor?: string;
    /**
     * Set the increase color
     */
    positiveColor?: string;
    /**
     * Set the decrease color
     */
    negativeColor?: string;
    /**
     * Line changes true or false
     */
    inline?: boolean;
    /**
     * Scroll true or false
     * default false
     */
    scroll?: boolean;
}
export default class LineChartTrend extends React.Component<LineChartProps, any> {
    /**
     * Initial props value
     * @type {{theme: string; inline: boolean}}
     */
    static defaultProps: Partial<LineChartProps>;
    /**
     * @returns {any}
     */
    render(): JSX.Element;
}
