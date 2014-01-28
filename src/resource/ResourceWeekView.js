
fcViews.resourceWeek = ResourceWeekView;

function ResourceWeekView(element, calendar) {
    var t = this;


    // exports
    t.incrementDate = incrementDate;
    t.render = render;

    // imports
    ResourceView.call(t, element, calendar, 'resourceWeek');
    var getResources = t.getResources;

    function incrementDate(date, delta) {
        return date.clone().stripTime().add('weeks', delta).startOf('week');
    }


    function render(date) {

        t.intervalStart = date.clone().stripTime().startOf('week');
        t.intervalEnd = t.intervalStart.clone().add('weeks', 1);

        t.start = t.skipHiddenDays(t.intervalStart);
        t.end = t.skipHiddenDays(t.intervalEnd, -1, true);

        t.title = calendar.formatRange(
            t.start,
            t.end.clone().subtract(1), // make inclusive by subtracting 1 ms
            t.opt('titleFormat'),
            ' \u2014 ' // emphasized dash
        );

        t.renderBasic(getResources.length, t.getCellsPerWeek(), false);
    }
}