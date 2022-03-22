<?php
/**
 * Bento Accordion component integration.
 *
 * @package Gutenberg_Bento
 */

namespace Gutenberg_Bento;

/**
 * Class Accordion_Block_Type
 */
class Accordion_Block_Type {

	const BENTO_RUNTIME_SCRIPT_HANDLE   = 'bento-runtime';
	const BENTO_ACCORDION_SCRIPT_HANDLE = 'bento-accordion';
	const BENTO_ACCORDION_VERSION       = '1.0';
	const BLOCK_VIEW_STYLE_HANDLE       = 'gutenberg-bento-accordion-view-style';

	/**
	 * Calls the initialization function.
	 *
	 * @return void
	 */
	public function register() {
		$this->init_hooks();
	}

	/**
	 * Init hooks
	 */
	protected function init_hooks() {
		add_action( 'init', array( $this, 'register_bento_assets' ) );
		add_action( 'init', array( $this, 'register_block_type' ) );
		add_filter( 'wp_kses_allowed_html', array( $this, 'filter_kses_allowed_html' ) );
	}

	/**
	 * Registers the scripts and styles for Bento components.
	 *
	 * Note that 'amp-runtime' and 'bento-base-carousel' are scripts registered by the AMP plugin. The Bento versions aren't
	 * currently registered, so that is why this function needs to run currently on AMP pages.
	 *
	 * @return void
	 */
	public function register_bento_assets() {
		wp_register_script(
			self::BENTO_ACCORDION_SCRIPT_HANDLE,
			sprintf(
				'https://cdn.ampproject.org/v0/bento-accordion-%s.js',
				self::BENTO_ACCORDION_VERSION
			),
			array( self::BENTO_RUNTIME_SCRIPT_HANDLE ),
			null,
			true
		);

		// At the moment the AMP plugin does not register styles for Bento components, but this could change with <https://github.com/ampproject/amp-wp/pull/6353>.
		wp_register_style(
			self::BENTO_ACCORDION_SCRIPT_HANDLE,
			sprintf( 'https://cdn.ampproject.org/v0/bento-accordion-%s.css', self::BENTO_ACCORDION_VERSION ),
			array(),
			null,
			false
		);

		/**
		 * Filters whether to enqueue self-hosted Bento components instead of using the CDN.
		 *
		 * @param bool $self_host Whether to self-host. Default false.
		 */
		$self_host = (bool) apply_filters( 'gutenberg_bento_self_host', false );

		if ( $self_host ) {
			$web_component_asset_file = GUTENBERG_BENTO_BLOCKS_ABSPATH . 'build/self-hosting/bento-base-carousel.asset.php';
			$web_component_asset      = is_readable( $web_component_asset_file ) ? require $web_component_asset_file : array();
			$web_component_version    = isset( $web_component_asset['version'] ) ? $web_component_asset['version'] : false;

			$style = wp_styles()->query( self::BENTO_ACCORDION_SCRIPT_HANDLE );
			if ( $style ) {
				$style->src = GUTENBERG_BENTO_BLOCKS_ASSETSURL . 'self-hosting/bento-accordion.css';
				$style->ver = $web_component_version;
			}

			$script = wp_scripts()->query( self::BENTO_ACCORDION_SCRIPT_HANDLE );
			if ( $script ) {
				$script->src  = GUTENBERG_BENTO_BLOCKS_ASSETSURL . 'self-hosting/bento-accordion.js';
				$script->ver  = $web_component_version;
				$script->deps = array(); // bento.js runtime is not needed when self-hosting.
			}
		}
	}

	/**
	 * Registers the block type.
	 *
	 * @return void
	 */
	public function register_block_type() {
		$settings = array();
		if ( ! is_admin() && ! $this->is_amp() ) {
			wp_register_style( self::BLOCK_VIEW_STYLE_HANDLE, 'https://cdn.ampproject.org/v0/bento-accordion-1.0.css', array(), null, false );
			$settings['style'] = self::BLOCK_VIEW_STYLE_HANDLE;
		}

		$block = register_block_type(
			GUTENBERG_BENTO_BLOCKS_ABSPATH . '/build/accordion/block.json',
			$settings
		);

		$script = wp_scripts()->query( $block->view_script );
		if ( $script ) {
			$script->deps = array_merge( $script->deps, array( self::BENTO_RUNTIME_SCRIPT_HANDLE ) );
			$script->args = 1;
		}

		register_block_type(
			GUTENBERG_BENTO_BLOCKS_ABSPATH . 'build/accordion-section'
		);
	}

	/**
	 * Filter Kses-allowed HTML.
	 *
	 * Prevent custom element from being removed if user cannot do unfiltered_html.
	 *
	 * @param array $tags Tags.
	 * @return array Filtered tags.
	 */
	public function filter_kses_allowed_html( $tags ) {
		$tags['bento-accordion'] = array_merge(
			isset( $tags['bento-accordion'] ) ? $tags['bento-accordion'] : array(),
			array_fill_keys(
				array(
					'animate',
					'class',
					'id',
				),
				true
			)
		);
		return $tags;
	}

	/**
	 * Determines whether the current request is for an AMP document.
	 *
	 * @return bool Whether the current request is for an AMP document or not.
	 */
	public function is_amp() {
		return ( function_exists( 'amp_is_request' ) && amp_is_request() );
	}
}
