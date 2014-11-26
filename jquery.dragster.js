(function ($) {
    "use strict";

    $.fn.dragster = function (options) {
        var settings = $.extend({
            drop: $.noop,
            enter: $.noop,
            leave: $.noop,
            over: $.noop
        }, options);

        return this.each(function () {
            var first = false,
                second = false,
                $this = $(this);

            $this.on({
                drop: function (event) {
                    first = second = false;
                    $this.trigger('dragster:drop', event);
                },
                dragenter: function (event) {
                    event.preventDefault();
                    if (first) {
                        second = true;
                        return;
                    } else {
                        first = true;
                        $this.trigger('dragster:enter', event);
                    }
                },
                dragleave: function (event) {
                    event.preventDefault();
                    if (second) {
                        second = false;
                    } else if (first) {
                        first = false;
                    }
                    if (!first && !second) {
                        $this.trigger('dragster:leave', event);
                    }
                },
                dragover: function(event) {
                    event.preventDefault();
                    $this.trigger('dragster:over', event);
                },
                'dragster:drop': function (dragsterEvent, event) {
                    dragsterEvent.stopPropagation();
                    settings.drop(dragsterEvent, event);
                },
                'dragster:enter': function (dragsterEvent, event) {
                    dragsterEvent.stopPropagation();
                    settings.enter(dragsterEvent, event);
                },
                'dragster:leave': function (dragsterEvent, event) {
                    dragsterEvent.stopPropagation();
                    settings.leave(dragsterEvent, event);
                },
                'dragster:over': function (dragsterEvent, event) {
                    dragsterEvent.stopPropagation();
                    settings.over(dragsterEvent, event);
                },
            });
        });
    };

    $.fn.dragsterOff = function () {
        return this.each(function () {
            $(this).off('drop dragenter dragleave dragover dragster:drop dragster:enter dragster:leave dragster:over');
        });
    };
})(jQuery);
