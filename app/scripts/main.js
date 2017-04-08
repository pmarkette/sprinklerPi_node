var min_humidity, max_humidity, temp_yesterday, rain_yesterday, rain_factor, temp_factor, humid_factor, adj, rain_today;

  
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

jQuery(document).ready(function($) {  
      $("#minhumidity").append(min_humidity);
    $("#maxhumidity").append(max_humidity);
    $("#meantemp").append(temp_yesterday);
    $("#rainfall").append(rain_yesterday);
    $("#rainfalltoday").append(rain_today);
    $("#rainfactor").append(rain_factor);
    $("#tempfactor").append(temp_factor);
    $("#humfactor").append(humid_factor);
    $("#adjust").append(adj);
});

  });



