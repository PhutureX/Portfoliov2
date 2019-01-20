;(function ($) {
    'use strict';
  
    /* -------------------------------------------
        Common Variables
    ------------------------------------------- */
    var wn = {},
        $wn = $(window),
        $body = $('body');
    
    $(function () {
        /* -------------------------------------------
            Background image
        ------------------------------------------- */
        var $bgImg = $('[data-bg-img]');
        
        $bgImg.each(function () {
            var $t = $(this);
            
            $t.css('background-image', 'url('+ $t.data('bg-img') +')').removeAttr('data-bg-img').addClass('bg--img');
        });
        
        /* -------------------------------------------
            Background parallax
        ------------------------------------------- */
        var $parallaxBgImg = $('[data-parallax-bg-img]');
        
        $parallaxBgImg.each(function () {
            var $t = $(this);
            
            $t.parallax({ imageSrc: $t.data('parallax-bg-img') }).addClass('bg--img');
        });

        /* -------------------------------------------
            Animate scroll
        ------------------------------------------- */
        var $animateScrollLink = $('.AnimateScrollLink'),
            $animateScroll = $('.AnimateScroll'),
            animateScrolling = function () {
                var targetEl = $(this).attr('href');

                $(targetEl).animatescroll({
                    padding: 65,
                    easing: 'easeInOutExpo',
                    scrollSpeed: 1000
                });

                return false;
            };

        $animateScrollLink.on('click', animateScrolling);
        $animateScroll.on('click', 'a', animateScrolling);

        /* -------------------------------------------
            Header Area
        ------------------------------------------- */
        var $headerNav = $('#headerNav');

        $headerNav.find('.nav').on('click', 'a', function () {
            $headerNav.collapse('hide');
        });
    });

    /* -------------------------------------------
        Cache window scrolltop postition
    ------------------------------------------- */
    var cacheScrollTop = function () {
        wn.scrollTop = $wn.scrollTop();
    };
    
    /* -------------------------------------------
        Set scroll status to body
    ------------------------------------------- */
    var isBodyScrolled = function () {
        if ( wn.scrollTop > 1 ) {
            $body.addClass('scrolled');
        } else {
            $body.removeClass('scrolled');
        }
    };

    /* -------------------------------------------
        Gallery Filtering
    ------------------------------------------- */
    var galleryFiltering = function () {
        var $galleryItems = $('.gallery-items'),
            galleryItem = '.gallery-item',
            $galleryFilter = $('.gallery-filter-menu');

        if ( $galleryItems.length ) {
            $galleryItems.isotope({
                animationEngine: 'best-available',
                itemSelector: galleryItem
            });

            $galleryFilter.on('click', 'a', function () {
                var $t = $(this),
                    f = $t.attr('href'),
                    s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;

                $galleryItems.isotope({
                    filter: s
                });

                $t.parent('li').addClass('active').siblings().removeClass('active');

                return false;
            });

            $galleryItems.isotope('on', 'arrangeComplete', function () {
                // Recalculate parallax dimensions
                $wn.trigger('resize.px.parallax');
            });
        }
    };

    /* -------------------------------------------
        Posts Filtering
    ------------------------------------------- */
    var postsFiltering = function () {
            var $postItems = $('.post-items'),
                postItem = '.post-item',
                $postFilter = $('.posts-filter-menu');

            if ( $postItems.length ) {
                $postItems.isotope({
                    animationEngine: 'best-available',
                    masonry: {
                      columnWidth: 0
                    },
                    itemSelector: postItem
                });

                $postFilter.on('click', 'a', function () {
                    var $t = $(this),
                        f = $t.attr('href'),
                        s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;

                    $postItems.isotope({
                        filter: s
                    });

                    return false;
                });

                $postFilter.children('ul').niceScroll({
                    scrollspeed: 100,
                    touchbehavior: true,
                    cursoropacitymax: 0
                });

                $postItems.isotope('on', 'arrangeComplete', function () {
                    // Recalculate parallax dimensions
                    $wn.trigger('resize.px.parallax');
                });
            }
        },
        postsResizeFilter = function () {
            setTimeout(function () {
                postsFiltering();
            }, 800);
        };

    /* -------------------------------------------
        About progress bar
    ------------------------------------------- */
    var aboutProgressBars = function () {
        var $aboutProgressItems = $('.about--progress-items');

        $aboutProgressItems.find(".progress-bar").each(function () {
            var $t = $(this);

            $t.css('width', 0);

            $t.waypoint(function () {
                $t.css('width', $t.data('progress') + '%');
            }, {
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        });
    };

    /* -------------------------------------------
        Function Calls
    ------------------------------------------- */
    $wn
        .on('load scroll', cacheScrollTop)
        .on('load scroll', isBodyScrolled)
        .on('load', galleryFiltering)
        .on('load', postsFiltering)
        .on('resize', postsResizeFilter)
        .on('load resize', aboutProgressBars)

})(jQuery);
