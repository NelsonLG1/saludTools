import { connectionDb } from '../shared/mongoDb';

export class MongoLib {
    connection: any = connectionDb;

    public constructor() {
    }


    public getAll(collection, query, select = null, sort = {}, limit = 999999, page = 1) {
        return this.connection.then(db => {
            return db.collection(collection).find(query, { fields: select }).sort(sort).skip((Number(limit) * Number(page)) - Number(limit)).limit(Number(limit)).toArray()
        })
    }

    public get(collection, id, select = null) {
        return this.connection.then(db => {
            return db.collection(collection).findOne({ id: id }, { fields: select })
        })
    }

    public getQuery(collection, query, select = null) {
        return this.connection.then(db => {
            return db.collection(collection).findOne(query, { fields: select })
        })
    }

    public create(collection, data) {
        return this.connection.then(db => {
            return db.collection(collection).insertOne(data)
        }).then(result => { return result.insertedId })
            .catch(function (err: any) { return err });
    }

    public update(collection, id, data, unset?) {
        let datos: Object = { $set: data };
        if (unset != null) {
            datos = { $unset: unset };
        }
        return this.connection.then(db => {
            return db.collection(collection).updateOne(
                { id:id },
                datos,
                { upsert: false }
            )
        }).then(result => { return id })
            .catch(function (err: any) { return err });
    }

    public updateQuery(collection, query, data, unset?) {
        let datos: Object = { $set: data };
        if (unset != null) {
            datos = { $unset: unset };
        }
        return this.connection.then(db => {
            return db.collection(collection).updateOne(
                query,
                datos,
                { upsert: false, returnNewDocument: true }
            )
        }).then(result => { return result.upsertedId || query })
            .catch(function (err: any) { return err });
    }

    public delete(collection, id) {
        return this.connection.then(db => {
            return db.collection(collection).deleteOne({ id:id })
        }).then(result => { return result._id })
            .catch(function (err: any) { return err });
    }

    public deleteQuery(collection, query) {
        return this.connection.then(db => {
            return db.collection(collection).deleteOne(query)
        }).then(result => { return result._id })
            .catch(function (err: any) { return err });
    }

    public findAndModify(collection, key) {
        let value = { seq: 0 };
        return this.connection.then(db => {
            return db.collection(collection).findAndModify({ _id: key }, null, { $inc: { seq: 1 } }, { new: true });
        });
    }

}

