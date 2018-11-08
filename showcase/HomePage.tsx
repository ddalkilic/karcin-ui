import * as React from "react";
import { Container, Row, Col} from 'reactstrap';
import {Button} from "karcin-ui";
import * as Highlight from "react-highlight";
import BaseIcon from "./base/BaseIcon";
export default class HomePage extends React.Component<any, any> {

    constructor(props){
        super(props);
        this.getStarted.bind(this);
    }

    render() {
        return <div>
            <div className="header">
                <div className="overlay"></div>
                <div className="header-bg"></div>
                <Container className="slide-title">
                    <h6><BaseIcon/></h6>
                    <p>PROGRAMMING</p>
                    <div>
                        <Button onClick={this.getStarted} color="primary" size="lg">GET STARTED</Button>{' '}
                        <Button href="#Components" color="success" size="lg">COMPONENTS</Button>
                    </div>
                </Container>
            </div>
            <div id="get-started">
                <Container>
                    <Row>
                        <Col>
                            <h2>Get Started</h2>
                            <hr/>
                            <h4>NPM</h4>
                            <p>Install karcin-ui and peer dependencies via NPM</p>
                            <pre><code className="hljs"><span className="hljs-keyword">npm install</span> --save <span className="hljs-string">karcin-ui</span></code></pre>
                            <p>Import the components you need</p>
                            <div className="example-card">
                                <p>EXAMPLE</p>
                                <Button color="primary">Hello World!</Button>
                            </div>
                            <Highlight className='javascript'>{'import * as React from \'react\';\n' +
                            'import { Button } from \'karcin-ui\';\n' +
                            '\n' +
                            'export default class Example extends React.Component<any, any> {\n' +
                            '  return (\n' +
                            '    <Button color="primary">Hello World!</Button>\n' +
                            '  );\n' +
                            '};'}</Highlight>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>;
    }

    getStarted(){
        window.scrollTo(0,document.getElementById("get-started").offsetTop - 70);
    }

}