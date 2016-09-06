var preloader = (function() {

	var
		_imgs = [],
		contentReady = $.Deferred();

	function init() {
		_countImages();
		_startPreloader();
	}

	function _countImages() {

		$.each($('*'), function() {
			var $this = $(this),
				background = $this.css('background-image'),
				img = $this.is('img');

			if (background != 'none') {

				var path = background.replace('url("', "").replace('")', "");
				path = path.replace('url(', "").replace(')', "");

				_imgs.push(path);
			}
			if (img) {
				path = '' + $this.attr('src');
				if ((path) && ($this.css('display') !== 'none')) {
					_imgs.push(path);
				}
			}
		});
	}

	function _startPreloader() {
		$('body').addClass('overflow-hidden');

		var loaded = 0;

		for (var i = 0; i < _imgs.length; i++) {
			var image = $('<img>', {
				attr: {
					src: _imgs[i]
				}
			});

			$(image).load(function() {
				loaded++;
				var percentLoaded = _countPercent(loaded, _imgs.length);
				_setPercent(percentLoaded);
			});

		}
	}

	function _countPercent(current, total) {
		return Math.ceil(current / total * 100);
	}

	function _setPercent(percent) {

		$('.preloader_text').text(percent);

		if (percent >= 100) {
			$('.preloader_container').delay(700).fadeOut(500);
			$('body').removeClass('overflow-hidden');
			_finishPreloader();
		}
	}

	function _finishPreloader() {
		contentReady.resolve();
	}

	return {
		init: init,
		contentReady: contentReady
	};

})();
