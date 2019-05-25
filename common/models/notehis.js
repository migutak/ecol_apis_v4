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
};
