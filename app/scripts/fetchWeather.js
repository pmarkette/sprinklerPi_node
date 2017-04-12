var fetch = require('node-fetch');
var min_humidity = 0,
    max_humidity = 0,
    temp_yesterday = 0,
    rain_yesterday = 0,
    rain_factor = 0,
    temp_factor = 0,
    humid_factor = 0,
    adj = 0,
    rain_today = 0,
    date_now = 0,
    delay = 3600000;

function intervalFunc () {  
    fetch('http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/yesterday/q/94619.json')
    .then(function(res) {
      return res.json();
    }).then(function(yesterday_json) {
      min_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['minhumidity']);
      max_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['maxhumidity']);
      temp_yesterday = parseInt(yesterday_json['history']['dailysummary'][0]['meantempi']);
      rain_yesterday = parseFloat(yesterday_json['history']['dailysummary'][0]['precipi']);
    })
    fetch('http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/conditions/q/94619.json')
    .then(function(res) {
      return res.json();
    }).then(function(conditions_json) {
      rain_today = parseFloat(conditions_json['current_observation']['precip_today_in']);
      })
    .then(function() {
      rain_factor = ((rain_yesterday + rain_today) * -200);
      temp_factor = ((temp_yesterday -70) * 4);
      humid_factor = (30 - (min_humidity + max_humidity) / 2);
      adj = (Math.min((Math.max(0, (100 + humid_factor + temp_factor + rain_factor))), 200));
      date_now = Date();
  });
}

intervalFunc();

setInterval(intervalFunc, delay);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (info TEXT)");
  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();