import Application from '../applications/Applications';
import LocalEndPoint from './LocaleEndPoint';
import RemoteEndPoint from './RemoteEndPoint';
export default class Store {

    props: object | any = {
        idField: "id",
        data: [],
        param: [],
        originUrl: null,
        endPoint: null,
        //obje kontollü denetim için kullanılır
        responseData: null,
        /**
         * Sayfalama kontrolü yapmak için kullanılır
         */
        pageTotalData:null,
        processor: null,
        type: 'POST',
        method: null,
        totalCount:0,
        pageData: {},
    };

    __dataMap?: any[];
    __callback?: any;
    __updated?: boolean = false;
    __component?: any;
    __order?:any;
    __page:any = {page:0, pageShow:0};
    __oldData?:any[];
    __endPoint:any = null;

    constructor(props: object, selfComponent?: any, callback?: any, updated?: boolean) {
        this.props = Application.mergeObject(this.props, props);

        this.__callback = callback;
        this.__component = selfComponent;

    }

    /**
     * component load run
     */
    storeRead(){
        this.endPoint();
    }

    /**
     * Endpoint control
     */
    endPoint() {
        if (this.props.processor !== undefined || this.props.originUrl !== undefined) {
            // get endpoint
            this.props.endPoint = new RemoteEndPoint(this.props, (response: any) => {
                this.endPointCallback(response)
            });

            this.__endPoint = 'remoteEndPoint';
        }else {
            // old data
            this.__oldData = this.props.data.slice(0);

            // get endpoint
            this.props.endPoint = new LocalEndPoint(this.props, (response: any) => {
                this.endPointCallback(response);
            });

            this.__endPoint = 'localeEndPoint';
        }
    }

    /**
     * Endpoint callback
     * @param response
     */
    endPointCallback(response: any) {
        if (response !== undefined) {
            this.props.data = response.data !== undefined ? response.data : [];
            this.props.totalCount = response.totalCount !== undefined ? response.totalCount : 0;
        }

        if (this.__callback !== undefined) {
            this.__callback(response);
        }
    }

    /**
     * Store read
     * @param callback
     */
    read(callback?:any) {
        this.props.endPoint.read(this.props, (data:any)=>{
            this.endPointCallback(data);
        });
        this.__callback(this.props.data);

        if(callback !== undefined)
            callback(this.props.data);
    }

    /**
     * Create
     * @param item
     * @param successCallback
     * @param errorCallback
     */
    create(items: any, callback?: any) {
        if (items !== undefined) {
            this.props.endPoint.create(items, callback);
            this.__callback(this.__dataMap);
        }
    }

    /**
     * Update
     * @param items
     * @param successCallback
     * @param errorCallback
     */
    update(items: any, callback?: any) {
        if (items !== undefined) {
            this.props.endPoint.update(items, callback);
            this.__callback(this.__dataMap);
        }
    }


    /**
     * Delete
     * @param items
     * @param successCallback
     * @param errorCallback
     */
    delete(items: any, callback?: any) {
        if (items !== undefined) {
            this.props.endPoint.delete(items, callback);
            this.__callback(this.__dataMap);
        }
    }

    /**
     * Reset
     * @param successCallback
     */
    reset(callback?: any) {
        this.__callback(this.__dataMap);
        return this.props.endPoint.reset(callback);
    }

    /**
     * Order sort data
     * @param fieldName
     * @param callback
     */
    orderSort(fieldName: any, callback?:any) {
        if (fieldName !== undefined) {
            this.props.endPoint.orderSort(fieldName, (data: any) => {
                this.orderCallback(data, 'ASC', fieldName, callback);
            });
        } else {
            throw new Error('Field name empty');
        }
    }

    /**
     * Order reverse data
     * @param fieldName
     * @param callback
     */
    orderReverse(fieldName: any, callback?:any) {
        if (fieldName !== undefined) {
            this.props.endPoint.orderReverse(fieldName, (data: any) => {
                this.orderCallback(data, 'DESC', fieldName, callback);
            });
        } else {
            throw new Error('Field name empty');
        }
    }

    /**
     * Sort get old data
     * @param fieldName
     * @param callback
     */
    oldDataSort(fieldName:any, callback?:any){
        this.props.endPoint.oldDataSort((data:any)=>{
            this.orderCallback(data, '', fieldName, callback);

            if(callback !== undefined) {
                callback(data);
            }
        });
    }

    /**
     * Order callback data
     * @param data
     * @param order
     * @param fieldName
     * @param callback
     */
    orderCallback(data: any, order: any, fieldName: any, callback?:any) {
        if (data !== undefined && data.length > 0) {
            this.props.data = data;
            this.__order = {order: order, value: fieldName};
            this.__dataMap = data;
            this.__callback();

            if(callback !== undefined)
                callback(data);
        }
    }

    /**
     * filters
     * @param fieldName
     * @param value
     * @param callback
     */
    filter(fieldName: any, value: any, operator?:any, callback?:any) {
        if (fieldName !== undefined) {
            this.props.endPoint.filter(fieldName, value, operator, (data:any)=>{
                this.props.data = data;
            });
        } else {
            throw new Error('Field name empty')
        }
    }

    /**
     * data page
     * @param page
     * @param pageShow
     */
    pagination(page:any, pageShow:any){
        let pages = (page !== undefined) ? page : this.__page.page;
        let pagesShow = (pageShow !== undefined) ? pageShow : this.__page.pageShow;

        if(pages !== undefined && pageShow !== undefined && pageShow > 0){
            this.props.pageData['start'] = pagesShow * (pages - 1);
            this.props.pageData['limit'] = pagesShow;

            if(this.props.endPoint !== undefined){
                this.props.endPoint.paging(true);
            }
        }
    }


}
