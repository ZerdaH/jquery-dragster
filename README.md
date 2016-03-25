Include [jquery.dragster.js](https://rawgithub.com/catmanjan/jquery-dragster/master/jquery.dragster.js) in page.

A version of [jquery-dragster](https://github.com/catmanjan/jquery-dragster) with slightly different event propagation behavior and an event listener remover.

```javascript
$('.element').dragster({
	drop: function (dragsterEvent, event) {
		$(this).removeClass('hover');
	}
	enter: function (dragsterEvent, event) {
		$(this).addClass('hover');
	},
	leave: function (dragsterEvent, event) {
		$(this).removeClass('hover');
	},
	over: function (dragsterEvent, event) {
		// 
	}
});

$('.element').dragsterOff() // remove all event listeners
```
