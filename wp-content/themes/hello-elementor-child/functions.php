<?php
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'hello-elementor-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [ 'hello-elementor-style' ],
        wp_get_theme()->get( 'Version' )
    );
} );

add_action( 'wp_head', function() {
    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => [ 'LocalBusiness', 'AutoRepair' ],
        '@id'         => 'https://anytime24hour.com/#business',
        'name'        => 'A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC',
        'description' => 'Mobile heavy-duty truck and trailer repair serving Metro Atlanta and Middle Georgia — tractor-trailers, box trucks, RVs, and buses. No passenger vehicles.',
        'telephone'   => '800-646-1307',
        'email'       => 'operations@anytime24hour.com',
        'url'         => 'https://anytime24hour.com',
        'foundingDate' => '1981',
        'openingHoursSpecification' => [
            [
                '@type'     => 'OpeningHoursSpecification',
                'dayOfWeek' => [
                    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                    'Friday', 'Saturday', 'Sunday',
                ],
                'opens'  => '00:00',
                'closes' => '23:59',
            ],
        ],
        'areaServed' => [
            [ '@type' => 'City', 'name' => 'Atlanta',      'addressRegion' => 'GA' ],
            [ '@type' => 'City', 'name' => 'College Park', 'addressRegion' => 'GA' ],
            [ '@type' => 'City', 'name' => 'Macon',        'addressRegion' => 'GA' ],
            [ '@type' => 'City', 'name' => 'Forsyth',      'addressRegion' => 'GA' ],
        ],
        'knowsAbout' => [
            'Heavy-duty truck repair',
            'Tractor-trailer repair',
            'Commercial truck DOT inspection',
            'Mobile truck repair Georgia',
            'Trailer repair',
            'Diesel engine repair',
        ],
    ];
    echo '<script type="application/ld+json">'
        . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT )
        . '</script>' . "\n";
} );
