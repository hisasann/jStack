(function($) {
/*
 * jStack jQuery Plugin version 1.0
 * http://lab.hisasann.com/jStack/
 *
 * Copyright (c) 2009 hisasann http://hisasann.com/
 * Dual licensed under the MIT and GPL licenses.
 */

var maxIndex = 10000,
	stack,
	targetId,
	options = {
		isClick: true,
		isRandom: true,
		durationOut: 500,
		durationIn: 500,
		easingOut: "swing",
		easingIn: "swing",
		moveLeft: 100,
		moveTop: 100,
		opacityOut: 0.8,
		opacityIn: 1,
		delay: 100,
		direction: "next",
		callback: function() {}
	};

$.fn.jStack = function(opts) {
	$.extend(options, opts);

	$(this).css('position', 'relative')

	stack = $.makeArray($(this).children());

	$(this).children()
		.each(function(index) {
			$(this)
				.css({
					position: "absolute",
					top: (options.isRandom ? getRandom(30) : 0) + "px",
					left: (options.isRandom ? getRandom(30) : 0) + "px",
					zIndex: maxIndex - index,
					display: "block"
				});
			if(options.isClick)
				$(stack[0]).bind("click", mover);
		});
	return stack;
};

$.jStack = function() {};
$.jStack.next = function() {
	swap("next");
	return false;
};

$.jStack.prev = function() {
	swap("prev");
	return false;
};

$.jStack.shuffle = function() {
	swap("shuffle");
	return false;
};

function mover() {
	swap(options.direction);
	return false;
}

function swap(direction) {
	var current = stack[0],
		next = stack[1],
		isShuffle = direction == "shuffle" ? true : false;

	switch(direction) {
		case "prev":
			$(current).unbind("click", mover);
			current = stack.pop();
			stack = arrayExtend([current], stack);
			next = stack[0];
			break;
		case "shuffle":
			$(current).unbind("click", mover);
			stack = arrayShuffle(stack);
			current = stack;
			next = stack[0];
			break;
		case "next":
		default:
			stack.shift();
			stack.push(current);
			$(current).unbind("click", mover);
			break;
	}
	
	if(options.isClick)
		$(next).bind("click", mover);

	if(isShuffle) {
		var i = $(current).length;
		(function() {
			var _this = $(current)[--i];
			if(i < 0) {
				jQuery.each(stack, function(index) {
					$(this).css("zIndex", maxIndex - index);
				});
				return;
			}

			var argCallee = arguments.callee;
			$(_this).animate({
					left: Math.sin(i) * options.moveLeft + "px",
					top: Math.cos(i) * options.moveTop + "px",
					opacity: options.opacityOut
				}, options.durationOut, options.easingOut, function() {
					var $this = $(this);
					setTimeout(function() {
						$this.animate({
							left: (options.isRandom ? getRandom(30) : 0) + "px",
							top: (options.isRandom ? getRandom(30) : 0) + "px",
							opacity: options.opacityIn
						}, options.durationIn, options.easingIn, function() {
							options.callback.call(this);
						});
					}, options.delay);
			});
			setTimeout(function() {
				argCallee();
			}, getRandom(13 * i));
		})();
	} else {
		$(current)
			.animate({
					left: "+=" + options.moveLeft + "px",
					top: "+=" + options.moveTop + "px",
					opacity: options.opacityOut
				}, options.durationOut, options.easingOut, function() {
					jQuery.each(stack, function(index) {
						$(this).css("zIndex", maxIndex - index);
					});

					var $this = $(this);
					setTimeout(function() {
						$this.animate({
							left: "-=" + options.moveLeft + "px",
							top: "-=" + options.moveTop + "px",
							opacity: options.opacityIn
						}, options.durationIn, options.easingIn, function() {
							options.callback.call(this);
						});
					}, options.delay);
			});
	}
}

function arrayExtend() {
	var target = arguments[0],
		options = arguments[1],
		i = 0;
		length = options.length;
	
	while(i < length) {
		target.push(options[i++]);
	}
	
	return target;
}

function arrayShuffle(list) {
	var i = list.length;

	while (--i) {
		var j = Math.floor(Math.random() * (i + 1));
		if (i == j) continue;
		var k = list[i];
		list[i] = list[j];
		list[j] = k;
	}
	return list;
}

function getRandom(rand) {
	return Math.floor(Math.random() * rand);
}
})(jQuery);
