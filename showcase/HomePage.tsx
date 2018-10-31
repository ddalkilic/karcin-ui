import * as React from "react";
import { Container, Row, Col} from 'reactstrap';
import {Button,I18N} from "karcin-ui";
import * as Highlight from "react-highlight";
export default class HomePage extends React.Component<any, any> {

    constructor(props){
        super(props);

        this.getStarted.bind(this);
    }

    render() {
        let version = (sessionStorage.getItem("version") != "$VERSION")?<span>{`v${sessionStorage.getItem("version")}`}</span>:null;
        let date = null;
        if (sessionStorage.getItem("date")){
            let dateString = new Date(sessionStorage.getItem("date"));
            date = <span><I18N id={"home.buildDate"}/>: {dateString.toLocaleDateString()} {dateString.toLocaleTimeString()}</span>
        }
        return <div>
            <div className="header">
                <div className="overlay"></div>
                <div className="header-bg"></div>
                <Container className="slide-title">
                    <h3>Karçin UI <I18N id="home.message"/></h3>
                    <p>REACT &#38; TYPESCRIPT &#38; BOOTSTRAP</p>
                    <p className="build-text">{version} {date}</p>
                    <div className="buttons">
                        <Button onClick={this.getStarted} color="primary" size="lg"><I18N id="home.started"/></Button>{' '}
                        <Button href="#Components" color="success" size="lg"><I18N id="title.component"/></Button>
                    </div>
                </Container>
            </div>
            <div id="get-started">
                <Container>
                    <Row>
                        <Col>
                            <h2><I18N id="home.started"/></h2>
                            <hr/>
                            <h4>NPM</h4>
                            <p><I18N id={"home.npm"}/></p>
                            <pre><code className="hljs"><span className="hljs-keyword">npm install</span> --save <span className="hljs-string">karcin-ui</span></code></pre>
                            <p><I18N id={"or"}/></p>
                            <pre><code className="hljs"><span className="hljs-keyword">yarn</span> add <span className="hljs-string">karcin-ui</span></code></pre>
                            <p><I18N id={"home.npm2"}/></p>
                            <div className="example-card">
                                <p><I18N id={"example"}/></p>
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
