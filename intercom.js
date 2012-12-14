var request = require("request");
var qs      = require("querystring");

function parseJSON(str) {
  var obj;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return obj = {};
  }
  return obj;
}

var set_args = function (options, args) {
  for(var attr in args) {
    if (args.hasOwnProperty(attr)){
      options[attr] = args[attr];
    }
  }
  return options;
};


var sign = function() {
  var config = require("./config/settings");
  return "Basic " + new Buffer(config.APP_ID + ":" + config.API_KEY).toString("base64");
}

exports.app = function(config) {
  return {
    users: {
      all: function(args, cb) {
        if(cb == null) cb = args; 

        var args = {
          "method": "GET",
          "url": " https://api.intercom.io/v1/users",
          "headers": {"Authorization": sign() } 
        }

        return request(args, function(e, r, body) {
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },
     
      get: function(email,cb) {
        this.getByEmail(email,cb);
      },
     
      getByEmail: function(email, cb) {
        var args = {
          "method": "GET",
          "url": "https://api.intercom.io/v1/users/?email=" + email,
          "headers": { "Authorization": sign() } 
        }

        return request(args, function(e, r, body) {
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      post: function(data, cb) {
        var args = {
          "method": "POST",
          "url": "https://api.intercom.io/v1/users/",
          "headers": { "Authorization": sign() },
          "body": qs.stringify(data)
        }

        return request(args, function(e, r, body) {
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },
     
      put: function(data, cb) {
        var args = {
          "method": "PUT",
          "url": "https://api.intercom.io/v1/users/",
          "headers": { "Authorization": sign() },
          "body": qs.stringify(data)
        }

        return request(args, function(e, r, body) {
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      delete: function(data, cb) {
        var params = qs.stringify(data);

        var args = {
          "method": "DELETE",
          "url": "https://api.intercom.io/v1/users/?" + params,
          "headers": { "Authorization": sign() }
        }

        return request(args, function(e, r, body) {
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      }
    }
  }
}