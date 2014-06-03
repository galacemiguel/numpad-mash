var play = false;
var highScore = localStorage.getItem('highScore')
if (highScore == null) {
	highScore = 0;
}
$('#best').html('BEST <span id="score">' + highScore + '</span>');

$('.button#play').click(function() {
	play = true;
	$('.content').css('visibility', 'hidden');
	$('.button').html('').css({
		'width': '0',
		'padding': '10px 0',
		'cursor': 'default',
		'-webkit-transition': 'width 1s, padding 1s',
		'transition': 'width 1s, padding 1s'
	})
	$('#cover').width('100%');
	$('.content#play').css({
		'visibility': 'visible',
		'opacity': '1',
		'-webkit-transition': 'width 1s',
		'transition': 'width 1s'
	})

	window.setTimeout(function() {
		window.location = "http://galacemiguel.github.io/numpad-mash/play"
	}, 1500)
});

$('.button').click(function() {
	if ($(this).prop('id') !== 'play') {
		$('.content').css({
			'visibility': 'hidden',
			'opacity': '0',
			'-webkit-transition': 'visibility 0s 0.5s, opacity 0.5s',
			'transition': 'visibility 0s 0.5s, opacity 0.5s'
		});
		$('.content#' + $(this).prop('id')).show().css({
			'visibility': 'visible',
			'opacity': '1',
			'-webkit-transition': 'opacity 0.5s',
			'transition': 'opacity 0.5s'
		});
	}
});

var sound = localStorage.getItem('sound');
if (sound === 'true') {
	$('#sound-on').addClass('active');
	$('#sound-off').removeClass('active');
} else if (sound === 'false') {
	$('#sound-off').addClass('active');
	$('#sound-on').removeClass('active');
} else {
	localStorage.setItem('sound', true);
}
var easy = localStorage.getItem('easy');
if (easy === 'true') {
	$('#easy-on').addClass('active');
	$('#easy-off').removeClass('active');
} else if (easy === 'false') {
	$('#easy-off').addClass('active');
	$('#easy-on').removeClass('active');
} else {
	localStorage.setItem('easy', true);
}

$('.toggle').click(function() {
	var setting = $(this).prop('id').split('-')[0];

	$('#' + setting + '-on').removeClass('active');
	$('#' + setting + '-off').removeClass('active');
	$(this).addClass('active');

	if ($('#' + setting + '-on').hasClass('active')) {
		localStorage.setItem(setting, true);
	} else {
		localStorage.setItem(setting, false);
	}
});
$('#sound-on').click(function() {
	$('#right').trigger("play");
})

$('.content').css('left', $('#sidebar').width());
$(window).resize(function() {
	if (!play) {
		$('.content').css('left', $('#sidebar').width());
	}
});