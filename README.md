# sprinklerPi_node
Raspberry Pi Sprinkler controller running on NodeJS.
This project is based on https://github.com/rszimm/sprinklers_pi, which works awesomely, but the Weather Underground integration is inconsistent. This is because it only allows the use of a static IP address for the API endpoint. Please see the following for details: https://github.com/rszimm/sprinklers_pi/issues/58

I decided to tackle the weather adjustments in Javascript and thus will build the project around NodeJS. I am using rszimm's formula for scaling the sprinkler run time:

Humidity: Average humidity for the previous day above 30% is subtracted from the weather adjustment, below 30% is added to it. Example: 77% Max Humidity + 26% Min Humidity / 2 = 51% Avg Humidity, 30% - 51% Avg Humidity = -21% Humidity Adjustment
Temperature: +4% for each degree Fahrenheit above 70, and -4% for each degree Fahrenheit below 70.
Precipitation: -2% for each hundredth of an inch precipitation from today and yesterday. Example: 0.12" rain today + 0.05" rain yesterday * 100 = 17 hundredths of an inch of rain * -2 = -34% Precipitation Adjustment
The total weather adjustment will not exceed the range of 0% to 200%.
