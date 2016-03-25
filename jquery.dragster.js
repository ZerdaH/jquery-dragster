(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
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
				drop: function (e) {
					first = second = false;
					$this.trigger('dragster:drop', e);
				},
				dragenter: function (e) {
					//Chad took this out so the console wasn't spammed
					// console.log("enter",first,second);
					e.preventDefault();
					if (first) {
						second = true;
						return;
					} else {
						first = true;
						$this.trigger('dragster:enter', e);
					}
				},
				dragleave: function (e) {
					//Chad took this out so the console wasn't spammed
					// console.log("leave",first,second);
					e.preventDefault();
					if (second) {
						second = false;
					} else if (first) {
						first = false;
					}
					if (!first && !second) {
						$this.trigger('dragster:leave', e);
					}
				},
				dragover: function (e) {
					e.preventDefault();
					$this.trigger('dragster:over', e);
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
}));
