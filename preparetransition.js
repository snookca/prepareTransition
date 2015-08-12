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

    function supportsTransitions() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition';

        if (typeof s[p] == 'string') { return true; }

        // Tests for vendor specific prop
        var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for (var i=0; i<v.length; i++) {
            if (typeof s[v[i] + p] == 'string') { return true; }
        }

        return false;
    }

/**
 * @param parentEl {jQuery Element} optional - If passed in the 'is-transitioning' class will be added/removed from here rather than the "this" element
 */
$.fn.prepareTransition = function( parentEl ){
    var hasTrans = supportsTransitions();

    return this.each(function(){
        var el = $(this);
        if( !parentEl ) parentEl = el;
        
        if( hasTrans ) {
            // remove the transition class upon completion
            el.one('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd', function(evt){
                parentEl.removeClass('is-transitioning');
            });
        } else {
            el.addClass('hasnt-transition');
        }

        // check the various CSS properties to see if a duration has been set
        var cl = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"];
        var duration = 0;
        $.each(cl, function(idx, itm){
            duration || (duration = parseFloat( el.css( itm ) ));
        });

        // if I have a duration then add the class
        if (duration != 0) {
            if( hasTrans ) parentEl.addClass('is-transitioning');
            el[0].offsetWidth; // check offsetWidth to force the style rendering
        };
    });
};

}(jQuery));
