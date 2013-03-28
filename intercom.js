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



exports.app = function(config) {

  var sign = function() {
    return "Basic " + new Buffer(config.APP_ID + ":" + config.API_KEY).toString("base64");
  }

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
     
      get: function(user_id_or_email, cb) {
        
        var key = (user_id_or_email.indexOf("@") == -1) ? "user_id" : "email";

        var args = {
          "method": "GET",
          "url": "https://api.intercom.io/v1/users/?"+ key + "=" + user_id_or_email,
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
          "headers": { "Authorization": sign(), 'Content-Type': 'application/json' },
          "body": JSON.stringify(data)
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
          "headers": { "Authorization": sign(), 'Content-Type': 'application/json' },
          "body": JSON.stringify(data)
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
