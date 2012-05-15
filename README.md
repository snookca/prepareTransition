# prepareTransition jQuery Plugin

This plugin helps you prepare a HTML element for a CSS transition to allow for changes in `display` and `visibility` properties.

## How it works

This works by overriding the `display` and `visiblity` problems with values of `block` and `visible` respectively by adding a class. Once the animation is complete, this class is then removed.

[See an example](http://oliverjash.github.com/prepareTransition/).

## Usage

Use the plugin before you trigger your CSS animation. The rest is magic.

    $('#transition').click(function () {
        $('.item').prepareTransition().toggleClass('hidden');
    });