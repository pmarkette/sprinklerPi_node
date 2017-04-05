    jQuery(document).ready(function($) {
      $.ajax({
      url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/yesterday/q/94619.json',
      dataType : 'jsonp',
      success : function(yesterday_json) {
      var min_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['minhumidity']);
      var max_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['maxhumidity']);
      var temp_yesterday = parseInt(yesterday_json['history']['dailysummary'][0]['meantempi']);
      var rain_yesterday = parseFloat(yesterday_json['history']['dailysummary'][0]['precipi']);
      var rain_factor = 0;
      var temp_factor = ((temp_yesterday -70) * 4);
      var humid_factor = (30 - (min_humidity + max_humidity) / 2);
      var adj = (Math.min((Math.max(0, (100 + humid_factor + temp_factor + rain_factor))), 200));
      console.log('Min Humidity Yesterday: ' + min_humidity);
      console.log('Max Humidity Yesterday: ' + max_humidity);
      console.log('Mean Temperature Yesterday: ' + temp_yesterday);
      console.log('Total rainfall yesterday: ' + rain_yesterday);
      console.log('Rain Factor: ' + rain_factor);
      console.log('Temperature Factor: ' + temp_factor);
      console.log('Humidity Factor: ' + humid_factor);
      console.log('Sprinklers will run for ' + adj + '% of the scheduled time.');
      }
      }),
      $.ajax({
      url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/conditions/q/94619.json',
      dataType : 'jsonp',
      success : function(conditions_json) {
      var rain_today = parseFloat(conditions_json['current_observation']['precip_today_in']);
      console.log('Total rainfall today: ' + rain_today);
      }
      });
    });
