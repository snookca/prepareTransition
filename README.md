# prepareTransition jQuery Plugin

The prepareTransition plugin sets display and visibility to override any existing display and visibility properties. This ensures that the element can still animate without issue. For users who don't have support for CSS transitions, then the element will still work correctly. Once the transition is complete, the class name is removed.

[See an example](http://oliverjash.github.com/prepareTransition/).

## Use

    $('#transition').click(function () {
        $('.item').prepareTransition().toggleClass('hidden');
    });