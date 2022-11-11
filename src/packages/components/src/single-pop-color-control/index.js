/**
 * Advanced Color Control.
 *
 */

/**
 * Import Icons
*/
import ColorPicker from '../color-picker';
import ColorIcons from '../color-icons';
import { hexToRGBA } from '@kadence/helpers';

import { get, map } from 'lodash';
import { useSetting } from '@wordpress/block-editor';

/**
 * Internal block libraries
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import {
	Button,
	Popover,
	ColorIndicator,
	Tooltip,
	Dashicon,
} from '@wordpress/components';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
class SinglePopColorControl extends Component {
	constructor() {
		super( ...arguments );
		this.onChangeState = this.onChangeState.bind( this );
		this.onChangeComplete = this.onChangeComplete.bind( this );
		this.unConvertOpacity = this.unConvertOpacity.bind( this );
		this.state = {
			alpha: false === this.props.alpha ? false : true,
			isVisible: false,
			colors: [],
			classSat: 'first',
			currentColor: '',
			inherit: false,
			currentOpacity: this.props.opacityValue !== undefined ? this.props.opacityValue : 1,
			isPalette: ( this.props.value && this.props.value.startsWith( 'palette' ) ? true : false ),
		};
	}
	 render() {
		const toggleVisible = () => {
			this.setState( { isVisible: true } );
		};
		const toggleClose = () => {
			if ( this.state.isVisible === true ) {
				this.setState( { isVisible: false } );
			}
		};
		if ( this.props.reload ) {
			this.props.reloaded( true );
			this.setState( { currentColor: '', currentOpacity: '', isPalette: ( this.props.value && this.props.value.startsWith( 'palette' ) ? true : false ) } );
		}
		const convertOpacity = ( value ) => {
			let val = 1;
			if ( value ) {
				val = value / 100;
			}
			return val;
		};
		const convertedOpacityValue = ( 100 === this.props.opacityUnit ? convertOpacity( this.state.currentOpacity ) : this.state.currentOpacity );
		const colorVal = ( this.state.currentColor ? this.state.currentColor : this.props.value );
		let currentColorString = ( this.state.isPalette && this.props.colors && this.props.colors[ parseInt( colorVal.slice( -1 ), 10 ) - 1 ] ? this.props.colors[ parseInt( colorVal.slice( -1 ), 10 ) - 1 ].color : colorVal );
		if ( ! this.state.isPalette && currentColorString && currentColorString.startsWith( 'var(' ) ) {
			currentColorString = window.getComputedStyle( document.documentElement ).getPropertyValue( this.props.value.replace( 'var(', '' ).split(',')[0].replace( ')', '' ) );
		}
		if ( '' === currentColorString ) {
			currentColorString = this.props.default;
		}
		// if ( '' !== currentColorString && this.props.onOpacityChange && ! this.state.isPalette ) {
		// 	currentColorString = hexToRGBA( ( undefined === currentColorString ? '' : currentColorString ), ( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) );
		// }
		if ( this.props.onOpacityChange && ! this.state.isPalette ) {
			if ( Number( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) !== 1 ) {
				currentColorString = hexToRGBA( ( undefined === currentColorString ? '' : currentColorString ), ( convertedOpacityValue !== undefined && convertedOpacityValue !== '' ? convertedOpacityValue : 1 ) );
			}
		}
		 let previewColorString = currentColorString;
		 if (this.state.isPalette && colorVal) {
			 switch (colorVal) {
				 case 'palette1':
					 previewColorString = 'var(--global-palette1,#2B6CB0)';
					 break;
				 case 'palette2':
					 previewColorString = 'var(--global-palette2,#215387)';
					 break;
				 case 'palette3':
					 previewColorString = 'var(--global-palette3,#1A202C)';
					 break;
				 case 'palette4':
					 previewColorString = 'var(--global-palette4,#2D3748)';
					 break;
				 case 'palette5':
					 previewColorString = 'var(--global-palette5,#4A5568)';
					 break;
				 case 'palette6':
					 previewColorString = 'var(--global-palette6,#718096)';
					 break;
				 case 'palette7':
					 previewColorString = 'var(--global-palette7,#EDF2F7)';
					 break;
				 case 'palette8':
					 previewColorString = 'var(--global-palette8,#F7FAFC)';
					 break;
				 case 'palette9':
					 previewColorString = 'var(--global-palette9,#ffffff)';
					 break;
			 }
		 }
		 return (
			<div className="single-pop-color">
				{ this.state.isVisible && (
					<Popover position="top left" className="kadence-pop-color-popover" onClose={ toggleClose }>
						{ this.state.classSat === 'first' && ! this.props.disableCustomColors && (
							<ColorPicker
								color={ currentColorString }
								onChange={ ( color ) => this.onChangeState( color, '' ) }
								onChangeComplete={ ( color ) => {
									this.onChangeComplete( color, '' );
									if ( this.props.onClassChange ) {
									this.props.onClassChange( '' );
									}
								} }
							/>
						) }
						{ this.state.classSat !== 'first' && ! this.props.disableCustomColors && (
							<ColorPicker
								color={ currentColorString }
								onChange={ ( color ) => this.onChangeState( color, '' ) }
								onChangeComplete={ ( color ) => {
									this.onChangeComplete( color, '' );
									if ( this.props.onClassChange ) {
										this.props.onClassChange( '' );
									}
								} }
						/>
						) }
						{ this.props.colors && (
							<div className="kadence-pop-color-palette-swatches">
								{ map( this.props.colors, ( { color, slug, name } ) => {
									const style = { color };
									const palette = slug.replace( 'theme-', '' );
									const isActive = ( ( palette === this.props.value ) || ( ! slug.startsWith( 'theme-palette' ) && this.props.value === color ) );
									return (
										<div key={ color } className="kadence-color-palette__item-wrapper">
											<Tooltip
												text={ name ||
													// translators: %s: color hex code e.g: "#f00".
													sprintf( __( 'Color code: %s' ), color )
												}>
												<Button
													type="button"
													className={ `kadence-color-palette__item ${ ( isActive ? 'is-active' : '' ) }` }
													style={ style }
													onClick={ () => {
														if ( slug.startsWith( 'theme-palette' ) ) {
															this.onChangeComplete( color, palette );
														} else {
															this.onChangeComplete( color, false );
														}
														if ( this.props.onClassChange ) {
															this.props.onClassChange( slug );
														}
													} }
													aria-label={ name ?
														// translators: %s: The name of the color e.g: "vivid red".
														sprintf( __( 'Color: %s', 'kadence-blocks' ), name ) :
														// translators: %s: color hex code e.g: "#f00".
														sprintf( __( 'Color code: %s', 'kadence-blocks' ), color ) }
													aria-pressed={ isActive }
												/>
											</Tooltip>
											{ palette === this.props.value && <Dashicon icon="admin-site" /> }
											{ ! slug.startsWith( 'theme-palette' ) && this.props.value === color && <Dashicon icon="saved" /> }
										</div>
									);
								} ) }
							</div>
						) }
					</Popover>
				) }
				{ this.state.isVisible && (
					<Button
						className={ `kadence-pop-color-icon-indicate ${ ( this.state.alpha ? 'kadence-has-alpha' : 'kadence-no-alpha' ) }` }
						onClick={ toggleVisible }
						showTooltip={ true }
						label={ this.props.label }
						>
						<ColorIndicator className="kadence-pop-color-indicate" colorValue={ previewColorString } />
						{ '' === previewColorString && this.state.inherit && (
							<span className="color-indicator-icon">{ ColorIcons.inherit }</span>
						) }
						{ ( this.props.value && this.props.value.startsWith( 'palette' )  ) && (
							<span className="color-indicator-icon">{ <Dashicon icon="admin-site" /> }</span>
						) }
					</Button>
				) }
				{ ! this.state.isVisible && (
					<Button
						className={ `kadence-pop-color-icon-indicate ${ ( this.state.alpha ? 'kadence-has-alpha' : 'kadence-no-alpha' ) }` }
						onClick={ toggleVisible }
						showTooltip={ true }
						label={ this.props.label }
						>
						<ColorIndicator className="kadence-pop-color-indicate" colorValue={ previewColorString } />
						{ '' === previewColorString && this.state.inherit && (
							<span className="color-indicator-icon">{ ColorIcons.inherit }</span>
						) }
						{ ( this.props.value && this.props.value.startsWith( 'palette' )  ) && (
							<span className="color-indicator-icon">{ <Dashicon icon="admin-site" /> }</span>
						) }
					</Button>
				) }
			</div>
		 );
	}
	unConvertOpacity( value ) {
		let val = 100;
		if ( value ) {
			val = value * 100;
		}
		return val;
	}
	onChangeState( color, palette ) {
		let newColor;
		let opacity = ( 100 === this.props.opacityUnit ? 100 : 1 );
		if ( palette ) {
			newColor = palette;
		} else if ( undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a ) {
			if ( this.props.onOpacityChange ) {
				if ( color.hex === 'transparent' ) {
					newColor = '#000000';
				} else {
					newColor = color.hex;
				}
				opacity = ( 100 === this.props.opacityUnit ? this.unConvertOpacity( color.rgb.a ) : color.rgb.a );
			} else {
				newColor = 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a + ')';
			}
		} else if ( undefined !== color.hex ) {
			newColor = color.hex;
		} else {
			newColor = color;
		}
		this.setState( { currentColor: newColor, currentOpacity: opacity, isPalette: ( palette ? true : false ) } );
	}
	onChangeComplete( color, palette ) {
		let newColor;
		let opacity = ( 100 === this.props.opacityUnit ? 100 : 1 );
		if ( palette ) {
			newColor = palette;
		} else if ( undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a ) {
			if ( this.props.onOpacityChange ) {
				if ( color.hex === 'transparent' ) {
					newColor = '#000000';
				} else {
					newColor = color.hex;
				}
				opacity = ( 100 === this.props.opacityUnit ? this.unConvertOpacity( color.rgb.a ) : color.rgb.a );
			} else {
				newColor = 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a + ')';
			}
		} else if ( undefined !== color.hex ) {
			newColor = color.hex;
		} else {
			newColor = color;
		}
		this.setState( { currentColor: newColor, currentOpacity: opacity, isPalette: ( palette ? true : false ) } );
		if ( undefined !== this.props.onArrayChange ) {
			this.props.onArrayChange( newColor, opacity );
		} else {
			this.props.onChange( newColor );
			if ( undefined !== this.props.onOpacityChange ) {
				setTimeout( () => {
					this.props.onOpacityChange( opacity );
				}, 50 );
			}
		}
	}
 }
 export default withSelect( ( select, ownProps ) => {
	 const disableCustomColors = ownProps.disableCustomColors === undefined ? ! useSetting( 'color.custom' ) : ownProps.disableCustomColors;
	 return {
		 colors: useSetting( 'color.palette' ),
		 disableCustomColors,
	 };
 } )( SinglePopColorControl );
