(function($) {
	$.fn.imageGallery = function(options) {
		var settings = $.extend({
			animationType: 'fade',
			adaptiveHeight: false,
			imagesPerSlide: 1,
			spaceBetweenImages: 0,
			description: false,
			autoRun: false
		}, options);
		var gEl = $(this);
		var startX, startY;

		var bindIt = function(element) {
			var thisEl = $(element).get(0);
			thisEl.addEventListener('touchstart', touchGalleryStart, false);
			thisEl.addEventListener('touchmove', touchGalleryMove, false);
			thisEl.addEventListener('touchend', function() {
				touchGalleryEnd(event, thisEl);
			}, false);
		};
		var touchGalleryStart = function(e) {
			var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			startY = parseInt(touchobj.clientY);
		};
		var touchGalleryMove = function(e) {
			var touchobj = e.changedTouches[0]; // reference first touch point for this event
			var dist = parseInt(touchobj.clientX) - startX;
			var distY = parseInt(touchobj.clientY) - startY;
			if (Math.abs(distY) > Math.abs(dist)) {
				return;
			} else {
				e.preventDefault();
			}
		};
		var touchGalleryEnd = function(e, el) {
			var touchobj = e.changedTouches[0]; // reference first touch point for this event
			var $el = el;
			var dist = parseInt(touchobj.clientX) - startX;
			if (Math.abs(dist) > 40) {
				e.preventDefault();
				changeImage($el, ((dist > 0) ? "previous" : "next"));
			}
		};

		var setupGallery = function(gal) {
			var $g = $(gal);
			var $l = $g.find('.images-list') || null;

			if (settings.adaptiveHeight) {
				if (settings.imagesPerSlide > 1) {
					$l.css({
						'position': 'relative',
						'display': 'block',
						'width': '100%',
						'height': $l.find('li:first-child').height() + 'px',
						'overflow': 'hidden'
					}).find('li').each(function(index) {
						var i = index;
						$(this).addClass((i === 0 ? 'current' : ''))
							.css({
								'zIndex': (i === 0 ? 1 : 0),
								'opacity': (i === 0 ? 1 : 0)
							});
					});
				} else {
					$l.css({
							'position': 'relative',
							'display': 'block',
							'width': '100%',
							'height': $l.find('li:first-child').height() + 'px',
							'overflow': 'hidden'
						})
						.find('li').each(function(index) {
							var i = index;
							$(this).addClass((i === 0 ? 'current' : ''))
								.css({
									'width': '100%',
									'height': '100%',
									'position': 'absolute',
									'top': 0,
									'left': 0,
									'zIndex': (i === 0 ? 1 : 0),
									'opacity': (i === 0 ? 1 : 0)
								})
								.children('img')
								.css({
									'max-width': '100%',
									'display': 'block',
									'position': 'absolute',
									'top': 0,
									'left': '50%',
									'-webkit-transform': 'translateX(-50%)',
									'-moz-transform': 'translateX(-50%)',
									'-ms-transform': 'translateX(-50%)',
									'transform': 'translateX(-50%)'
								});
						});
				}
			}
			$l.animate({
				'opacity': 1
			}, 200).find('.current').animate({
				'opacity': 1
			}, 200);
			if (settings.description && typeof settings.description === 'object') {
				for (var key in settings.description) {
					$g.find('.' + key).html($l.find('.current').data(settings.description[key]));
				}
				$g.find('.gallery-description').animate({
					'opacity': 1
				}, 200);
			}
		};

		var changeImage = function(gal, dir) {
			var $g = $(gal);
			var $nav = $g.find('.gallery-nav');
			var $l = $g.find('.images-list') || null;
			var $c = $l.find('.current') || null;
			var d = dir;
			if ($l && $c) {
				switch (d) {
					case 'previous':
						if ($c.prev().length > 0) {
							$c.css('zIndex', 0).animate({
								'opacity': 0
							}, 200).removeClass('current').prev().css('zIndex', 1).animate({
								'opacity': 1
							}, 200).addClass('current');
							$nav.find('.current').removeClass('current').prev().addClass('current');
						} else {
							$c.css('zIndex', 0).animate({
								'opacity': 0
							}, 200).removeClass('current').siblings(':last').css('zIndex', 1).animate({
								'opacity': 1
							}, 200).addClass('current');
							$nav.find('.current').removeClass('current').siblings(':last').addClass('current');
						}
						break;
					case 'next':
						if ($c.next().length > 0) {
							$c.css('zIndex', 0).animate({
								'opacity': 0
							}, 200).removeClass('current').next().css('zIndex', 1).animate({
								'opacity': 1
							}, 200).addClass('current');
							$nav.find('.current').removeClass('current').next().addClass('current');
						} else {
							$c.css('zIndex', 0).animate({
								'opacity': 0
							}, 200).removeClass('current').siblings(':first').css('zIndex', 1).animate({
								'opacity': 1
							}, 200).addClass('current');
							$nav.find('.current').removeClass('current').siblings(':first').addClass('current');
						}
						break;
					default:
						//console.log(d);
						if ($c.index() != d) {
							//console.log($c.index());
							$c.css('zIndex', 0).animate({
								'opacity': 0
							}, 200).removeClass('current');
							$l.find('li:eq(' + d + ')').css('zIndex', 1).animate({
								'opacity': 1
							}, 200).addClass('current');
							$nav.find('.current').removeClass('current');
							$nav.find('li:eq(' + d + ')').addClass('current');
						}
						break;
				}
			}
			if (settings.adaptiveHeight) {
				if (settings.imagesPerSlide > 1) {
					$l.animate({
						'height': $l.find('.current').height() + 'px'
					}, 200);
				} else {
					$l.animate({
						'height': $l.find('.current').children('img').height() + 'px'
					}, 200);
				}
			}
			if (settings.description && typeof settings.description === 'object') {
				$g.find('.gallery-description').animate({
					'opacity': 0
				}, 200, function() {
					for (var key in settings.description) {
						$g.find('.' + key).html($l.find('.current').data(settings.description[key]));
					}
					$g.find('.gallery-description').animate({
						'opacity': 1
					}, 200);
				});
			}
		};

		$(gEl).each(function(index) {
			var $thisEl = $(this);
			var $nav = $(this).find('.gallery-nav');
			var $l = $(this).find('.images-list') || null;
			var firstImage = $thisEl.find('.images-list li:first-child img').get(0);
			bindIt($thisEl);
			if (!firstImage.complete) {
				$(firstImage).load(function() {
					setupGallery($thisEl);
				});
			} else {
				setupGallery($thisEl);
			}
			$thisEl.find('.prev').click(function() {
				changeImage($thisEl, 'previous');
			});
			$thisEl.find('.next').click(function() {
				changeImage($thisEl, 'next');
			});
			$nav.find('a').click(function(e) {
				e.preventDefault();
				changeImage($thisEl, $(this).parent('li').index());
			});
			if (settings.adaptiveHeight) {
				$(window).resize(function() {
					if (settings.imagesPerSlide > 1) {
						$l.css({
							'height': $l.find('.current').height() + 'px'
						});
					} else {
						$l.css({
							'height': $l.find('.current').children('img').height() + 'px'
						});
					}
				});
			}
		});
	};
}(jQuery));