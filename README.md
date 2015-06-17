# prepareTransition jQuery Plugin

The prepareTransition plugin sets display and visibility to override any existing
display and visibility properties. This ensures that the element can still animate
without issue. For users who don't have support for CSS transitions, then the 
element will still work correctly. Once the transition is complete, the class name
is removed.

Example usage:

    $('#btn-test').bind('click', function(){
        $('.msg').prepareTransition().toggleClass('hidden');
    });

You can also choose to target a transition that is triggered by a parent class.

Example JS:

	$elementWithTransition.prepareTransition( $parentElementWithState );
	$parentElementWithState.toggleClass( "is-shown" );

Example CSS:
	
	.examplepanel {
	    opacity: 1;
	    transition: opacity 1s;
	    display: block;
	}

	.is-shown .examplepanel {
		opacity: 0;
		display: none;
	}

	.is-transitioning .examplepanel {
		display: block !important;
	}