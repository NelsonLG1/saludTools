const _ = require('underscore');

class QueryModel {
    constructor(query: any) {
        this.state = query.state;
        this.text = query.text;
        this.columnText = query.columnText;
        this.TextLike = query.TextLike;
        this.Date = query.Date;
        this.Object = query.Object;
        this.Array = query.Array;
        this.columnSort = query.columnSort;
        this.typeSort = query.typeSort;
        this.columns = query.columns;
        this.columnsSkip = query.columnsSkip;
        this.limitAmount = query.limitAmount;
        this.exists = query.exists;
        this.page = query.page;
        this.createQuery();
    }

    private query: Object;
    private state?: Boolean;
    private text?: Number;
    private columnText?: String;
    private TextLike?: Object;
    private Date?: Object;
    private Object?: Object;
    private Array?: any;
    private columnSort?: String;
    private typeSort?: String;
    private Sort?: Object;
    private columns?: Array<String>;
    private columnsSkip?: Array<String>;
    private fields?: Object;
    private limitAmount?: Number;
    private exists? : String;
    private page?: Number;

    public getQuery() {
        return this.query;
    }

    public getSort() {
        return this.Sort;
    }

    public getFields() {
        return this.fields;
    }

    public getLimit() {
        return this.limitAmount;
    }

    public getPage() {
        return this.page;
    }

    private createQuery() {
        this.query = new Object();
        this.fields = new Object();
        this.Sort = new Object();

        let queryDate = new Object();
        let queryText = new Object();
        let queryState = new Object();
        let queryTextLike = new Object();
        let queryObject = new Object();
        let queryArray = new Object();
        let queryExists = new Object();


        if (this.TextLike != undefined) {
            queryTextLike = _.mapObject(this.TextLike, function (val, key) {
                return { '$regex': '.*' + val + '.*', $options: 'i' };
            });
        }

        if (this.Object != undefined) {
            queryObject = this.Object;
        }

        if (this.state != undefined) {    
            queryState = { estado: this.state }
        }

        queryState = { state: true }

        if (this.Array != undefined) {
            queryArray = _.mapObject(this.Array, function (val, key) {
                return { '$in': val };
            });
        }

        if (this.exists != undefined) {
            queryExists[this.exists.toString()] = { $exists: true };
        }

        if (this.Date != undefined) {
            let fechas = new Object;
            let fechaIni;
            let fechaFin;
            let keys = _.keys(this.Date);
            for (const key of keys) {
                _.mapObject(this.Date[key], function (val, key) {
                    if (key == "dateIni") {
                        fechaIni = new Date(val);
                        fechaIni.setUTCHours(0, 0, 0);
                        fechas["$gte"] = fechaIni;
                    }
                    if (key == "dateEnd") {
                        fechaFin = new Date(val);
                        fechaFin.setUTCHours(23, 59, 59);
                        fechas["$lte"] = fechaFin;
                    }
                });
                if (fechaFin >= fechaIni) {
                    queryDate[key] = fechas;
                    fechas = new Object();
                }
            }
        }

        if (this.text != undefined && this.columnText == undefined) {
            queryText = {
                $or:
                    [
                        { descripcion: { '$regex': '.*' + this.text + '.*', $options: 'i' } },
                        { _id: { '$regex': '.*' + this.text + '.*', $options: 'i' } }
                    ]
            };

            this.fields = { descripcion: 1 };
        }

        if (this.text != undefined && this.columnText != undefined) {
            let columnText = new Object();
            columnText[this.columnText.toString()] = { '$regex': '.*' + this.text + '.*', $options: 'i' };
            queryText = columnText;
        }

        this.query = _.extend({ rol: { $ne: 'SU' } },queryText, queryTextLike, queryDate, queryObject, queryArray, queryState, queryExists);

        if (this.columnSort != undefined) {
            this.Sort[this.columnSort.toString()] = this.typeSort == 'D' ? -1 : 1;
        }

        if (this.columnsSkip != undefined) {
            for (const column of this.columnsSkip) {
                this.fields[column.toString()] = 0;
            }
        }

        if (this.columns != undefined) {
            for (const column of this.columns) {
                this.fields[column.toString()] = 1
            }
        }
    }
}

export default QueryModel;