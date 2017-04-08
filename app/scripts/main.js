var min_humidity, max_humidity, temp_yesterday, rain_yesterday, rain_factor, temp_factor, humid_factor, adj, rain_today;

jQuery(document).ready(function($) {    
  $.when($.ajax({
    url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/yesterday/q/37.788792,-122.190025.json',
      dataType : 'jsonp',
      success : function(yesterday_json) {
      min_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['minhumidity']);
      max_humidity = parseInt(yesterday_json['history']['dailysummary'][0]['maxhumidity']);
      temp_yesterday = parseInt(yesterday_json['history']['dailysummary'][0]['meantempi']);
      rain_yesterday = parseFloat(yesterday_json['history']['dailysummary'][0]['precipi']);
    }
  }),
    $.ajax({
      url : 'http://api.wunderground.com/api/b0cb22caebaf9a0e/geolookup/conditions/q/37.788792,-122.190025.json',
      dataType : 'jsonp',
      success : function(conditions_json) {
      rain_today = parseFloat(conditions_json['current_observation']['precip_today_in']);
    }
  })).then(function() {
    rain_factor = ((rain_yesterday + rain_today) * -200);
    temp_factor = ((temp_yesterday -70) * 4);
    humid_factor = (30 - (min_humidity + max_humidity) / 2);
    adj = (Math.min((Math.max(0, (100 + humid_factor + temp_factor + rain_factor))), 200));

    console.log('Min Humidity Yesterday: ' + min_humidity);
    console.log('Max Humidity Yesterday: ' + max_humidity);
    console.log('Mean Temperature Yesterday: ' + temp_yesterday);
    console.log('Total rainfall yesterday: ' + rain_yesterday);
    console.log('Rain Factor: ' + rain_factor);
    console.log('Temperature Factor: ' + temp_factor);
    console.log('Humidity Factor: ' + humid_factor);
    console.log('Total rainfall today: ' + rain_today);
    console.log('Sprinklers will run for ' + adj + '% of the scheduled time.');
  });
});


