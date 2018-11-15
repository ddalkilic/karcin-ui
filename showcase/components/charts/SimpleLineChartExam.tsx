import * as React from "react";
import {LineChart,Panel} from "karcin-ui";
import {Row,Col} from "reactstrap";

export default class SimpleLineChartExam extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {}
    }
    render(){
        let data =[{
            "date": "2012-07-27",
            "value": 13
        }, {
            "date": "2012-07-28",
            "value": 11
        }, {
            "date": "2012-07-29",
            "value": 15
        }, {
            "date": "2012-07-30",
            "value": 16
        }, {
            "date": "2012-07-31",
            "value": 18
        }, {
            "date": "2012-08-01",
            "value": 13
        }, {
            "date": "2012-08-02",
            "value": 22
        }, {
            "date": "2012-08-03",
            "value": 23
        }, {
            "date": "2012-08-04",
            "value": 13
        }, {
            "date": "2012-08-05",
            "value": 16
        }, {
            "date": "2012-08-06",
            "value": 11
        }, {
            "date": "2012-08-07",
            "value": 25
        }
        ];
        return <Row>
            <Col md={6}>
                <Panel title={"Simple LineChart"}>
                    <LineChart
                        data={data}
                        theme={"none"}
                        categoryField={"date"}
                        categoryValue={"value"}
                        formatting={"date"}
                        report={true}
                    />
                </Panel>
            </Col>
            <Col md={6}>
                <Panel title={"Light LineChart"}>
                    <LineChart
                        data={data}
                        theme={"light"}
                        textColor={"red"}
                        categoryField={"date"}
                        categoryValue={"value"}
                        formatting={"date"}
                    />
                </Panel>
            </Col>
            <Col md={6}>
                <Panel title={"Pattern LineChart"}>
                    <LineChart
                        data={data}
                        theme={"patterns"}
                        textColor={"blue"}
                        categoryField={"date"}
                        categoryValue={"value"}
                        formatting={"date"}
                    />
                </Panel>
            </Col>
            <Col md={6}>
                <Panel title={"Negative/Positive LineChart"}>
                    <LineChart
                        data={data}
                        negativeColor={"red"}
                        positiveColor={"blue"}
                        categoryField={"date"}
                        categoryValue={"value"}
                        formatting={"date"}
                    />
                </Panel>
            </Col>

        </Row>
    }
}
