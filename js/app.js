var Weather = Backbone.Model.extend({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily'
});

var WeatherView = Backbone.View.extend({
    el: '.filter-holder',
    initialize: function(options) {
        this.model = new Weather;
        this.listenTo(this.model, "change", this.render);
    },
    events: {
        "click .fetch-weather-trigger": "fetchWeather",
        "click .fetch-detailed-trigger": "fetchDetailedWeather"
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
    },
    fetchWeather: function(e) {
        var city = $('.user-city-input').val();
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
    },
    fetchDetailedWeather: function(e) {
        $('.detailed').show()
    }
});

var view = new WeatherView();