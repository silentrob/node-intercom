var io = require("../intercom").app();


io.users.all(function(code, body){
  console.log(code, body.toString());
});

io.users.get("rob@chloi.io", function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email" : "jorge@chloi.io",
  "name" : "Jorge Predet",
  "created_at" : (new Date() / 1000),
  "pre_launch" : true,
  "last_seen_ip" : "1.2.3.4",
  "last_seen_user_agent" : "ie6"
}

io.users.post(data, function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email" : "jorge@chloi.io",
  "name" : "Jorgie"
}

io.users.put(data, function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email": "jorge@chloi.io"
}

io.users.delete(data, function(code, body){
  console.log(code, body.toString());
});