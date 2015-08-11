/**
 *  prepareTransition
 *  jQuery Plugin for ensuring transitions with display:none or visibility:hidden
 *  are in the right state until the end of the transition
 *
 *  Developed by Jonathan Snook (http://snook.ca/)
 *  January 12, 2012
 *
 *  Requires the following CSS:
 *  .is-transitioning {
 *      display: block !important;
 *      visibility: visible !important;
 *  }
 *
 *  MIT license
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function($){

/**
 * @param parentEl {jQuery Element} optional - If passed in the 'is-transitioning' class will be added/removed from here rather than the "this" element
 */
$.fn.prepareTransition = function( parentEl ){
    return this.each(function(){
        var el = $(this);
        if( !parentEl ) parentEl = el;
        
        // remove the transition class upon completion
        el.one('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd', function(evt){
            parentEl.removeClass('is-transitioning');
        });

        // check the various CSS properties to see if a duration has been set
        var cl = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"];
        var duration = 0;
        $.each(cl, function(idx, itm){
            duration || (duration = parseFloat( el.css( itm ) ));
        });

        // if I have a duration then add the class
        if (duration != 0) {
            parentEl.addClass('is-transitioning');
            el[0].offsetWidth; // check offsetWidth to force the style rendering
        };
    });
};

}(jQuery));
