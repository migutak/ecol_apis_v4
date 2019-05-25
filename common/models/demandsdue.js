'use strict';

module.exports = function(Demandsdue) {

    Demandsdue.grouptotal = function (column, value,letter, cb) {

        var ds = Demandsdue.dataSource;
        var sql = '';
        var query = "";
        console.log(column, value);
        if (column) {
            query = " and " + column + "= '" + value + "'";
        }

        sql = "select demandletter, count(accnumber) total from demandsdue where status = 'PENDING' and demandletter= '" + letter + "'" + query + ' group by demandletter';
        // console.log(sql);
        ds.connector.query(sql, [], function (err, Demandsdue) {

            if (err) console.error(err);

            cb(err, Demandsdue);

        });

    };

    Demandsdue.remoteMethod(
        'grouptotal',
        {
            http: { verb: 'get' },
            description: 'Get summary of demands due',
            accepts: [
                { arg: 'column', type: 'string', http: { source: 'query' } },
                { arg: 'value', type: 'string', http: { source: 'query' } },
                { arg: 'letter', type: 'string', http: { source: 'query' } }
            ],
            returns: { arg: 'data', type: ['Demandsdue'], root: true }
        }
    );

    Demandsdue.lazy = function (cb) {
        //
    }

    Demandsdue.remoteMethod(
        'lazy',
        {
            http: { verb: 'get' },
            description: 'Get demands letters lazy',
            accepts: [
                { arg: 'column', type: 'string', http: { source: 'query' } },
                { arg: 'value', type: 'string', http: { source: 'query' } },
                { arg: 'letter', type: 'string', http: { source: 'query' } }
            ],
            returns: { arg: 'data', type: ['Demandsdue'], root: true }
        }
    );

    Demandsdue.total = function (cb) {
        var ds = Demandsdue.dataSource;
        //
        var total_sql = "Select count(*) totalviewall from demandsdue";
        ds.connector.query (total_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

    };
    
    Demandsdue.remoteMethod('total', {
        accepts: [],
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

    Demandsdue.search = function (searchtext, cb) {
        var ds = Demandsdue.dataSource;

        Demandsdue.find({where: {or: [
            {accnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {client_name: {like: '%'+searchtext.toUpperCase()+'%'}},
            {custnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {section: {like: '%'+searchtext.toUpperCase()+'%'}}
        ]}}, function(err, demands) {
            if (err) console.error(err);
            cb(err, demands);
        });

      };
    
      Demandsdue.remoteMethod('search', {
        accepts: {
          arg: 'searchtext',
          type: 'string',
          http: {
            source: 'query',
          },
        },
        returns: {
          arg: 'result',
          type: 'array',
          root: true,
        },
        http: {
          path: '/search',
          verb: 'get',
        },
      });

};
