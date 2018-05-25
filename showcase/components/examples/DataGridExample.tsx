import * as React from "react";
import {DataGrid, Store} from 'karcin-ui';


export default class DataGridExample extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            fields: [
                {
                    "property": "int",
                    "value": "id",
                    "name": "ID",
                    "visibility": false
                },
                {
                    "property": "string",
                    "value": "name",
                    "name": "İsim"
                },
                {
                    "property": "string",
                    "value": "surname",
                    "name": "Soyisim"
                },
                {
                    "property": "string",
                    "value": "title",
                    "name": "Uzmanlık Alanı"
                }
            ],
            store: new Store({
                idField: 'id',
                data: [{
                    'id': '1',
                    'name': 'Deniz',
                    'surname': 'DALKILIÇ',
                    'title': 'Yazılım Uzmanı'
                }, {
                    'id': '2',
                    'name': 'Yunus',
                    'surname': 'ŞİMŞEK',
                    'title': 'Yazılım Uzmanı'
                }, {
                    'id': '3',
                    'name': 'Tayyip',
                    'surname': 'DEMİRCAN',
                    'title': 'Yazılım Uzmanı'
                }, {
                    'id': '4',
                    'name': 'Mustafa',
                    'surname': 'GÜNGÖR',
                    'title': 'Yazılım Uzmanı'
                }, {
                    'id': '5',
                    'name': 'Bora',
                    'surname': 'AVCI',
                    'title': 'Yazılım Uzmanı'
                }]
            })
        };


    }

    render() {

        return (<div><DataGrid store={this.state.store} fields={this.state.fields} onSelected={(e, b) => {
            this.getSelectData(e, b)
        }} toolbar={[{
            name: 'Ekle',
            icon: 'fa-plus',
            url: 'https://www.google.com',
            disabled: true
        }, {
            name: 'Düzenle', icon: 'fa-minus', onClick: () => {
                this.clickEdit()
            }
        }]}/></div>);
    }


    clickEdit() {

    }

    getSelectData(e, b) {

    }
}