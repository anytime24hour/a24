<?php
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'hello-elementor-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [ 'hello-elementor-style' ],
        wp_get_theme()->get( 'Version' )
    );
} );
