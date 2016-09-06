var slider = (function() {

	//Arrays of images in each slider part
	var mainImages = $('.slider__main-img_container');
	var prevImages = $('.nextSlideImg');
	var nextImages = $('.prevSlideImg');

	// Control buttons
	var nextSlide = $('.slider__next');
	var prevSlide = $('.slider__prev');

	var currentSlide = 0;
	var anotherState = $.Deferred();

	function _animateSlide(imgArray, counter, positionTop, time, display) {
		imgArray.eq(counter).animate({
			display: display || 'block',
			top: positionTop
		}, time)
	}

	function _inc(counter, imagesArray) {
		counter++;
		return counter > imagesArray.length - 1 ? 0 : counter;
	}

	function _dec(counter, imagesArray) {
		counter--;
		return counter < 0 ? imagesArray.length - 1 : counter;
	}

	function mainSlider(count) {

		anotherState = $.Deferred();

		mainImages.eq(currentSlide).fadeOut(150);
		if(count === 'inc') {
			currentSlide = _inc(currentSlide, mainImages)
		} else if(count === 'dec') {
			currentSlide = _dec(currentSlide, mainImages)
		}

		mainImages.eq(currentSlide).delay(50).fadeIn(150, function() {
			anotherState.resolve();
		});
	}

	function ArrowSlider(images, counter) {
		this.counter = counter;
		this.images = images;
		this.time = 250;
	}

	ArrowSlider.prototype.render = function(direction, count) {

		// direction of current slide move
		if(direction === 'topBottom') {
			_animateSlide(this.images, this.counter, '+100%', this.time);
		}else if(direction === 'bottomTop') {
			_animateSlide(this.images, this.counter, '-100%', this.time);
		}

		if(count === 'inc') {
			this.counter = _inc(this.counter, this.images);
		}else if (count === 'dec')	{
			this.counter = _dec(this.counter, this.images);
		}

		// prev/next slide moved to starting position
		if(direction === 'topBottom') {
			_animateSlide(this.images, this.counter, '-100%', 0, 'none');
		}else if(direction === 'bottomTop') {
			_animateSlide(this.images, this.counter, '+100%', 0, 'none');
		}

		this.images.eq(this.counter).css('display', 'block');

		// prev/next slide becomes visible
		_animateSlide(this.images, this.counter, '0', this.time);
	};

	var prevSlider = new ArrowSlider(nextImages, 1);
	var nextSlider = new ArrowSlider(prevImages, (prevImages.length - 1));


	nextSlide.click(function() {
		$.when(mainSlider('inc'), nextSlider.render('bottomTop', 'inc'), prevSlider.render('topBottom', 'inc')).done(function () {
		});
	});
	prevSlide.click(function() {
		$.when(mainSlider('dec'), nextSlider.render('topBottom', 'dec'), prevSlider.render('bottomTop', 'dec')).done(function () {
		});
	});

	function init() {
		mainImages.fadeOut(0);
		mainImages.eq(0).fadeIn(0);

		prevImages.eq((prevImages.length - 1)).css('top', 0);
		nextImages.eq(1).css('top', 0);
	}

	return {
		init: init
	}
}());