使い方
--

	var options = {
		isClickAnimation: true,
		isPositionRandom: true,
		durationOut: 300,
		durationIn: 200,
		easingOut: "easeInOutBack",
		easingIn: "easeOutBounce",
		moveLeft: 250,
		moveTop: 150,
		opacityOut: 0.6,
		opacityIn: 1,
		delay: 10,
		direction: "next",
		callback: function() {}
	};

	$(window).bind("load", function() {
		// jStack
		var jstack = $("#imageBox").jStack(options);
		$("#next").click(function() {
			jstack.next();
		});
		$("#prev").click(function() {
			jstack.prev();
		});
		$("#shuffle").click(function() {
			jstack.shuffle();
		});
	});
