    jQuery(document).ready(function($) {
      $.ajax({
      url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/yesterday/q/94619.json',
      dataType : 'jsonp',
      success : function(yesterday_json) {
      var min_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['minhumidity']);
      var max_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['maxhumidity']);
      var temp_yesterday = yesterday_json['history']['dailysummary'][0]['meantempi'];
      var rain_yesterday = yesterday_json['history']['dailysummary'][0]['precipi'];
      var humid_factor = (30 - (min_humidity + max_humidity) / 2);
      console.log('Min Humidity Yesterday: ' + min_humidity);
      console.log('Max Humidity Yesterday: ' + max_humidity);
      console.log('Mean Temperature Yesterday: ' + temp_yesterday);
      console.log('Total rainfall yesterday: ' + rain_yesterday);
      console.log('Humidity Factor: ' + humid_factor);
      }
      }),
      $.ajax({
      url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/conditions/q/94619.json',
      dataType : 'jsonp',
      success : function(conditions_json) {
      var rain_today = conditions_json['current_observation']['precip_today_in'];
      console.log('Total rainfall today: ' + rain_today);
      }
      });
    });
