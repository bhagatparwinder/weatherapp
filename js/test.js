QUnit.test("Render weather for 10 days", function(assert) {
    var done = assert.async();
    $('.user-city-input').val('Chicago');
    $('.fetch-weather-trigger').click();
    setTimeout(function() {
        var addedElements = $('.day-weather').length;
        assert.equal(addedElements, 10, "Valid city found. Results displayed.");
        done();
    }, 1000);
});
QUnit.test("Incorrect city or error occured", function(assert) {
    var done = assert.async();
    $('.user-city-input').val('yz');
    $('.fetch-weather-trigger').click();
    setTimeout(function() {
        var addedElements = $('.day-weather').length;
        assert.equal(addedElements, 0, "Error occured.");
        done();
    }, 1000);
});
QUnit.test("Check if details and summary are rendered properly", function(assert) {
    var done = assert.async();
    $('.user-city-input').val('Chicago');
    $('.fetch-weather-trigger').click();
    setTimeout(function() {
        //assert that all elements are hidden
        var hiddenCount = $('.detailed:hidden').length;
        var visibleCount = $('.detailed:visible').length;
        assert.equal(visibleCount, 0, "Summary is displayed.");
        assert.ok(hiddenCount > 0, "Detail is hidden.");

        //fire click
        $('.fetch-detailed-trigger').click();

        //assert that all elements are shown
        var hiddenCount = $('.detailed:hidden').length;
        var visibleCount = $('.detailed:visible').length;
        assert.equal(hiddenCount, 0, "Detail is displayed.");
        assert.ok(visibleCount > 0, "No details are hidden.");

        done();
    }, 1000);
});