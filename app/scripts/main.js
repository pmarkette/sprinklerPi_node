jQuery(document).ready(function($) {  
    $('#minhumidity').append(min_humidity);
    $('#maxhumidity').append(max_humidity);
    $('#meantemp').append(temp_yesterday);
    $('#rainfall').append(rain_yesterday);
    $('#rainfalltoday').append(rain_today);
    $('#rainfactor').append(rain_factor);
    $('#tempfactor').append(temp_factor);
    $('#humfactor').append(humid_factor);
    $('#adjust').append(adj);
});

