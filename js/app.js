var Weather = Backbone.Model.extend({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily'
});

//Render weather results
var WeatherView = Backbone.View.extend({
    el: '.query-holder',
    initialize: function(options) {
        this.model = new Weather;
        this.listenTo(this.model, "change", this.render);
    },
    events: {
        "click .fetch-weather-trigger": "fetchWeather",
    },
    render: function() {
        _.templateSettings.variable = "rc";
        var template = _.template(
            $(".weatherTemplate").html()
        );
        var weatherData = this.model.get("list");
        $(".center-wrapper").empty().append(
            template(weatherData)
        );
        $('.fetch-detailed-trigger-trigger').removeClass('active');
        $('.fetch-summary-trigger').addClass('active');
    },
    fetchWeather: function(e) {
        var city = $('.user-city-input').val();
        if (city === '' || city === undefined || city === null) {
            $('.user-city-input').css('border', '1px solid red');
        } else {
            $('.user-city-input').css('border', 'none');
            this.model.fetch({
                traditional: true,
                data: $.param({
                    q: city,
                    units: 'imperial',
                    cnt: 10
                }),
                success: function() {},
                error: function(err) {}
            });
        }
    }
});

//Allow switching between summary and detailed view
var DetailedWeatherView = Backbone.View.extend({
    el: '.weather-holder',
    events: {
        "click .fetch-detailed-trigger": "fetchDetailedWeather",
        "click .fetch-summary-trigger": "fetchSummaryWeather"
    },
    fetchDetailedWeather: function(e) {
        $('.fetch-summary-trigger').removeClass('active');
        $('.fetch-detailed-trigger').addClass('active');
        $('.detailed').show();
    },
    fetchSummaryWeather: function(e) {
        $('.fetch-summary-trigger').addClass('active');
        $('.fetch-detailed-trigger').removeClass('active');
        $('.detailed').hide();
    }
});

var view = new WeatherView();
var detailedView = new DetailedWeatherView();