<?php
/**
 * Abstract Class to Build Blocks.
 *
 * @package Kadence Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Abstract class to register blocks, build CSS, and enqueue scripts.
 *
 * @category class
 */
class Kadence_Blocks_Abstract_Block {

	/**
	 * Block namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'kadence';

	/**
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * Block determines if style needs to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_style = true;

	/**
	 * Block determines if scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $has_script = false;

	/**
	 * Block determines if scripts need to be loaded for block.
	 *
	 * @var string
	 */
	protected $attributes_with_defaults = array();

	/**
	 * Class Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'on_init' ), 20 );
		add_filter( 'kadence_blocks_blocks_to_generate_post_css', array( $this, 'add_block_to_post_generate_css' ) );
	}

	/**
	 * On init startup register the block.
	 */
	public function on_init() {
		register_block_type(
			KADENCE_BLOCKS_PATH . 'dist/blocks/' . $this->block_name . '/block.json',
			array(
				'render_callback' => array( $this, 'render_css' ),
				'editor_script'   => 'kadence-blocks-' . $this->block_name,
				'editor_style'    => 'kadence-blocks-' . $this->block_name,
			)
		);
	}

	/**
	 * Add Class name to list of blocks to render in header.
	 *
	 * @param array $block_class_array the blocks that are registered to be rendered.
	 */
	public function add_block_to_post_generate_css( $block_class_array ) {
		if ( ! isset( $block_class_array[ $this->namespace . '/' . $this->block_name ] ) ) {
			$block_class_array[ $this->namespace . '/' . $this->block_name ] = 'Kadence_Blocks_' . str_replace( ' ', '_', ucwords( str_replace( '-', ' ', $this->block_name ) ) ) . '_Block';
		}

		return $block_class_array;
	}

	/**
	 * Check if block stylesheet should render inline.
	 *
	 * @param string $name the stylesheet name.
	 */
	public function should_render_inline_stylesheet( $name ) {
		if ( apply_filters( 'kadence_blocks_force_render_inline_stylesheet', false, $name ) || ( ! is_admin() && ! wp_style_is( $name, 'done' ) && ! is_feed() ) ) {
			if ( function_exists( 'wp_is_block_theme' ) ) {
				if ( ! doing_filter( 'the_content' ) && ! wp_is_block_theme() && 1 === did_action( 'wp_head' ) ) {
					wp_print_styles( $name );
				}
			} elseif ( ! doing_filter( 'the_content' ) && 1 === did_action( 'wp_head' ) ) {
				wp_print_styles( $name );
			}
		}
	}

	/**
	 * Check if block should render inline.
	 *
	 * @param string $name the blocks name.
	 * @param string $unique_id the blocks unique id.
	 */
	public function should_render_inline( $name, $unique_id ) {
		if ( ( doing_filter( 'the_content' ) && ! is_feed() ) || apply_filters( 'kadence_blocks_force_render_inline_css_in_content', false, $name, $unique_id ) || is_customize_preview() ) {
			return true;
		}

		return false;
	}

	/**
	 * Render Block CSS in Page Head.
	 *
	 * @param array $block the block data.
	 */
	public function output_head_data( $block ) {
		if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
			$attributes = $block['attrs'];
			if ( isset( $attributes['uniqueID'] ) ) {
				// Check and enqueue stylesheets and scripts if needed.
				$this->render_scripts( $attributes, false );

				$unique_id = $attributes['uniqueID'];
				$css_class = Kadence_Blocks_CSS::get_instance();
				if ( ! $css_class->has_styles( 'kb-' . $this->block_name . $unique_id ) && apply_filters( 'kadence_blocks_render_head_css', true, $this->block_name, $attributes ) ) {
					// Filter attributes for easier dynamic css.
					$attributes = apply_filters( 'kadence_blocks_' . $this->block_name . '_render_block_attributes', $attributes );
					$unique_id  = str_replace( '/', '-', $unique_id );
					$this->build_css( $attributes, $css_class, $unique_id, $unique_id );
				}
			}
		}
	}
	/**
	 * Render for block scripts block.
	 *
	 * @param array   $attributes the blocks attributes.
	 * @param boolean $inline true or false based on when called.
	 */
	public function render_scripts( $attributes, $inline = false ) {
		if ( $this->has_style ) {
			if ( ! wp_style_is( 'kadence-blocks-' . $this->block_name, 'enqueued' ) ) {
				$this->enqueue_style( 'kadence-blocks-' . $this->block_name );
				if ( $inline ) {
					$this->should_render_inline_stylesheet( 'kadence-blocks-' . $this->block_name );
				}
			}
		}
		if ( $this->has_script ) {
			if ( ! wp_script_is( 'kadence-blocks-' . $this->block_name, 'enqueued' ) ) {
				$this->enqueue_script( 'kadence-blocks-' . $this->block_name );
			}
		}
	}
	/**
	 * Render Block CSS
	 *
	 * @param array $attributes the blocks attribtues.
	 * @param string $content the blocks content.
	 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
	 */
	public function render_css( $attributes, $content, $block_instance ) {
		$this->render_scripts( $attributes, true );
		if ( isset( $attributes['uniqueID'] ) ) {
			$unique_id = $attributes['uniqueID'];
			$unique_id = str_replace( '/', '-', $unique_id );
			$unique_style_id = apply_filters( 'kadence_blocks_build_render_unique_id', $attributes['uniqueID'], $this->block_name, $attributes );
			$css_class = Kadence_Blocks_CSS::get_instance();

			// If filter didn't run in header (which would have enqueued the specific css id ) then filter attributes for easier dynamic css.
			$attributes = apply_filters( 'kadence_blocks_' . str_replace( '-', '_', $this->block_name ) . '_render_block_attributes', $attributes, $block_instance );

			$content   = $this->build_html( $attributes, $unique_id, $content, $block_instance );
			if ( ! $css_class->has_styles( 'kb-' . $this->block_name . $unique_style_id ) && ! is_feed() && apply_filters( 'kadence_blocks_render_inline_css', true, $this->block_name, $unique_id ) ) {
				$css        = $this->build_css( $attributes, $css_class, $unique_id, $unique_style_id );
				if ( ! empty( $css ) && ! wp_is_block_theme() ) {
					$content = '<style>' . $css . '</style>' . $content;
				}
			} elseif ( ! wp_is_block_theme() && ! $css_class->has_header_styles( 'kb-' . $this->block_name . $unique_style_id ) && ! is_feed() && apply_filters( 'kadence_blocks_render_inline_css', true, $this->block_name, $unique_id ) ) {
				// Some plugins run render block without outputing the content, this makes it so css can be rebuilt.
				$css        = $this->build_css( $attributes, $css_class, $unique_id, $unique_style_id );
				if ( ! empty( $css ) ) {
					$content = '<style>' . $css . '</style>' . $content;
				}
			}
		}

		return $content;
	}

	/**
	 * Builds CSS for block.
	 *
	 * @param array $attributes the blocks attributes.
	 * @param string $css the css class for blocks.
	 * @param string $unique_id the blocks attr ID.
	 * @param string $unique_style_id the blocks alternate ID for queries.
	 */
	public function build_css( $attributes, $css, $unique_id, $unique_style_id ) {
		return '';
	}

	/**
	 * Build HTML for dynamic blocks
	 *
	 * @param $attributes
	 * @param $unique_id
	 * @param $content
	 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
	 *
	 * @return mixed
	 */
	public function build_html( $attributes, $unique_id, $content, $block_instance ) {
		return $content;
	}

	/**
	 * Registers scripts and styles.
	 */
	public function register_scripts() {
		// If in the backend, bail out.
		if ( is_admin() ) {
			return;
		}
		if ( apply_filters( 'kadence_blocks_check_if_rest', false ) && kadence_blocks_is_rest() ) {
			return;
		}
		wp_register_style( 'kadence-blocks-' . $this->block_name, KADENCE_BLOCKS_URL . 'dist/style-blocks-' . $this->block_name . '.css', array(), KADENCE_BLOCKS_VERSION );
	}

	/**
	 * Registers and enqueue's script.
	 *
	 * @param string $handle the handle for the script.
	 */
	public function enqueue_script( $handle ) {
		if ( ! wp_script_is( $handle, 'registered' ) ) {
			$this->register_scripts();
		}
		wp_enqueue_script( $handle );
	}

	/**
	 * Registers and enqueue's styles.
	 *
	 * @param string $handle the handle for the script.
	 */
	public function enqueue_style( $handle ) {
		if ( ! wp_style_is( $handle, 'registered' ) ) {
			$this->register_scripts();
		}
		wp_enqueue_style( $handle );
	}


	/**
	 * Gets the HTML tag from the attributes.
	 * If the tag provided isn't allowed, return the default value.
	 *
	 * @param array $attributes Array of the blocks attributes.
	 * @param string $tag_key Offest on $attributes where the tag is set.
	 * @param string $default Default tag to use if $tag_key attribue is undefined or invalid.
	 * @param array $allowed_tags Array of allowed tags.
	 * @param string $level_key If defined, we'll assume heading tags are allowed.
	 *
	 * @return string
	 */
	public function get_html_tag( $attributes, $tag_key, $default, $allowed_tags = array(), $level_key = '' ) {

		if( !empty( $attributes[ $tag_key ] ) && in_array( $attributes[ $tag_key ], $allowed_tags ) ) {

			if( $attributes[ $tag_key ] === 'heading' ) {
				$level = !empty( $attributes[ $level_key ] ) ? $attributes[ $level_key ] : 2;
				return 'h' . $level;
			}

			return $attributes[ $tag_key ];
		}

		return $default;
	}



	/**
	 * Get this blocks attributes merged with defaults from the registration.
	 *
	 * @param int $unique_id The unique id.
	 * @return array
	 */
	public function get_attributes_with_defaults( $unique_id, $attributes, $block_name ) {
		global $wp_meta_keys;

		if ( ! empty( $this->attributes_with_defaults[ $unique_id ] ) ) {
			return $this->attributes_with_defaults[ $unique_id ];
		}

		$attributes_with_defaults = $this->merge_defaults( $attributes, $block_name );

		if ( $attributes_with_defaults ) {
			$this->attributes_with_defaults[ $unique_id ] = $attributes_with_defaults;
			return $this->attributes_with_defaults[ $unique_id ];
		}

		return [];
	}

	/**
	 * Merges in default values from the block registry to the meta attributes from the database.
	 *
	 * @param array $attributes The database attribtues.
	 * @return array
	 */
	public function merge_defaults( $attributes, $block_name ) {
		$registry = WP_Block_Type_Registry::get_instance()->get_registered( $block_name );
		$default_attributes = [];

		if ( $registry && property_exists( $registry, 'attributes' ) && ! empty( $registry->attributes ) ) {
			foreach ( $registry->attributes as $key => $value ) {
				if ( isset( $value['default'] ) ) {
					//handle types of attributes that are an array with a single object that actually contains the actual attributes
					if ( is_array( $value['default'] ) && count( $value['default'] ) == 1 && isset( $value['default'][0] ) ) {
						if ( isset( $attributes[ $key ] ) && is_array( $attributes[ $key ] ) && count( $attributes[ $key ] ) == 1 && isset( $attributes[ $key ][0] ) ) {
							$attributes[ $key ][0] = array_merge( $value['default'][0], $attributes[ $key ][0] );
						}
					}

					// standard case.
					$default_attributes[ $key ] = $value['default'];
				}
			}
		}

		return array_merge( $default_attributes, $attributes );
	}

	/**
	 * Get this blocks attributes merged with defaults from the registration for post type based blocks.
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	public function get_attributes_with_defaults_cpt( $post_id, $cpt_name, $meta_prefix  ) {

		if ( ! empty( $this->attributes_with_defaults[ $post_id ] ) ) {
			return $this->attributes_with_defaults[ $post_id ];
		}

		$post_meta = get_post_meta( $post_id );
		$attributes_with_defaults = [];
		if ( is_array( $post_meta ) ) {
			foreach ( $post_meta as $meta_key => $meta_value ) {
				if ( strpos( $meta_key, $meta_prefix ) === 0 && isset( $meta_value[0] ) ) {
					$attributes_with_defaults[ str_replace( $meta_prefix, '', $meta_key ) ] = maybe_unserialize( $meta_value[0] );
				}
			}
		}

		$attributes_with_defaults = $this->merge_defaults_cpt( $attributes_with_defaults, $cpt_name, $meta_prefix );

		if ( $attributes_with_defaults ) {
			$this->attributes_with_defaults[ $post_id ] = $attributes_with_defaults;
			return $this->attributes_with_defaults[ $post_id ];
		}

		return [];
	}


	/**
	 * Merges in default values from the cpt registration to the meta attributes from the database.
	 *
	 * @param array $attributes The database attribtues.
	 * @return array
	 */
	public function merge_defaults_cpt( $attributes, $cpt_name, $meta_prefix ) {
		$meta_keys = get_registered_meta_keys( 'post', $cpt_name );
		$default_attributes = [];

		foreach ( $meta_keys as $key => $value ) {
			if ( str_starts_with( $key, $meta_prefix ) && array_key_exists( 'default', $value ) ) {
				$attr_name = str_replace( $meta_prefix, '', $key );

				//handle types of attributes that are an array with a single object that actually contains the actual attributes
				if ( is_array( $value['default'] ) && count( $value['default'] ) == 1 && isset( $value['default'][0] ) ) {
					if ( isset( $attributes[ $attr_name ] ) && is_array( $attributes[ $attr_name ] ) && count( $attributes[ $attr_name ] ) == 1 && isset( $attributes[ $attr_name ][0] ) ) {
						$attributes[ $attr_name ][0] = array_merge( $value['default'][0], $attributes[ $attr_name ][0] );
					}
				}

				//standard case.
				$default_attributes[ $attr_name ] = $value['default'];
			}
		}

		return array_merge( $default_attributes, $attributes );
	}
}
