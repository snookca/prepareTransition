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

    // Checks if transitions are supported
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

    // gets the CSS & JS name of the 'transform' property, which can vary from browser to browser
    function getTransformName() {
        var st = window.getComputedStyle(document.body, null);

        var rtnObj = {
            css: null, js: null
        }
        
        if( st.getPropertyValue("transform") !== null ) {
            rtnObj.css = "transform";
            rtnObj.js = "transform";
            return rtnObj;
        }

        if( st.getPropertyValue("-webkit-transform") !== null ) {
            rtnObj.css = "-webkit-transform";
            rtnObj.js = "webkitTransform";
            return rtnObj;
        }

        if( st.getPropertyValue("-moz-transform") !== null )    {
            rtnObj.css = "-moz-transform";
            rtnObj.js = "MozTransform";
            return rtnObj;
        }
        
        if( st.getPropertyValue("-ms-transform") !== null ) {
            rtnObj.css = "-ms-transform";
            rtnObj.js = "msTransform";
            return rtnObj;
        }
        
        if( st.getPropertyValue("-o-transform") !== null ) {
            rtnObj.css = "-o-transform";
            rtnObj.js = "OTransform";
            return rtnObj;
        }
        
        return null;
    }

/**
 * @param property {string} optional - If passed transition end events will only look for events with this property type. This is useful when avoiding multiple transition events on the same element or it's children.
 */
$.fn.prepareTransition = function( property ){
    var hasTrans = supportsTransitions();

    if(property === "transform") property = getTransformName().css;

    return this.each(function(){
        var el = $(this);
        
        if( hasTrans ) {
            var evtFired = false;

            // Need to add MS events as well?

            // remove the transition class upon completion (don't ise $.one, incase multiple properties transitioning)
            el.on('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd', function(evt){

                // just triggers for one property type (if specified)
                if( property && evt.originalEvent.propertyName !== property ) return;

                // stops multiple events triggering
                if(!evtFired) {
                    evtFired = true;
                    el.removeClass('is-transitioning');

                    // Need to add MS events as well?
                    $(this).off('TransitionEnd webkitTransitionEnd transitionend oTransitionEnd');
                }
            });
        } else {
            el.addClass('hasnt-transition');
        }

        // Don't we need to add MS events as well?

        // check the various CSS properties to see if a duration has been set
        var cl = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"];
        var duration = 0;
        $.each(cl, function(idx, itm){
            duration || (duration = parseFloat( el.css( itm ) ));
        });

        // Should really add delay here as well, right?

        // if I have a duration then add the class
        if (duration != 0) {
            if( hasTrans ) el.addClass('is-transitioning');
            el[0].offsetWidth; // check offsetWidth to force the style rendering
        };
    });
};

}(jQuery));
