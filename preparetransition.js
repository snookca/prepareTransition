/**
 * prepareTransition
 * jQuery Plugin for ensuring transitions with display: none or visibility: hidden are in the right state until the end of the transition
 *
 * Developed by Jonathan Snook (http://snook.ca/)
 * January 12, 2012
 *
 * Improved by Oliver Ash (http://twitter.com/OliverJAsh)
 * February 4, 2012
 *
 * Requires the following CSS:
 * .is-transitioning {
 *  	display: block !important;
 *  	visibility: visible !important;
 * }
 *
 * MIT license 
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function ($) {
	$.fn.prepareTransition = function () {
		var durationVendorPrefixes = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"];

		return this.each(function () {
			var $this = $(this),
				duration = 0;

			// Check the various CSS properties to see if a duration has been set
			$.each(durationVendorPrefixes, function (index, prefix) {
				duration = parseFloat($this.css(prefix)) || duration;
			});

			// If I have a duration then prepare transition
			if (duration !== 0) {
				$this
					.addClass('is-transitioning')
					.one('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd', function () {
						$this.removeClass('is-transitioning');
					})
					.width(); // Force the style rendering
			}
		});
	};
}(jQuery));