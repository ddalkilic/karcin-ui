import axios from 'axios';
import Application from '../applications/Applications';

export interface basicObject {
    [key: string]: string | any
}


export default class AjaxRequest {

    ajaxCallControl = true;

    props: basicObject = {
        type: null,
        method: null,
        processor: null,
        url: null,
        headers: null,
        data: null
    };

    ajaxProps: basicObject = {};

    constructor(props?: Object, callback?: any) {

        // url  control
        let localUrl = localStorage.getItem('url');
        if(localUrl !== null){
            this.props.url = localUrl;
        }

        // get object props control
        if (props !== undefined) {
            this.props = Application.mergeObject(this.props, props);
            this.ajaxPropsMerge();
        }

        // url this.props change to url
        if (callback !== undefined) {
            this.props['callback'] = callback;
        }
    }

    ajaxPropsMerge() {

        // basic url control 
        if(this.props.url !== undefined){
            this.ajaxProps['url'] = this.props.url;
        }

        // header control
        if(this.props.headers !== undefined){
            this.ajaxProps['headers'] = this.props.headers;
        }

        // ajax post type 
        this.ajaxProps['method'] = this.props.type || 'post';
        
        // method and processor control 
        if (this.props.processor !== undefined) {
            // processor merge
            this.ajaxProps['processor'] = this.props.processor; 

            // param data merge or findAll and null
            this.ajaxProps['data'] = {
                'processor': this.props.processor,
                'method': this.props.method || 'findAll',
                'data': this.props.data || [null]
            }
        }
    }


    /**
     * call method
     */
    call() {
        if (this.props.url !== undefined) {
            // before token add 
            this.beforeToken();
            axios(this.ajaxProps).then((response:any) => {
                // props success control
                if (this.props['successCallback'] !== undefined) {
                    this.props['successCallback'](response);
                }

                // props error callback function
                if (this.props['callback'] !== undefined) {
                    this.props['callback'](response);
                }

                // token control method
                this.afterToken(response['token']);

            }).catch((error:any) => {
                // props error control
                if (this.props['errorCallback'] !== undefined) {
                    this.props['errorCallback'](error);
                }

                // props error callback function
                if (this.props['callback'] !== undefined) {
                    this.props['callback'](error);
                }
            });
        } else {
            console.error('Lütfen zorunlu olan (url) giriniz.');
        }

    }


    afterToken(token: any) {
        let returnToken: any;

        if (token !== (undefined && null)) {
            localStorage.setItem('token', token);
            returnToken = token;
        } else {
            if (this.props.headers.token !== undefined) {
                returnToken = this.props.header.token;
            } else if (localStorage.getItem('token') !== null) {
                returnToken = localStorage.getItem('token');
            }
        }

        if (returnToken !== undefined) {
            this.props['headers']['token'] = returnToken;
            return returnToken;
        }
    }

    beforeToken(){
        let token:any = localStorage.getItem('token');
        if(token !== null){
            this.ajaxProps['headers']['Authorization'] = localStorage.getItem('token'); 
        }
    }

}
