<?php
/**
 * Plugin file.
 *
 * @package   Gutenberg_Bento
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/swissspidy/gutenberg-bento
 *
 * Plugin Name: Gutenberg&nbsp;❤️&nbsp;&nbsp;Bento
 * Plugin URI:  https://github.com/swissspidy/gutenberg-bento/
 * Description: An exploratory plugin for using <a href="https://amp.dev/documentation/guides-and-tutorials/start/bento_guide/">Bento components</a> in Gutenberg.
 * Version:     0.0.1
 * Author:      Pascal Birchler
 * Author URI:  https://pascalbirchler.com
 * License:     Apache License 2.0
 * License URI: https://www.apache.org/licenses/LICENSE-2.0
 * Text Domain: gutenberg-bento
 * Requires at least: 5.8
 * Requires PHP: 5.6
 */

// Define WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE.
if ( ! defined( 'GUTENBERG_BENTO_BLOCKS_PLUGIN_FILE' ) ) {
	define( 'GUTENBERG_BENTO_BLOCKS_PLUGIN_FILE', __FILE__ );
}

if ( ! defined( 'GUTENBERG_BENTO_BLOCKS_ABSPATH' ) ) {
	define( 'GUTENBERG_BENTO_BLOCKS_ABSPATH', trailingslashit( dirname( GUTENBERG_BENTO_BLOCKS_PLUGIN_FILE ) ) );
}

if ( ! defined( 'GUTENBERG_BENTO_BLOCKS_ASSETSURL' ) ) {
	define( 'GUTENBERG_BENTO_BLOCKS_ASSETSURL', esc_url( trailingslashit( plugins_url( '/build/', GUTENBERG_BENTO_BLOCKS_PLUGIN_FILE ) ) ) );
}

require_once __DIR__ . '/inc/class-blocks.php';
Gutenberg_Bento\Blocks::instance();
