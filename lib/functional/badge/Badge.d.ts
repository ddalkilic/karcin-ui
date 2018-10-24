import * as React from "react";
/**
 * Label Properties(interfaces)
 */
export interface LabelProps {
    /**
     * Label body color
     */
    color?: string;
    /**
     * Label text Size
     */
    size?: number | string;
    /**
     * Set the style
     */
    className?: any;
    /**
     * Click the component
     */
    onClick: any;
    id?: any;
}
export default class Badge extends React.Component<LabelProps, any> {
    /**
     * Initial props value
     * @type {{color: string; size: number}}
     */
    static defaultProps: Partial<LabelProps>;
    /**
     * Initial props
     * @param props
     */
    constructor(props: any);
    /**
     * @returns {any}
     */
    render(): any;
    onClick(e: any): void;
}
