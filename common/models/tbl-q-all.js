'use strict';

module.exports = function (Tblqall) {
    Tblqall.viewallcc = function (pagesize,pagenum, cb) {
        
        let start = pagesize * pagenum;
        
        var ds = Tblqall.dataSource;
        var countviewall = "select count(*) total from cards_stage";
        var viewallq = "select * from cards_stage offset "+start+" rows fetch next "+pagesize+" rows only";
        ds.connector.query(countviewall, [], function (err, count) {
            if (err) console.error(err);
            ds.connector.query(viewallq, [], function (error, viewall) {
                var result = []
                if (error) console.error(error);
                viewall[0].totalRecords = (count[0].TOTAL)
                console.log(viewall);
                cb(err, viewall);
            })
        })
    }

    Tblqall.remoteMethod('viewallcc', {
        accepts: [
            {
                arg: 'pagesize',
                type: 'string',
                http: {
                    source: 'query',
                },
            },
            {
                arg: 'pagenum',
                type: 'string',
                http: {
                    source: 'query',
                },
            }
        ],
        returns: {
            arg: 'result',
            type: 'array',
            root: true,
        },
        http: {
            path: '/viewallcc',
            verb: 'get',
        },
    });

    Tblqall.viewall = function (pagesize,pagenum, cb) {
        
        let start = pagesize * pagenum;
        
        var ds = Tblqall.dataSource;
        var countviewall = "select count(*) total from tbl_q_all";
        var viewallq = "select * from tbl_q_all offset "+start+" rows fetch next "+pagesize+" rows only";
        ds.connector.query(countviewall, [], function (err, count) {
            if (err) console.error(err);
            ds.connector.query(viewallq, [], function (error, viewall) {
                var result = []
                if (error) console.error(error);
                viewall[0].totalRecords = (count[0].TOTAL)
                console.log(viewall);
                cb(err, viewall);
            })
        })
    }

    Tblqall.remoteMethod('viewall', {
        accepts: [
            {
                arg: 'pagesize',
                type: 'string',
                http: {
                    source: 'query',
                },
            },
            {
                arg: 'pagenum',
                type: 'string',
                http: {
                    source: 'query',
                },
            }
        ],
        returns: {
            arg: 'result',
            type: 'array',
            root: true,
        },
        http: {
            path: '/viewall',
            verb: 'get',
        },
    });
};
