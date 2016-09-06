var scrollArrow = (function() {

	function _setEventListeners() {

		$('.arrow-down-icon').on('click', function(e) {
			e.preventDefault();
			var height = $(window).innerHeight();
			$('body').animate({
				scrollTop: height
			}, 800);
		})
	}

	function init() {
		_setEventListeners();
	}

	return {
		init: init
	}

}());
