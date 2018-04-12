import * as React from "react";
import {Panel} from 'karcin-ui';


export default class PanelExample extends React.Component<any, any> {

    render() {
        return (<div>
            <Panel title="Example Panel" collapse={true} collapsible={true} onOpened={this.onOpened} onClosed={this.onClosed}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={false} collapsible={true} color="primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={false} color="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={true} color="warning">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={true} color="danger">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={true} color="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
            <Panel title="Example Panel" collapse={true} color="success">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed odio eu massa accumsan rhoncus. Cras eu vulputate lacus. Ut consectetur bibendum purus, sit amet euismod velit elementum eget. Nullam id augue dictum, tincidunt enim eget, finibus turpis. Vestibulum vel turpis orci. Nunc a ultrices magna, sed maximus diam. Sed egestas dapibus mi, ut pharetra augue iaculis sit amet. In ut dolor sed urna semper ultricies sed ac turpis. Fusce finibus purus at nisl molestie, id sodales turpis dignissim. In gravida ipsum a risus elementum imperdiet. Maecenas non turpis in ligula efficitur pharetra.</Panel>
        </div>);
    }

    onOpened() {
        console.log('opened');
    }

    onClosed() {
        console.log('closing');
    }
}