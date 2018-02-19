import * as React from "react";
import Buttonx from 'reactstrap/lib/Button';

export interface ButtonProps { color: string, children: string }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return <Buttonx {...this.props}>{this.props.children}</Buttonx>;
    }
}