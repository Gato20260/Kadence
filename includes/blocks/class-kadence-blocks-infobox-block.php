<?php
/**
 * Class to Build the Info Box Block.
 *
 * @package Kadence Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to Build the Info Box Block.
 *
 * @category class
 */
class Kadence_Blocks_Infobox_Block extends Kadence_Blocks_Abstract_Block {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = 'infobox';

	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Builds CSS for block.
	 *
	 * @param array $attributes the blocks attributes.
	 * @param string $css the css class for blocks.
	 * @param string $unique_id the blocks attr ID.
	 */
	public function build_css( $attributes, $css, $unique_id ) {

		$css->set_style_id( 'kb-' . $this->block_name . $unique_id );

		// Add media number font
		if ( isset( $attributes['mediaType'] ) && 'number' === $attributes['mediaType'] && isset( $attributes['mediaNumber'] ) && is_array( $attributes['mediaNumber'] ) && isset( $attributes['mediaNumber'][0] ) && is_array( $attributes['mediaNumber'][0] ) && isset( $attributes['mediaNumber'][0]['google'] ) && $attributes['mediaNumber'][0]['google'] && ( ! isset( $attributes['mediaNumber'][0]['loadGoogle'] ) || true === $attributes['mediaNumber'][0]['loadGoogle'] ) && isset( $attributes['mediaNumber'][0]['family'] ) ) {
			$number_font = $attributes['mediaNumber'][0];

			$font_family  = ( isset( $number_font['family'] ) ? $number_font['family'] : '' );
			$font_variant = ( isset( $number_font['variant'] ) ? $number_font['variant'] : '' );
			$font_subset  = ( isset( $number_font['subset'] ) ? $number_font['subset'] : '' );

			$css->maybe_add_google_font( $font_family, $font_variant, $font_subset );
		}

		// Add title font
		if ( isset( $attributes['titleFont'] ) && is_array( $attributes['titleFont'] ) && isset( $attributes['titleFont'][0] ) && is_array( $attributes['titleFont'][0] ) && isset( $attributes['titleFont'][0]['google'] ) && $attributes['titleFont'][0]['google'] && ( ! isset( $attributes['titleFont'][0]['loadGoogle'] ) || true === $attributes['titleFont'][0]['loadGoogle'] ) && isset( $attributes['titleFont'][0]['family'] ) ) {
			$title_font = $attributes['titleFont'][0];

			$font_family  = ( isset( $title_font['family'] ) ? $title_font['family'] : '' );
			$font_variant = ( isset( $title_font['variant'] ) ? $title_font['variant'] : '' );
			$font_subset  = ( isset( $title_font['subset'] ) ? $title_font['subset'] : '' );

			$css->maybe_add_google_font( $font_family, $font_variant, $font_subset );
		}

		// Add text font
		if ( isset( $attributes['textFont'] ) && is_array( $attributes['textFont'] ) && isset( $attributes['textFont'][0] ) && is_array( $attributes['textFont'][0] ) && isset( $attributes['textFont'][0]['google'] ) && $attributes['textFont'][0]['google'] && ( ! isset( $attributes['textFont'][0]['loadGoogle'] ) || true === $attributes['textFont'][0]['loadGoogle'] ) && isset( $attributes['textFont'][0]['family'] ) ) {
			$text_font = $attributes['textFont'][0];

			$font_family  = ( isset( $text_font['family'] ) ? $text_font['family'] : '' );
			$font_variant = ( isset( $text_font['variant'] ) ? $text_font['variant'] : '' );
			$font_subset  = ( isset( $text_font['subset'] ) ? $text_font['subset'] : '' );

			$css->maybe_add_google_font( $font_family, $font_variant, $font_subset );
		}

		// Add learn more font
		if ( isset( $attributes['displayLearnMore'] ) && $attributes['displayLearnMore'] && isset( $attributes['learnMoreStyles'] ) && is_array( $attributes['learnMoreStyles'] ) && isset( $attributes['learnMoreStyles'][0] ) && is_array( $attributes['learnMoreStyles'][0] ) && isset( $attributes['learnMoreStyles'][0]['google'] ) && $attributes['learnMoreStyles'][0]['google'] && ( ! isset( $attributes['learnMoreStyles'][0]['loadGoogle'] ) || true === $attributes['learnMoreStyles'][0]['loadGoogle'] ) && isset( $attributes['learnMoreStyles'][0]['family'] ) ) {
			$learn_more_font = $attributes['learnMoreStyles'][0];

			$font_family  = ( isset( $learn_more_font['family'] ) ? $learn_more_font['family'] : '' );
			$font_variant = ( isset( $learn_more_font['variant'] ) ? $learn_more_font['variant'] : '' );
			$font_subset  = ( isset( $learn_more_font['subset'] ) ? $learn_more_font['subset'] : '' );

			$css->maybe_add_google_font( $font_family, $font_variant, $font_subset );
		}

		// Style.
		if ( isset( $attributes['containerBorder'] ) || isset( $attributes['containerBackground'] ) || isset( $attributes['containerBackgroundOpacity'] ) || isset( $attributes['containerPadding'] ) || isset( $attributes['containerMargin'] ) || isset( $attributes['containerBorderRadius'] ) || isset( $attributes['containerBorderWidth'] ) || isset( $attributes['maxWidth'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap' );
			if ( isset( $attributes['containerBorder'] ) && ! empty( $attributes['containerBorder'] ) ) {
				$alpha = ( isset( $attributes['containerBorderOpacity'] ) && is_numeric( $attributes['containerBorderOpacity'] ) ? $attributes['containerBorderOpacity'] : 1 );
				$css->add_property( 'border-color', $css->render_color( $attributes['containerBorder'], $alpha ) );
			}
			if ( isset( $attributes['containerBorderRadius'] ) && ! empty( $attributes['containerBorderRadius'] ) ) {
				$css->add_property( 'border-radius', $attributes['containerBorderRadius'] . 'px' );
			}
			if ( isset( $attributes['containerBackground'] ) && ! empty( $attributes['containerBackground'] ) ) {
				$alpha = ( isset( $attributes['containerBackgroundOpacity'] ) && is_numeric( $attributes['containerBackgroundOpacity'] ) ? $attributes['containerBackgroundOpacity'] : 1 );
				$css->add_property( 'background', $css->render_color( $attributes['containerBackground'], $alpha ) );
			} elseif ( isset( $attributes['containerBackgroundOpacity'] ) && is_numeric( $attributes['containerBackgroundOpacity'] ) ) {
				$alpha = ( isset( $attributes['containerBackgroundOpacity'] ) && is_numeric( $attributes['containerBackgroundOpacity'] ) ? $attributes['containerBackgroundOpacity'] : 1 );
				$css->add_property( 'background', $css->render_color( '#f2f2f2', $alpha ) );
			}

			$css->render_measure_output( $attributes, 'containerPadding', 'padding', [ 'tablet_key' => 'containerTabletPadding', 'mobile_key' => 'containerMobilePadding' ] );

			$css->render_measure_output( $attributes, 'containerMargin', 'margin', [ 'unit_key' => 'containerMarginUnit' ] );

			if ( isset( $attributes['containerBorderWidth'] ) && is_array( $attributes['containerBorderWidth'] ) ) {
				if ( isset( $attributes['containerBorderWidth'][0] ) && is_numeric( $attributes['containerBorderWidth'][0] ) ) {
					$css->add_property( 'border-top-width', $attributes['containerBorderWidth'][0] . 'px' );
				}
				if ( isset( $attributes['containerBorderWidth'][1] ) && is_numeric( $attributes['containerBorderWidth'][1] ) ) {
					$css->add_property( 'border-right-width', $attributes['containerBorderWidth'][1] . 'px' );
				}
				if ( isset( $attributes['containerBorderWidth'][2] ) && is_numeric( $attributes['containerBorderWidth'][2] ) ) {
					$css->add_property( 'border-bottom-width', $attributes['containerBorderWidth'][2] . 'px' );
				}
				if ( isset( $attributes['containerBorderWidth'][3] ) && is_numeric( $attributes['containerBorderWidth'][3] ) ) {
					$css->add_property( 'border-left-width', $attributes['containerBorderWidth'][3] . 'px' );
				}
			}
			if ( isset( $attributes['maxWidth'] ) && ! empty( $attributes['maxWidth'] ) ) {
				$unit = ( isset( $attributes['maxWidthUnit'] ) && ! empty( $attributes['maxWidthUnit'] ) ? $attributes['maxWidthUnit'] : 'px' );
				$css->add_property( 'max-width', $attributes['maxWidth'] . $unit );
			}
		}

		$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover' );
		$border_hover = ( isset( $attributes['containerHoverBorder'] ) && ! empty( $attributes['containerHoverBorder'] ) ? $attributes['containerHoverBorder'] : '#eeeeee' );
		$alpha        = ( isset( $attributes['containerHoverBorderOpacity'] ) && is_numeric( $attributes['containerHoverBorderOpacity'] ) ? $attributes['containerHoverBorderOpacity'] : 1 );
		$bg_hover     = ( isset( $attributes['containerHoverBackground'] ) && ! empty( $attributes['containerHoverBackground'] ) ? $attributes['containerHoverBackground'] : '#f2f2f2' );
		$bg_alpha     = ( isset( $attributes['containerHoverBackgroundOpacity'] ) && is_numeric( $attributes['containerHoverBackgroundOpacity'] ) ? $attributes['containerHoverBackgroundOpacity'] : 1 );
		$css->add_property( 'border-color', $css->render_color( $border_hover, $alpha ) );
		$css->add_property( 'background', $css->render_color( $bg_hover, $bg_alpha ) );
		if ( isset( $attributes['mediaIcon'] ) && is_array( $attributes['mediaIcon'] ) && is_array( $attributes['mediaIcon'][0] ) ) {
			$media_icon = $attributes['mediaIcon'][0];
		} else {
			$media_icon = array();
		}
		if ( isset( $attributes['mediaStyle'] ) && is_array( $attributes['mediaStyle'] ) && is_array( $attributes['mediaStyle'][0] ) ) {
			$media_style = $attributes['mediaStyle'][0];
		} else {
			$media_style = array();
		}
		if ( isset( $attributes['mediaImage'] ) && is_array( $attributes['mediaImage'] ) && is_array( $attributes['mediaImage'][0] ) ) {
			$media_image = $attributes['mediaImage'][0];
		} else {
			$media_image = array();
		}
		if ( isset( $attributes['mediaNumber'] ) && is_array( $attributes['mediaNumber'] ) && is_array( $attributes['mediaNumber'][0] ) ) {
			$media_number = $attributes['mediaNumber'][0];
		} else {
			$media_number = array();
		}
		if ( isset( $attributes['mediaType'] ) && 'image' === $attributes['mediaType'] ) {
			if ( isset( $media_image['maxWidth'] ) && ! empty( $media_image['maxWidth'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kadence-info-box-image-inner-intrisic-container' );
				$css->add_property( 'max-width', $media_image['maxWidth'] . 'px' );
			}
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kadence-info-box-image-inner-intrisic-container .kadence-info-box-image-intrisic' );
			if ( isset( $attributes['imageRatio'] ) && ! empty( $attributes['imageRatio'] ) && 'inherit' !== $attributes['imageRatio'] ) {
				switch ( $attributes['imageRatio'] ) {
					case 'land43':
						$image_ratio_padding = '75%';
						break;
					case 'land32':
						$image_ratio_padding = '66.67%';
						break;
					case 'land169':
						$image_ratio_padding = '56.25%';
						break;
					case 'land21':
						$image_ratio_padding = '50%';
						break;
					case 'land31':
						$image_ratio_padding = '33%';
						break;
					case 'land41':
						$image_ratio_padding = '25%';
						break;
					case 'port34':
						$image_ratio_padding = '133.33%';
						break;
					case 'port23':
						$image_ratio_padding = '150%';
						break;
					default:
						$image_ratio_padding = '100%';
						break;
				}
				$css->add_property( 'padding-bottom', $image_ratio_padding );
			} elseif ( isset( $media_image['height'] ) && is_numeric( $media_image['height'] ) && isset( $media_image['width'] ) && is_numeric( $media_image['width'] ) ) {
				$css->add_property( 'padding-bottom', round( ( absint( $media_image['height'] ) / absint( $media_image['width'] ) ) * 100, 4 ) . '%' );
			}
			if ( isset( $media_image['width'] ) && ! empty( $media_image['width'] ) ) {
				$css->add_property( 'width', $media_image['width'] . 'px' );
			}
			if ( isset( $media_image['height'] ) && ! empty( $media_image['height'] ) ) {
				$css->add_property( 'height', '0px' );
			}
			$css->add_property( 'max-width', '100%' );
		}
		if ( isset( $media_image['subtype'] ) && 'svg+xml' === $media_image['subtype'] ) {
			if ( isset( $media_image['maxWidth'] ) && ! empty( $media_image['maxWidth'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media .kt-info-box-image' );
				$css->add_property( 'width', $media_image['maxWidth'] . 'px' );
				$css->add_property( 'height', 'auto' );
			}
			if ( isset( $media_icon['color'] ) && ! empty( $media_icon['color'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media .kt-info-box-image, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-media .kt-info-box-image path' );
				$css->add_property( 'fill', $media_icon['color'] );
			}
			if ( isset( $media_icon['hoverColor'] ) && ! empty( $media_icon['hoverColor'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media .kt-info-box-image, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media .kt-info-box-image path' );
				$css->add_property( 'fill', $media_icon['hoverColor'] );
			}
		}
		if ( isset( $media_icon['size'] ) && ! empty( $media_icon['size'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-info-svg-icon, #kt-info-box' . $unique_id . ' .kt-info-svg-icon-flip, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-number' );
			$css->add_property( 'font-size', $media_icon['size'] . 'px' );
		}
		if ( isset( $media_icon['tabletSize'] ) && is_numeric( $media_icon['tabletSize'] ) ) {
			$css->set_media_state( 'tablet' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-info-svg-icon, #kt-info-box' . $unique_id . ' .kt-info-svg-icon-flip, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-number' );
			$css->add_property( 'font-size', $media_icon['tabletSize'] . 'px' );
			$css->stop_media_query();
		}
		if ( isset( $media_icon['mobileSize'] ) && is_numeric( $media_icon['mobileSize'] ) ) {
			$css->set_media_state( 'mobile' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-info-svg-icon, #kt-info-box' . $unique_id . ' .kt-info-svg-icon-flip, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-number' );
			$css->add_property( 'font-size', $media_icon['mobileSize'] . 'px' );
			$css->stop_media_query();
		}
		if ( ( isset( $media_number['family'] ) && ! empty( $media_number['family'] ) ) || ( isset( $media_number['style'] ) && ! empty( $media_number['style'] ) ) || ( isset( $media_number['weight'] ) && ! empty( $media_number['weight'] ) ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-number' );
			if ( isset( $media_number['family'] ) && ! empty( $media_number['family'] ) ) {
				$css->add_property( 'font-family', $css->render_font_family( $media_number['family'] ) );
			}
			if ( isset( $media_number['style'] ) && ! empty( $media_number['style'] ) ) {
				$css->add_property( 'font-style', $media_number['style'] );
			}
			if ( isset( $media_number['weight'] ) && ! empty( $media_number['weight'] ) ) {
				$css->add_property( 'font-weight', $css->render_font_weight( $media_number['weight'] ) );
			}
		}
		$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media' );
		if ( isset( $media_icon['color'] ) && ! empty( $media_icon['color'] ) ) {
			$css->add_property( 'color', $css->render_color( $media_icon['color'] ) );
		}
		if ( isset( $media_style['background'] ) && ! empty( $media_style['background'] ) ) {
			$css->add_property( 'background', $css->render_color( $media_style['background'] ) );
		}
		if ( isset( $media_style['border'] ) && ! empty( $media_style['border'] ) ) {
			$css->add_property( 'border-color', $css->render_color( $media_style['border'] ) );
		}
		if ( isset( $media_style['borderRadius'] ) && ! empty( $media_style['borderRadius'] ) ) {
			$css->add_property( 'border-radius', $media_style['borderRadius'] . 'px' );
		}
		if ( isset( $media_style['borderWidth'] ) && is_array( $media_style['borderWidth'] ) ) {
			if ( isset( $media_style['borderWidth'][0] ) && is_numeric( $media_style['borderWidth'][0] ) ) {
				$css->add_property( 'border-top-width', $media_style['borderWidth'][0] . 'px' );
			}
			if ( isset( $media_style['borderWidth'][1] ) && is_numeric( $media_style['borderWidth'][1] ) ) {
				$css->add_property( 'border-right-width', $media_style['borderWidth'][1] . 'px' );
			}
			if ( isset( $media_style['borderWidth'][2] ) && is_numeric( $media_style['borderWidth'][2] ) ) {
				$css->add_property( 'border-bottom-width', $media_style['borderWidth'][2] . 'px' );
			}
			if ( isset( $media_style['borderWidth'][3] ) && is_numeric( $media_style['borderWidth'][3] ) ) {
				$css->add_property( 'border-left-width', $media_style['borderWidth'][3] . 'px' );
			}
		}
		if ( isset( $media_style['padding'] ) && is_array( $media_style['padding'] ) ) {
			if ( isset( $media_style['padding'][0] ) && is_numeric( $media_style['padding'][0] ) ) {
				$css->add_property( 'padding-top', $media_style['padding'][0] . 'px' );
			}
			if ( isset( $media_style['padding'][1] ) && is_numeric( $media_style['padding'][1] ) ) {
				$css->add_property( 'padding-right', $media_style['padding'][1] . 'px' );
			}
			if ( isset( $media_style['padding'][2] ) && is_numeric( $media_style['padding'][2] ) ) {
				$css->add_property( 'padding-bottom', $media_style['padding'][2] . 'px' );
			}
			if ( isset( $media_style['padding'][3] ) && is_numeric( $media_style['padding'][3] ) ) {
				$css->add_property( 'padding-left', $media_style['padding'][3] . 'px' );
			}
		}
		if ( isset( $media_style['margin'] ) && is_array( $media_style['margin'] ) && isset( $attributes['mediaAlign'] ) && 'top' !== $attributes['mediaAlign'] ) {
			if ( isset( $media_style['margin'][0] ) && is_numeric( $media_style['margin'][0] ) ) {
				$css->add_property( 'margin-top', $media_style['margin'][0] . 'px' );
			}
			if ( isset( $media_style['margin'][1] ) && is_numeric( $media_style['margin'][1] ) ) {
				$css->add_property( 'margin-right', $media_style['margin'][1] . 'px' );
			}
			if ( isset( $media_style['margin'][2] ) && is_numeric( $media_style['margin'][2] ) ) {
				$css->add_property( 'margin-bottom', $media_style['margin'][2] . 'px' );
			}
			if ( isset( $media_style['margin'][3] ) && is_numeric( $media_style['margin'][3] ) ) {
				$css->add_property( 'margin-left', $media_style['margin'][3] . 'px' );
			}
		}
		if ( isset( $media_style['margin'] ) && is_array( $media_style['margin'] ) && ( ! isset( $attributes['mediaAlign'] ) || 'top' === $attributes['mediaAlign'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media-container' );
			if ( isset( $media_style['margin'][0] ) && is_numeric( $media_style['margin'][0] ) ) {
				$css->add_property( 'margin-top', $media_style['margin'][0] . 'px' );
			}
			if ( isset( $media_style['margin'][1] ) && is_numeric( $media_style['margin'][1] ) ) {
				$css->add_property( 'margin-right', $media_style['margin'][1] . 'px' );
			}
			if ( isset( $media_style['margin'][2] ) && is_numeric( $media_style['margin'][2] ) ) {
				$css->add_property( 'margin-bottom', $media_style['margin'][2] . 'px' );
			}
			if ( isset( $media_style['margin'][3] ) && is_numeric( $media_style['margin'][3] ) ) {
				$css->add_property( 'margin-left', $media_style['margin'][3] . 'px' );
			}
		}
		if ( isset( $media_style['borderRadius'] ) && ! empty( $media_style['borderRadius'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media .kadence-info-box-image-intrisic:not(.kb-info-box-image-ratio) img' );
			$css->add_property( 'border-radius', $media_style['borderRadius'] . 'px' );
		}
		$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media' );
		if ( isset( $media_icon['hoverColor'] ) && ! empty( $media_icon['hoverColor'] ) ) {
			$css->add_property( 'color', $css->render_color( $media_icon['hoverColor'] ) );
		}
		if ( isset( $media_style['hoverBackground'] ) && ! empty( $media_style['hoverBackground'] ) ) {
			$css->add_property( 'background', $css->render_color( $media_style['hoverBackground'] ) );
		}
		if ( isset( $media_style['hoverBorder'] ) && ! empty( $media_style['hoverBorder'] ) ) {
			$css->add_property( 'border-color', $css->render_color( $media_style['hoverBorder'] ) );
		}
		if ( ( ( isset( $attributes['mediaType'] ) && 'icon' === $attributes['mediaType'] || ! isset( $attributes['mediaType'] ) ) && isset( $media_icon['hoverAnimation'] ) && 'drawborder' === $media_icon['hoverAnimation'] ) || ( isset( $attributes['mediaType'] ) && 'number' === $attributes['mediaType'] && isset( $media_number['hoverAnimation'] ) && 'drawborder' === $media_number['hoverAnimation'] ) || ( isset( $attributes['mediaType'] ) && 'image' === $attributes['mediaType'] && isset( $media_image['hoverAnimation'] ) && ( 'drawborder' === $media_image['hoverAnimation'] || 'grayscale-border-draw' === $media_image['hoverAnimation'] ) ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media' );
			$css->add_property( 'border-width', '0px' );
			if ( isset( $media_style['borderWidth'] ) && is_array( $media_style['borderWidth'] ) ) {
				$css->add_property( 'box-shadow', 'inset 0 0 0 ' . $media_style['borderWidth'][0] . 'px ' . ( isset( $media_style['border'] ) && ! empty( $media_style['border'] ) ? $media_style['border'] : '#444444' ) );
			}
			if ( isset( $media_style['borderRadius'] ) && ! empty( $media_style['borderRadius'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media:before, #kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media:after' );
				$css->add_property( 'border-radius', $media_style['borderRadius'] . 'px' );
			}
			if ( isset( $media_style['borderWidth'] ) && is_array( $media_style['borderWidth'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media:before' );
				$css->add_property( 'border-width', $media_style['borderWidth'][0] . 'px' );
			}
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media:after' );
			$css->set_selector( 'border-width', '0px' );
			if ( isset( $media_style['borderWidth'] ) && is_array( $media_style['borderWidth'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media:after' );
				$css->add_property( 'border-right-color', ( isset( $media_style['hoverBorder'] ) && ! empty( $media_style['hoverBorder'] ) ? $css->render_color( $media_style['hoverBorder'] ) : '#444444' ) );
				$css->add_property( 'border-right-width', $media_style['borderWidth'][0] . 'px' );
				$css->add_property( 'border-top-width', $media_style['borderWidth'][0] . 'px' );
				$css->add_property( 'border-bottom-width', $media_style['borderWidth'][0] . 'px' );
			}
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-media:before' );
			$css->add_property( 'border-top-color', ( isset( $media_style['hoverBorder'] ) && ! empty( $media_style['hoverBorder'] ) ? $css->render_color( $media_style['hoverBorder'] ) : '#444444' ) );
			$css->add_property( 'border-right-color', ( isset( $media_style['hoverBorder'] ) && ! empty( $media_style['hoverBorder'] ) ? $css->render_color( $media_style['hoverBorder'] ) : '#444444' ) );
			$css->add_property( 'border-bottom-color', ( isset( $media_style['hoverBorder'] ) && ! empty( $media_style['hoverBorder'] ) ? $css->render_color( $media_style['hoverBorder'] ) : '#444444' ) );
		}
		if ( isset( $attributes['titleColor'] ) || isset( $attributes['titleFont'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
			if ( isset( $attributes['titleColor'] ) && ! empty( $attributes['titleColor'] ) ) {
				$css->add_property( 'color', $css->render_color( $attributes['titleColor'] ) );
			}
			if ( isset( $attributes['titleFont'] ) && is_array( $attributes['titleFont'] ) && is_array( $attributes['titleFont'][0] ) ) {
				$title_font = $attributes['titleFont'][0];
				if ( isset( $title_font['size'] ) && is_array( $title_font['size'] ) && ! empty( $title_font['size'][0] ) ) {
					$css->add_property( 'font-size', $title_font['size'][0] . ( ! isset( $title_font['sizeType'] ) ? 'px' : $title_font['sizeType'] ) );
				}
				if ( isset( $title_font['lineHeight'] ) && is_array( $title_font['lineHeight'] ) && ! empty( $title_font['lineHeight'][0] ) ) {
					$css->add_property( 'line-height', $title_font['lineHeight'][0] . ( ! isset( $title_font['lineType'] ) ? 'px' : $title_font['lineType'] ) );
				}
				if ( isset( $title_font['letterSpacing'] ) && ! empty( $title_font['letterSpacing'] ) ) {
					$css->add_property( 'letter-spacing', $title_font['letterSpacing'] . 'px' );
				}
				if ( isset( $title_font['textTransform'] ) && ! empty( $title_font['textTransform'] ) ) {
					$css->add_property( 'text-transform', $title_font['textTransform'] );
				}
				if ( isset( $title_font['family'] ) && ! empty( $title_font['family'] ) ) {
					$css->add_property( 'font-family', $css->render_font_family( $title_font['family'] ) );
				}
				if ( isset( $title_font['style'] ) && ! empty( $title_font['style'] ) ) {
					$css->add_property( 'font-style', $title_font['style'] );
				}
				if ( isset( $title_font['weight'] ) && ! empty( $title_font['weight'] ) ) {
					$css->add_property( 'font-weight', $css->render_font_weight( $title_font['weight'] ) );
				}
				if ( isset( $title_font['padding'] ) && is_array( $title_font['padding'] ) ) {
					if ( isset( $title_font['padding'][0] ) && is_numeric( $title_font['padding'][0] ) ) {
						$css->add_property( 'padding-top', $title_font['padding'][0] . 'px' );
					}
					if ( isset( $title_font['padding'][1] ) && is_numeric( $title_font['padding'][1] ) ) {
						$css->add_property( 'padding-right', $title_font['padding'][1] . 'px' );
					}
					if ( isset( $title_font['padding'][2] ) && is_numeric( $title_font['padding'][2] ) ) {
						$css->add_property( 'padding-bottom', $title_font['padding'][2] . 'px' );
					}
					if ( isset( $title_font['padding'][3] ) && is_numeric( $title_font['padding'][3] ) ) {
						$css->add_property( 'padding-left', $title_font['padding'][3] . 'px' );
					}
				}
				if ( isset( $title_font['margin'] ) && is_array( $title_font['margin'] ) ) {
					if ( isset( $title_font['margin'][0] ) && is_numeric( $title_font['margin'][0] ) ) {
						$css->add_property( 'margin-top', $title_font['margin'][0] . 'px' );
					}
					if ( isset( $title_font['margin'][1] ) && is_numeric( $title_font['margin'][1] ) ) {
						$css->add_property( 'margin-right', $title_font['margin'][1] . 'px' );
					}
					if ( isset( $title_font['margin'][2] ) && is_numeric( $title_font['margin'][2] ) ) {
						$css->add_property( 'margin-bottom', $title_font['margin'][2] . 'px' );
					}
					if ( isset( $title_font['margin'][3] ) && is_numeric( $title_font['margin'][3] ) ) {
						$css->add_property( 'margin-left', $title_font['margin'][3] . 'px' );
					}
				}
			}
		}
		if ( isset( $attributes['titleHoverColor'] ) && ! empty( $attributes['titleHoverColor'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-title' );
			$css->add_property( 'color', $css->render_color( $attributes['titleHoverColor'] ) );
		}
		if ( isset( $attributes['titleFont'] ) && is_array( $attributes['titleFont'] ) && isset( $attributes['titleFont'][0] ) && is_array( $attributes['titleFont'][0] ) && ( ( isset( $attributes['titleFont'][0]['size'] ) && is_array( $attributes['titleFont'][0]['size'] ) && isset( $attributes['titleFont'][0]['size'][1] ) && ! empty( $attributes['titleFont'][0]['size'][1] ) ) || ( isset( $attributes['titleFont'][0]['lineHeight'] ) && is_array( $attributes['titleFont'][0]['lineHeight'] ) && isset( $attributes['titleFont'][0]['lineHeight'][1] ) && ! empty( $attributes['titleFont'][0]['lineHeight'][1] ) ) ) ) {
			$css->set_media_state( 'tablet' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
			if ( isset( $attributes['titleFont'][0]['size'][1] ) && ! empty( $attributes['titleFont'][0]['size'][1] ) ) {
				$css->add_property( 'font-size', $attributes['titleFont'][0]['size'][1] . ( ! isset( $attributes['titleFont'][0]['sizeType'] ) ? 'px' : $attributes['titleFont'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['titleFont'][0]['lineHeight'][1] ) && ! empty( $attributes['titleFont'][0]['lineHeight'][1] ) ) {
				$css->add_property( 'line-height', $attributes['titleFont'][0]['lineHeight'][1] . ( ! isset( $attributes['titleFont'][0]['lineType'] ) ? 'px' : $attributes['titleFont'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['titleFont'] ) && is_array( $attributes['titleFont'] ) && isset( $attributes['titleFont'][0] ) && is_array( $attributes['titleFont'][0] ) && ( ( isset( $attributes['titleFont'][0]['size'] ) && is_array( $attributes['titleFont'][0]['size'] ) && isset( $attributes['titleFont'][0]['size'][2] ) && ! empty( $attributes['titleFont'][0]['size'][2] ) ) || ( isset( $attributes['titleFont'][0]['lineHeight'] ) && is_array( $attributes['titleFont'][0]['lineHeight'] ) && isset( $attributes['titleFont'][0]['lineHeight'][2] ) && ! empty( $attributes['titleFont'][0]['lineHeight'][2] ) ) ) ) {
			$css->set_media_state( 'mobile' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
			if ( isset( $attributes['titleFont'][0]['size'][2] ) && ! empty( $attributes['titleFont'][0]['size'][2] ) ) {
				$css->add_property( 'font-size', $attributes['titleFont'][0]['size'][2] . ( ! isset( $attributes['titleFont'][0]['sizeType'] ) ? 'px' : $attributes['titleFont'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['titleFont'][0]['lineHeight'][2] ) && ! empty( $attributes['titleFont'][0]['lineHeight'][2] ) ) {
				$css->add_property( 'line-height', $attributes['titleFont'][0]['lineHeight'][2] . ( ! isset( $attributes['titleFont'][0]['lineType'] ) ? 'px' : $attributes['titleFont'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['titleMinHeight'] ) && is_array( $attributes['titleMinHeight'] ) && isset( $attributes['titleMinHeight'][0] ) ) {
			if ( is_numeric( $attributes['titleMinHeight'][0] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
				$css->add_property( 'min-height', $attributes['titleMinHeight'][0] . 'px' );
			}
			if ( isset( $attributes['titleMinHeight'][1] ) && is_numeric( $attributes['titleMinHeight'][1] ) ) {
				$css->set_media_state( 'tablet' );
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
				$css->add_property( 'min-height', $attributes['titleMinHeight'][1] . 'px' );
				$css->stop_media_query();
			}
			if ( isset( $attributes['titleMinHeight'][2] ) && is_numeric( $attributes['titleMinHeight'][2] ) ) {
				$css->set_media_state( 'mobile' );
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-title' );
				$css->add_property( 'min-height', $attributes['titleMinHeight'][2] . 'px' );
				$css->stop_media_query();
			}
		}
		if ( isset( $attributes['mediaAlignTablet'] ) && ! empty( $attributes['mediaAlignTablet'] ) ) {
			if ( 'top' === $attributes['mediaAlignTablet'] ) {
				$display = 'block';
				$align   = '';
				$content = '';
			} elseif ( 'left' === $attributes['mediaAlignTablet'] ) {
				$display = 'flex';
				$align   = 'center';
				$content = 'flex-start';
			} else {
				$display = 'flex';
				$align   = 'center';
				$content = 'flex-end';
			}
			$css->set_media_state( 'tablet' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap' );
			$css->add_property( 'display', $display );
			if ( ! empty( $align ) ) {
				$css->add_property( 'align-items', $align );
			}
			if ( ! empty( $content ) ) {
				$css->add_property( 'justify-content', $content );
			}
			if ( 'top' === $attributes['mediaAlignTablet'] ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media' );
				$css->add_property( 'display', 'inline-block' );
				$css->add_property( 'max-width', '100%' );
			} else {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media' );
				$css->add_property( 'display', 'block' );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['mediaAlignMobile'] ) && ! empty( $attributes['mediaAlignMobile'] ) ) {
			if ( 'top' === $attributes['mediaAlignMobile'] ) {
				$display = 'block';
				$content = '';
			} elseif ( 'left' === $attributes['mediaAlignMobile'] ) {
				$display   = 'flex';
				$content   = 'flex-start';
				$direction = 'row';
			} else {
				$display   = 'flex';
				$content   = 'flex-end';
				$direction = 'row-reverse';
			}
			$css->set_media_state( 'mobile' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap' );
			$css->add_property( 'display', $display );
			if ( ! empty( $content ) ) {
				$css->add_property( 'justify-content', $content );
			}
			if ( ! empty( $direction ) ) {
				$css->add_property( 'flex-direction', $direction );
			}
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap .kt-blocks-info-box-media' );
			$css->add_property( 'display', 'inline-block' );
			$css->add_property( 'max-width', '100%' );
			// $css .= '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-media-align-left.kt-blocks-info-box-link-wrap .kt-blocks-info-box-media {';
			// $css .= 'display: block;';
			// $css .= '}';
			// .kt-blocks-info-box-media-container {
			// 	width: 100%;
			// }
			$css->stop_media_query();
		}
		if ( isset( $attributes['textColor'] ) || isset( $attributes['textFont'] ) || isset( $attributes['textSpacing'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
			if ( isset( $attributes['textColor'] ) && ! empty( $attributes['textColor'] ) ) {
				$css->add_property( 'color', $css->render_color( $attributes['textColor'] ) );
			}
			if ( isset( $attributes['textFont'] ) && is_array( $attributes['textFont'] ) && is_array( $attributes['textFont'][0] ) ) {
				$text_font = $attributes['textFont'][0];
				if ( isset( $text_font['size'] ) && is_array( $text_font['size'] ) && ! empty( $text_font['size'][0] ) ) {
					$css->add_property( 'font-size', $text_font['size'][0] . ( ! isset( $text_font['sizeType'] ) ? 'px' : $text_font['sizeType'] ) );
				}
				if ( isset( $text_font['lineHeight'] ) && is_array( $text_font['lineHeight'] ) && ! empty( $text_font['lineHeight'][0] ) ) {
					$css->add_property( 'line-height', $text_font['lineHeight'][0] . ( ! isset( $text_font['lineType'] ) ? 'px' : $text_font['lineType'] ) );
				}
				if ( isset( $text_font['letterSpacing'] ) && ! empty( $text_font['letterSpacing'] ) ) {
					$css->add_property( 'letter-spacing', $text_font['letterSpacing'] . 'px' );
				}
				if ( isset( $text_font['textTransform'] ) && ! empty( $text_font['textTransform'] ) ) {
					$css->add_property( 'text-transform', $text_font['textTransform'] );
				}
				if ( isset( $text_font['family'] ) && ! empty( $text_font['family'] ) ) {
					$css->add_property( 'font-family', $css->render_font_family( $text_font['family'] ) );
				}
				if ( isset( $text_font['style'] ) && ! empty( $text_font['style'] ) ) {
					$css->add_property( 'font-style', $text_font['style'] );
				}
				if ( isset( $text_font['weight'] ) && ! empty( $text_font['weight'] ) ) {
					$css->add_property( 'font-weight', $css->render_font_weight( $text_font['weight'] ) );
				}
			}
			if ( isset( $attributes['textSpacing'] ) && is_array( $attributes['textSpacing'] ) && is_array( $attributes['textSpacing'][0] ) ) {
				$text_spacing = $attributes['textSpacing'][0];
				if ( isset( $text_spacing['padding'] ) && is_array( $text_spacing['padding'] ) ) {
					if ( isset( $text_spacing['padding'][0] ) && is_numeric( $text_spacing['padding'][0] ) ) {
						$css->add_property( 'padding-top', $text_spacing['padding'][0] . 'px' );
					}
					if ( isset( $text_spacing['padding'][1] ) && is_numeric( $text_spacing['padding'][1] ) ) {
						$css->add_property( 'padding-right', $text_spacing['padding'][1] . 'px' );
					}
					if ( isset( $text_spacing['padding'][2] ) && is_numeric( $text_spacing['padding'][2] ) ) {
						$css->add_property( 'padding-bottom', $text_spacing['padding'][2] . 'px' );
					}
					if ( isset( $text_spacing['padding'][3] ) && is_numeric( $text_spacing['padding'][3] ) ) {
						$css->add_property( 'padding-left', $text_spacing['padding'][3] . 'px' );
					}
				}
				if ( isset( $text_spacing['margin'] ) && is_array( $text_spacing['margin'] ) ) {
					if ( isset( $text_spacing['margin'][0] ) && is_numeric( $text_spacing['margin'][0] ) ) {
						$css->add_property( 'margin-top', $text_spacing['margin'][0] . 'px' );
					}
					if ( isset( $text_spacing['margin'][1] ) && is_numeric( $text_spacing['margin'][1] ) ) {
						$css->add_property( 'margin-right', $text_spacing['margin'][1] . 'px' );
					}
					if ( isset( $text_spacing['margin'][2] ) && is_numeric( $text_spacing['margin'][2] ) ) {
						$css->add_property( 'margin-bottom', $text_spacing['margin'][2] . 'px' );
					}
					if ( isset( $text_spacing['margin'][3] ) && is_numeric( $text_spacing['margin'][3] ) ) {
						$css->add_property( 'margin-left', $text_spacing['margin'][3] . 'px' );
					}
				}
			}
		}
		if ( isset( $attributes['textHoverColor'] ) && ! empty( $attributes['textHoverColor'] ) ) {
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-text' );
			$css->add_property( 'color', $css->render_color( $attributes['textHoverColor'] ) );
		}
		if ( isset( $attributes['textFont'] ) && is_array( $attributes['textFont'] ) && isset( $attributes['textFont'][0] ) && is_array( $attributes['textFont'][0] ) && ( ( isset( $attributes['textFont'][0]['size'] ) && is_array( $attributes['textFont'][0]['size'] ) && isset( $attributes['textFont'][0]['size'][1] ) && ! empty( $attributes['textFont'][0]['size'][1] ) ) || ( isset( $attributes['textFont'][0]['lineHeight'] ) && is_array( $attributes['textFont'][0]['lineHeight'] ) && isset( $attributes['textFont'][0]['lineHeight'][1] ) && ! empty( $attributes['textFont'][0]['lineHeight'][1] ) ) ) ) {
			$css->set_media_state( 'tablet' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
			if ( isset( $attributes['textFont'][0]['size'][1] ) && ! empty( $attributes['textFont'][0]['size'][1] ) ) {
				$css->add_property( 'font-size', $attributes['textFont'][0]['size'][1] . ( ! isset( $attributes['textFont'][0]['sizeType'] ) ? 'px' : $attributes['textFont'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['textFont'][0]['lineHeight'][1] ) && ! empty( $attributes['textFont'][0]['lineHeight'][1] ) ) {
				$css->add_property( 'line-height', $attributes['textFont'][0]['lineHeight'][1] . ( ! isset( $attributes['textFont'][0]['lineType'] ) ? 'px' : $attributes['textFont'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['textFont'] ) && is_array( $attributes['textFont'] ) && isset( $attributes['textFont'][0] ) && is_array( $attributes['textFont'][0] ) && ( ( isset( $attributes['textFont'][0]['size'] ) && is_array( $attributes['textFont'][0]['size'] ) && isset( $attributes['textFont'][0]['size'][2] ) && ! empty( $attributes['textFont'][0]['size'][2] ) ) || ( isset( $attributes['textFont'][0]['lineHeight'] ) && is_array( $attributes['textFont'][0]['lineHeight'] ) && isset( $attributes['textFont'][0]['lineHeight'][2] ) && ! empty( $attributes['textFont'][0]['lineHeight'][2] ) ) ) ) {
			$css->set_media_state( 'mobile' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
			if ( isset( $attributes['textFont'][0]['size'][2] ) && ! empty( $attributes['textFont'][0]['size'][2] ) ) {
				$css->add_property( 'font-size', $attributes['textFont'][0]['size'][2] . ( ! isset( $attributes['textFont'][0]['sizeType'] ) ? 'px' : $attributes['textFont'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['textFont'][0]['lineHeight'][2] ) && ! empty( $attributes['textFont'][0]['lineHeight'][2] ) ) {
				$css->add_property( 'line-height', $attributes['textFont'][0]['lineHeight'][2] . ( ! isset( $attributes['textFont'][0]['lineType'] ) ? 'px' : $attributes['textFont'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['textMinHeight'] ) && is_array( $attributes['textMinHeight'] ) && isset( $attributes['textMinHeight'][0] ) ) {
			if ( is_numeric( $attributes['textMinHeight'][0] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
				$css->add_property( 'min-height', $attributes['textMinHeight'][0] . 'px' );
			}
			if ( isset( $attributes['textMinHeight'][1] ) && is_numeric( $attributes['textMinHeight'][1] ) ) {
				$css->set_media_state( 'tablet' );
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
				$css->add_property( 'min-height', $attributes['textMinHeight'][1] . 'px' );
				$css->stop_media_query();
			}
			if ( isset( $attributes['textMinHeight'][2] ) && is_numeric( $attributes['textMinHeight'][2] ) ) {
				$css->set_media_state( 'mobile' );
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-text' );
				$css->add_property( 'min-height', $attributes['textMinHeight'][2] . 'px' );
				$css->stop_media_query();
			}
		}
		if ( isset( $attributes['learnMoreStyles'] ) && is_array( $attributes['learnMoreStyles'] ) && is_array( $attributes['learnMoreStyles'][0] ) ) {
			$learn_more_styles = $attributes['learnMoreStyles'][0];
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-learnmore' );
			if ( isset( $learn_more_styles['color'] ) && ! empty( $learn_more_styles['color'] ) ) {
				$css->add_property( 'color', $css->render_color( $learn_more_styles['color'] ) );
			}
			if ( isset( $learn_more_styles['background'] ) && ! empty( $learn_more_styles['background'] ) ) {
				$css->add_property( 'background', $css->render_color( $learn_more_styles['background'] ) );
			}
			if ( isset( $learn_more_styles['border'] ) && ! empty( $learn_more_styles['border'] ) ) {
				$css->add_property( 'border-color', $css->render_color( $learn_more_styles['border'] ) );
			}
			if ( isset( $learn_more_styles['borderRadius'] ) && ! empty( $learn_more_styles['borderRadius'] ) ) {
				$css->add_property( 'border-radius', $learn_more_styles['borderRadius'] . 'px' );
			}
			if ( isset( $learn_more_styles['size'] ) && is_array( $learn_more_styles['size'] ) && ! empty( $learn_more_styles['size'][0] ) ) {
				$css->add_property( 'font-size', $learn_more_styles['size'][0] . ( ! isset( $learn_more_styles['sizeType'] ) ? 'px' : $learn_more_styles['sizeType'] ) );
			}
			if ( isset( $learn_more_styles['lineHeight'] ) && is_array( $learn_more_styles['lineHeight'] ) && ! empty( $learn_more_styles['lineHeight'][0] ) ) {
				$css->add_property( 'line-height', $learn_more_styles['lineHeight'][0] . ( ! isset( $learn_more_styles['lineType'] ) ? 'px' : $learn_more_styles['lineType'] ) );
			}
			if ( isset( $learn_more_styles['letterSpacing'] ) && ! empty( $learn_more_styles['letterSpacing'] ) ) {
				$css->add_property( 'letter-spacing', $learn_more_styles['letterSpacing'] . 'px' );
			}
			if ( isset( $learn_more_styles['textTransform'] ) && ! empty( $learn_more_styles['textTransform'] ) ) {
				$css->add_property( 'text-transform', $learn_more_styles['textTransform'] );
			}
			if ( isset( $learn_more_styles['family'] ) && ! empty( $learn_more_styles['family'] ) ) {
				$css->add_property( 'font-family', $css->render_font_family( $learn_more_styles['family'] ) );
			}
			if ( isset( $learn_more_styles['style'] ) && ! empty( $learn_more_styles['style'] ) ) {
				$css->add_property( 'font-style', $learn_more_styles['style'] );
			}
			if ( isset( $learn_more_styles['weight'] ) && ! empty( $learn_more_styles['weight'] ) ) {
				$css->add_property( 'font-weight', $css->render_font_weight( $learn_more_styles['weight'] ) );
			}
			if ( isset( $learn_more_styles['borderWidth'] ) && is_array( $learn_more_styles['borderWidth'] ) ) {
				$css->add_property( 'border-width', $learn_more_styles['borderWidth'][0] . 'px ' . $learn_more_styles['borderWidth'][1] . 'px ' . $learn_more_styles['borderWidth'][2] . 'px ' . $learn_more_styles['borderWidth'][3] . 'px' );
			}
			if ( isset( $learn_more_styles['padding'] ) && is_array( $learn_more_styles['padding'] ) ) {
				$css->add_property( 'padding', $learn_more_styles['padding'][0] . 'px ' . $learn_more_styles['padding'][1] . 'px ' . $learn_more_styles['padding'][2] . 'px ' . $learn_more_styles['padding'][3] . 'px' );
			}
			if ( isset( $learn_more_styles['margin'] ) && is_array( $learn_more_styles['margin'] ) ) {
				$css->add_property( 'margin', $learn_more_styles['margin'][0] . 'px ' . $learn_more_styles['margin'][1] . 'px ' . $learn_more_styles['margin'][2] . 'px ' . $learn_more_styles['margin'][3] . 'px' );
			}
			if ( isset( $learn_more_styles['colorHover'] ) || isset( $learn_more_styles['colorHover'] ) || isset( $learn_more_styles['borderHover'] ) ) {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover .kt-blocks-info-box-learnmore' );
				if ( isset( $learn_more_styles['colorHover'] ) && ! empty( $learn_more_styles['colorHover'] ) ) {
					$css->add_property( 'color', $css->render_color( $learn_more_styles['colorHover'] ) );
				}
				if ( isset( $learn_more_styles['backgroundHover'] ) && ! empty( $learn_more_styles['backgroundHover'] ) ) {
					$css->add_property( 'background', $css->render_color( $learn_more_styles['backgroundHover'] ) );
				}
				if ( isset( $learn_more_styles['borderHover'] ) && ! empty( $learn_more_styles['borderHover'] ) ) {
					$css->add_property( 'border-color', $css->render_color( $learn_more_styles['borderHover'] ) );
				}
			}
		}
		if ( isset( $attributes['learnMoreStyles'] ) && is_array( $attributes['learnMoreStyles'] ) && isset( $attributes['learnMoreStyles'][0] ) && is_array( $attributes['learnMoreStyles'][0] ) && ( ( isset( $attributes['learnMoreStyles'][0]['size'] ) && is_array( $attributes['learnMoreStyles'][0]['size'] ) && isset( $attributes['learnMoreStyles'][0]['size'][1] ) && ! empty( $attributes['learnMoreStyles'][0]['size'][1] ) ) || ( isset( $attributes['learnMoreStyles'][0]['lineHeight'] ) && is_array( $attributes['learnMoreStyles'][0]['lineHeight'] ) && isset( $attributes['learnMoreStyles'][0]['lineHeight'][1] ) && ! empty( $attributes['learnMoreStyles'][0]['lineHeight'][1] ) ) ) ) {
			$css->set_media_state( 'tablet' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-learnmore' );
			if ( isset( $attributes['learnMoreStyles'][0]['size'][1] ) && ! empty( $attributes['learnMoreStyles'][0]['size'][1] ) ) {
				$css->add_property( 'font-size', $attributes['learnMoreStyles'][0]['size'][1] . ( ! isset( $attributes['learnMoreStyles'][0]['sizeType'] ) ? 'px' : $attributes['learnMoreStyles'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['learnMoreStyles'][0]['lineHeight'][1] ) && ! empty( $attributes['learnMoreStyles'][0]['lineHeight'][1] ) ) {
				$css->add_property( 'line-height', $attributes['learnMoreStyles'][0]['lineHeight'][1] . ( ! isset( $attributes['learnMoreStyles'][0]['lineType'] ) ? 'px' : $attributes['learnMoreStyles'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['learnMoreStyles'] ) && is_array( $attributes['learnMoreStyles'] ) && isset( $attributes['learnMoreStyles'][0] ) && is_array( $attributes['learnMoreStyles'][0] ) && ( ( isset( $attributes['learnMoreStyles'][0]['size'] ) && is_array( $attributes['learnMoreStyles'][0]['size'] ) && isset( $attributes['learnMoreStyles'][0]['size'][2] ) && ! empty( $attributes['learnMoreStyles'][0]['size'][2] ) ) || ( isset( $attributes['learnMoreStyles'][0]['lineHeight'] ) && is_array( $attributes['learnMoreStyles'][0]['lineHeight'] ) && isset( $attributes['learnMoreStyles'][0]['lineHeight'][2] ) && ! empty( $attributes['learnMoreStyles'][0]['lineHeight'][2] ) ) ) ) {
			$css->set_media_state( 'mobile' );
			$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-learnmore' );
			if ( isset( $attributes['learnMoreStyles'][0]['size'][2] ) && ! empty( $attributes['learnMoreStyles'][0]['size'][2] ) ) {
				$css->add_property( 'font-size', $attributes['learnMoreStyles'][0]['size'][2] . ( ! isset( $attributes['learnMoreStyles'][0]['sizeType'] ) ? 'px' : $attributes['learnMoreStyles'][0]['sizeType'] ) );
			}
			if ( isset( $attributes['learnMoreStyles'][0]['lineHeight'][2] ) && ! empty( $attributes['learnMoreStyles'][0]['lineHeight'][2] ) ) {
				$css->add_property( 'line-height', $attributes['learnMoreStyles'][0]['lineHeight'][2] . ( ! isset( $attributes['learnMoreStyles'][0]['lineType'] ) ? 'px' : $attributes['learnMoreStyles'][0]['lineType'] ) );
			}
			$css->stop_media_query();
		}
		if ( isset( $attributes['displayShadow'] ) && ! empty( $attributes['displayShadow'] ) && true === $attributes['displayShadow'] ) {
			if ( isset( $attributes['shadow'] ) && is_array( $attributes['shadow'] ) && is_array( $attributes['shadow'][0] ) ) {
				$shadow = $attributes['shadow'][0];
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap' );
				$css->add_property( 'box-shadow', $shadow['hOffset'] . 'px ' . $shadow['vOffset'] . 'px ' . $shadow['blur'] . 'px ' . $shadow['spread'] . 'px ' . $css->render_color( ( isset( $shadow['color'] ) ? $shadow['color'] : '' ), $shadow['opacity'] ) );
			}
			if ( isset( $attributes['shadowHover'] ) && is_array( $attributes['shadowHover'] ) && is_array( $attributes['shadowHover'][0] ) ) {
				$shadow_hover = $attributes['shadowHover'][0];
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover' );
				$css->add_property( 'box-shadow', $shadow_hover['hOffset'] . 'px ' . $shadow_hover['vOffset'] . 'px ' . $shadow_hover['blur'] . 'px ' . $shadow_hover['spread'] . 'px ' . $css->render_color( $shadow_hover['color'], $shadow_hover['opacity'] ) );
			} else {
				$css->set_selector( '#kt-info-box' . $unique_id . ' .kt-blocks-info-box-link-wrap:hover' );
				$css->add_property( 'box-shadow', '0px 0px 14px 0px rgba(0,0,0,0.2)' );
			}
		}

		return $css->css_output();
	}
}

Kadence_Blocks_Infobox_Block::get_instance();
