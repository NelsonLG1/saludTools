import { UsuarioApp } from "./constantes";
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);
const { MongoClient } = require('mongodb')
const boxen = require('boxen');
// const MONGO_URI = 'mongodb://localhost/'+UsuarioApp;
const MONGO_URI = 'mongodb://nelson:duribe.3@cluster0-shard-00-00.iztt1.mongodb.net:27017,cluster0-shard-00-01.iztt1.mongodb.net:27017,cluster0-shard-00-02.iztt1.mongodb.net:27017/Saludtools?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
var connection:any;

//patron singlenton para que solo se cree una isntancia y no sature o cree erores al futuro
function connect() {
    if (!connection) {
        let client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
        connection = new Promise((resolve, reject) => {
            // si existe devuelva el error como reject
            client.connect(function (err: any) { !err ? resolve(client.db(UsuarioApp.toString())) : reject(err) })
            // client.connect(function (err: any) { !err ? resolve(client.db('Hda')) : reject(err) })
            console.log(boxen('         Base de datos Conectada          ', { borderColor: '#fcc203' }))
        })
    }
    // si no existe la intancia entonces la creeo si escxiste no la creeo
    return connection
}

export const connectionDb = connect();
