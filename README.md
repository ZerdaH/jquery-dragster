Include [jquery.dragster.js](https://rawgithub.com/catmanjan/jquery-dragster/master/jquery.dragster.js) in page.

Works in IE.

```javascript
$('.element').dragster({
    drop: function (dragsterEvent, event) {
        // drop event behaves as usual,
        dropFileHandler(event);
    },
	enter: function (dragsterEvent, event) {
        // only triggers on the first "dragenter" event on the element,
        // even when dragging over children
		$(this).addClass('hover');
	},
	leave: function (dragsterEvent, event) {
        // only triggers on the last "dragleave" event on the element
		$(this).removeClass('hover');
	},
    over: function (dragsterEvent, event) {
        // dragover event behaves as usual, firing many times
    }
});

// later on you can unbind the events
$('.element').dragsterOff();
```