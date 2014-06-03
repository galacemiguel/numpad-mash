var easy = localStorage.getItem('easy'), speed, sound = localStorage.getItem('sound'), start = false, time = 0, numTime = 0, keyPressed = false, score = 0, streak = 0, multiplier = 1, end = false, highScore = localStorage.getItem('highScore'), restart = false;

if (easy === 'true') {
	speed = 150;
} else {
	speed = 100;
}

if (highScore == null) {
	highScore = 0;
}
$('#best').html('<span style="font-family: GothamCondensed-Light; font-size: 72px">BEST </span>' + highScore);

var resetBars = function() {
	$('.bar').css('transition', 'height 0.1s')
	$('.bar.one').height('25px');
	$('.bar.two').height('40px');
	$('.bar.three').height('65px');
	$('.bar.four').height('100px');
	$('.bar.five').height('145px');
	$('.bar.six').height('200px');
	$('.bar.seven').height('260px');
}

var genRandInt = function() {
	if (start) {
		window.setTimeout(function() {
			if (!restart) {
				$('.bar').css({
					'height': '5px',
					'transition': 'height ' + speed/100 + 's'
				})
			}
		},100)
	}

	randInt = Math.floor(Math.random() * 9) + 1;
	$('#num-display').html(randInt);
}
genRandInt();

var numTimer = function() {
	window.setTimeout(function() {
		numTime++;
		if (numTime === 10) {
			numTime = 0;
			if (!keyPressed) {
				if (sound === 'true') {
					$('#wrong').trigger("play");
				}
				$('#num-display').addClass('wrong');
				window.setTimeout(function() {
					$('#num-display').removeClass('wrong');
				},400)

				streak = 0;
				$('#streak').html(streak);

				if (streak === 0) {
					multiplier = 1;
				}
				$('#multiplier').html(multiplier);

				if (score !== 0) {
					score -= 5;
					$('#score').html(score);
				}
				
				genRandInt();

				$('.bar').height()
				resetBars();
			}
			keyPressed = false;
		}
		if (!restart && !end) {
			numTimer();
		}
	},speed);
}

$(document).keydown(function(key) {
	$('#' + key.which).addClass('press');
});
$(document).keyup(function(key) {
	$('#' + key.which).removeClass('press');
});

$(document).keypress(function(key) {
	if (!end && key.which >= 49 && key.which <= 57) {
		if (!start) {
			var timer = function() {
				window.setTimeout(function() {
					if (!restart) {
						time++;
					}
					if (time === 15) {
						$('#semi-circle1').css('opacity', '1');
						$('#semi-circle2').css('z-index', '1');
					} else if (time === 30) {
						end = true;
						if (score > highScore) {
							highScore = score;
							localStorage.setItem('highScore', highScore);
							$('#best').html('<span style="font-family: GothamCondensed-Light; font-size: 72px">BEST </span>' + highScore);
						}

						$('#restart').css('opacity', '1');
					}

					if (!restart && !end && time !== 30) {
						timer();
					}
				},1000);
			}
			timer();

			$('#mask').css({
				'-webkit-animation': 'rotate 30s linear',
				'animation': 'rotate 30s linear'
			});
			$('#semi-circle1, #semi-circle2').css({
				'background': 'red',
				'-webkit-transition': 'background 30s linear',
				'transition': 'background 30s linear'
			});

			numTimer();
			restart = false;
			start = true;
		}
	if (String.fromCharCode(key.which) === $('#num-display').html()) {
			if (sound === 'true') {
				$('#right').trigger("play");
			}
			$('#num-display').addClass('right');
			window.setTimeout(function() {
				$('#num-display').removeClass('right');
			},400)

			streak++;
			$('#streak').html(streak);

			if (streak === 5) {
				multiplier = 2;
			} else if (streak === 10) {
				multiplier = 3;
			} else if (streak === 20) {
				multiplier = 4;
			}
			$('#multiplier').html(multiplier);

			score += 10 * multiplier;
			$('#score').html(score);

			resetBars();
		} else {
			if (sound === 'true') {
				$('#wrong').trigger("play");
			}
			$('#num-display').addClass('wrong');
			window.setTimeout(function() {
				$('#num-display').removeClass('wrong');
			},400)

			streak = 0;
			$('#streak').html(streak);

			if (streak === 0) {
				multiplier = 1;
			}
			$('#multiplier').html(multiplier);

			if (score !== 0) {
				score -= 5;
				$('#score').html(score);
			}

			resetBars();
		}

		keyPressed = true;
		if (keyPressed) {
			numTime = 0;
			keyPressed = false;
			genRandInt();
		}
	}
});

$('#numpad td').click(function() {
	jQuery.event.trigger({ type : 'keypress', which :($(this).html().charCodeAt(19))});
});

var restart = function() {
	$('#restart').css('opacity', '0');
	start = false, time = 0, numTime = 0, keyPressed = false, score = 0, streak = 0, multiplier = 1, end = false, restart = true;

	$('#streak').html(streak);
	$('#multiplier').html(multiplier);
	$('#score').html(score);

	$('#mask').css({
		'-webkit-animation': 'none',
		'animation': 'none'
	});
	$('#semi-circle1').css('opacity', '0');
	$('#semi-circle2').css('z-index', '0');
	$('#semi-circle1, #semi-circle2').css({
		'background': 'green',
		'-webkit-transition': 'none',
		'transition': 'none'
	});

	genRandInt();
	resetBars();
}
$('#restart').click(restart);
$(window).focusout(restart);