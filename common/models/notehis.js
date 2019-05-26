'use strict';

module.exports = function (Notehis) {
    Notehis.total = function (custnumber, cb) {
        var ds = Notehis.dataSource;
        //
        var total_sql = "Select count(*) total from notehis where custnumber = '" + custnumber +"'";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    Notehis.remoteMethod('total', {
        accepts: {
            arg: 'custnumber',
            type: 'string',
            http: {
                source: 'query',
            },
        },
        returns: {
            arg: 'result',
            type: 'object',
            root: true,
        },
        http: {
            path: '/total',
            verb: 'get',
        },
    });

    Notehis.custnotes = function (custnumber, cb) {
        var ds = Notehis.dataSource;
        //
        var total_sql = "Select * from notehis where custnumber = '" + custnumber +"' order by notedate desc";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            console.log(accounts)
            cb(err, accounts);
        })

    };

    Notehis.remoteMethod('custnotes', {
        accepts: {
            arg: 'custnumber',
            type: 'string',
            http: {
                source: 'query',
            },
        },
        returns: {
            arg: 'result',
            type: 'object',
            root: true,
        },
        http: {
            path: '/custnotes',
            verb: 'get',
        },
    });
};
