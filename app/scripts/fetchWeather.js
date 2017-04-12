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

      var sqlite3 = require('sqlite3').verbose();
      var db = new sqlite3.Database('../db/sprinkler.db');

      db.serialize(function() {
        var stmt = db.prepare('UPDATE weather SET minhumidity = (?), maxhumidity = (?), tempyesterday = (?), rainyesterday = (?)');
            stmt.run(min_humidity, max_humidity, temp_yesterday, rain_yesterday);
        stmt.finalize();
        console.log('Min Humidity: ' + min_humidity);
        console.log('Max Humidity: ' + max_humidity);
        console.log('Temp Yesterday: ' + temp_yesterday);
        console.log('Rain Yesterday: ' + rain_yesterday);
      });
      db.close();
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

      var sqlite3 = require('sqlite3').verbose();
      var db = new sqlite3.Database('../db/sprinkler.db');

      db.serialize(function() {
        var stmt = db.prepare('UPDATE weather SET raintoday = (?), rainfactor = (?), humidityfactor = (?), tempfactor = (?), adjustment = (?), timestamp = (?), updatedelay = (?)');
            stmt.run(rain_today, rain_factor, humid_factor, temp_factor, adj, date_now, delay);
        stmt.finalize();
        console.log('Rain Today: ' + rain_today);
        console.log('Rain Factor: ' + rain_factor);
        console.log('Humidity Factor: ' + humid_factor);
        console.log('Temp Factor: ' + temp_factor);
        console.log('Adjustment: ' + adj);
        console.log('Timestamp: ' + date_now);
        console.log('Delay: ' + delay);
      });
      db.close();
  });
}

intervalFunc();

setInterval(intervalFunc, delay);

