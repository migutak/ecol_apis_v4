'use strict';

module.exports = function(tcards) {
    tcards.search = function (searchtext, cb) {

      tcards.find({where: {or: [
            {cardacct: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}}
        ]}}, function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        });

      };
    
      tcards.remoteMethod('search', {
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
