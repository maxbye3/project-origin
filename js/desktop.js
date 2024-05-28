
function loadApp() {

    $('#canvas').fadeIn(1000);

    var flipbook = $('.magazine');

    // Check if the CSS was already loaded

    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

    // Create the flipbook

    flipbook.turn({

        // Magazine width

        width: 922,

        // Magazine height

        height: 600,

        // Duration in millisecond

        duration: 1000,

        // Hardware acceleration

        acceleration: !isChrome(),

        // Enables gradients

        gradients: true,

        // Auto center this flipbook

        autoCenter: true,

        // Elevation from the edge of the flipbook when turning a page

        elevation: 50,

        // The number of pages

        pages: 16,

        // Events

        when: {
            turning: function (event, page, view) {

                switch (page) {
                    case 2:
                        document.body.style.backgroundImage = "url('pics/bg/2.png')";
                        break;
                    case 3:
                        document.body.style.backgroundImage = "url('pics/bg/3.png')";
                        break;
                    case 4:
                        document.body.style.backgroundImage = "url('pics/bg/4.png')";
                        break;
                    case 5:
                        document.body.style.backgroundImage = "url('pics/bg/5.png')";
                        break;
                    case 6:
                        document.body.style.backgroundImage = "url('pics/bg/6.png')";
                        break;
                    case 7:
                        document.body.style.backgroundImage = "url('pics/bg/7.png')";
                        break;
                    case 8:
                        document.body.style.backgroundImage = "url('pics/bg/8.png')";
                        break;
                    case 9:
                        document.body.style.backgroundImage = "url('pics/bg/9.png')";
                        break;
                    case 10:
                        document.body.style.backgroundImage = "url('pics/bg/10.png')";
                        break;
                    case 11:
                        document.body.style.backgroundImage = "url('pics/bg/11.png')";
                        break;
                    case 12:
                        document.body.style.backgroundImage = "url('pics/bg/12.png')";
                        break;
                    case 13:
                        document.body.style.backgroundImage = "url('pics/bg/13.png')";
                        break;
                    case 14:
                        document.body.style.backgroundImage = "url('pics/bg/14.png')";
                        break;
                    case 15:
                        document.body.style.backgroundImage = "url('pics/bg/15.png')";
                        break;
                    case 16:
                        document.body.style.backgroundImage = "url('pics/bg/16.png')";
                        break;
                    default:
                        document.body.style.backgroundImage = "url('pics/bg/1.png')";
                }

                var book = $(this),
                    currentPage = book.turn('page'),
                    pages = book.turn('pages');

                // Update the current URI

                Hash.go('page/' + page).update();

                // Show and hide navigation buttons

                disableControls(page);


                $('.thumbnails .page-' + currentPage).
                    parent().
                    removeClass('current');

                $('.thumbnails .page-' + page).
                    parent().
                    addClass('current');



            },

            turned: function (event, page, view) {

                console.log(page)

                disableControls(page);

                $(this).turn('center');

                if (page == 1) {
                    $(this).turn('peel', 'br');
                }

            },

            missing: function (event, pages) {

                // Add pages that aren't in the magazine

                for (var i = 0; i < pages.length; i++)
                    addPage(pages[i], $(this));

            }
        }

    });

    // Zoom.js

    $('.magazine-viewport').zoom({
        flipbook: $('.magazine'),

        max: function () {

            return largeMagazineWidth() / $('.magazine').width();

        },

        when: {

            swipeLeft: function () {

                $(this).zoom('flipbook').turn('next');

            },

            swipeRight: function () {

                $(this).zoom('flipbook').turn('previous');

            },

            resize: function (event, scale, page, pageElement) {

                if (scale == 1)
                    loadSmallPage(page, pageElement);
                else
                    loadLargePage(page, pageElement);

            },

            zoomIn: function () {

                $('.thumbnails').hide();
                $('.made').hide();
                $('.magazine').removeClass('animated').addClass('zoom-in');
                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

                if (!window.escTip && !$.isTouch) {
                    escTip = true;

                    $('<div />', { 'class': 'exit-message' }).
                        html('<div>Press ESC to exit</div>').
                        appendTo($('body')).
                        delay(2000).
                        animate({ opacity: 0 }, 500, function () {
                            $(this).remove();
                        });
                }
            },

            zoomOut: function () {

                $('.exit-message').hide();
                $('.thumbnails').fadeIn();
                $('.made').fadeIn();
                $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

                setTimeout(function () {
                    $('.magazine').addClass('animated').removeClass('zoom-in');
                    resizeViewport();
                }, 0);

            }
        }
    });

    // Zoom event

    if ($.isTouch)
        $('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
    else
        $('.magazine-viewport').bind('zoom.tap', zoomTo);


    // Using arrow keys to turn the page

    $(document).keydown(function (e) {

        var previous = 37, next = 39, esc = 27;

        switch (e.keyCode) {
            case previous:

                // left arrow
                $('.magazine').turn('previous');
                e.preventDefault();

                break;
            case next:

                //right arrow
                $('.magazine').turn('next');
                e.preventDefault();

                break;
            case esc:

                $('.magazine-viewport').zoom('zoomOut');
                e.preventDefault();

                break;
        }
    });

    // URIs - Format #/page/1 

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {
            var page = parts[1];

            if (page !== undefined) {
                if ($('.magazine').turn('is'))
                    $('.magazine').turn('page', page);
            }

        },
        nop: function (path) {

            if ($('.magazine').turn('is'))
                $('.magazine').turn('page', 1);
        }
    });


    $(window).resize(function () {
        resizeViewport();
    }).bind('orientationchange', function () {
        resizeViewport();
    });

    // Events for thumbnails

    $('.thumbnails').click(function (event) {

        var page;

        if (event.target && (page = /page-([0-9]+)/.exec($(event.target).attr('class')))) {

            $('.magazine').turn('page', page[1]);
        }
    });

    $('.thumbnails li').
        bind($.mouseEvents.over, function () {

            $(this).addClass('thumb-hover');

        }).bind($.mouseEvents.out, function () {

            $(this).removeClass('thumb-hover');

        });

    if ($.isTouch) {

        $('.thumbnails').
            addClass('thumbanils-touch').
            bind($.mouseEvents.move, function (event) {
                event.preventDefault();
            });

    } else {

        $('.thumbnails ul').mouseover(function () {

            $('.thumbnails').addClass('thumbnails-hover');

        }).mousedown(function () {

            return false;

        }).mouseout(function () {

            $('.thumbnails').removeClass('thumbnails-hover');

        });

    }


    // Regions

    if ($.isTouch) {
        $('.magazine').bind('touchstart', regionClick);
    } else {
        $('.magazine').click(regionClick);
    }

    // Events for the next button

    $('.next-button').bind($.mouseEvents.over, function () {

        $(this).addClass('next-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('next-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('next-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('next-button-down');

    }).click(function () {

        $('.magazine').turn('next');

    });

    // Events for the next button

    $('.previous-button').bind($.mouseEvents.over, function () {

        $(this).addClass('previous-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('previous-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('previous-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('previous-button-down');

    }).click(function () {

        $('.magazine').turn('previous');

    });


    resizeViewport();

    $('.magazine').addClass('animated');

}

// Zoom icon

$('.zoom-icon').bind('mouseover', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).addClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).addClass('zoom-icon-out-hover');

}).bind('mouseout', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).removeClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).removeClass('zoom-icon-out-hover');

}).bind('click', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $('.magazine-viewport').zoom('zoomIn');
    else if ($(this).hasClass('zoom-icon-out'))
        $('.magazine-viewport').zoom('zoomOut');

});

$('#canvas').hide();


// Load the HTML4 version if there's not CSS transform

yepnope({
    test: Modernizr.csstransforms,
    yep: ['js/turn.js'],
    nope: ['js/turn.html4.min.js'],
    both: ['js/zoom.min.js', 'js/magazine.js', 'css/magazine.css'],
    complete: loadApp
});
