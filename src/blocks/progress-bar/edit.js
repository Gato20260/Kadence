/**
 * BLOCK: Kadence Block Template
 */

/**
 * Import Css
 */
import './editor.scss';

import {
	TypographyControls,
	PopColorControl,
	WebfontLoader,
	ResponsiveRangeControl,
	ResponsiveMeasurementControls
} from '@kadence/components';

import {
	KadenceColorOutput,
	getPreviewSize
} from '@kadence/helpers';

import {
	progressIcon,
	lineBar,
	circleBar
} from '@kadence/icons'
 /**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment
} from '@wordpress/element';
import { useBlockProps, BlockAlignmentControl } from '@wordpress/block-editor';
import { map } from 'lodash';
import {
	RichText,
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ButtonGroup,
	Button
} from '@wordpress/components';
import {
	Circle,
	SemiCircle,
	Line
} from 'progressbar.js'
/**
 * Internal dependencies
 */
import classnames from 'classnames';
const ktUniqueIDs = [];

export function Edit( {
	attributes,
	setAttributes,
	className,
	clientId,
} ) {

	const {
		uniqueID,
		align,
		paddingTablet,
		paddingDesktop,
		paddingMobile,
		paddingUnit,
		marginTablet,
		marginDesktop,
		marginMobile,
		marginUnit,
		barBackground,
		barBackgroundOpacity,
		containerBorder,
		containerTabletBorder,
		containerMobileBorder,
		containerBorderType,
		borderColor,
		borderOpacity,
		barType

	} = attributes;

	useEffect( () => {
		if ( !uniqueID ) {
			const blockConfigObject = ( kadence_blocks_params.configuration ? JSON.parse( kadence_blocks_params.configuration ) : [] );
			if ( blockConfigObject[ 'kadence/block-template' ] !== undefined && typeof blockConfigObject[ 'kadence/block-template' ] === 'object' ) {
				Object.keys( blockConfigObject[ 'kadence/block-template' ] ).map( ( attribute ) => {
					uniqueID = blockConfigObject[ 'kadence/block-template' ][ attribute ];
				} );
			}
			setAttributes( {
				uniqueID: '_' + clientId.substr( 2, 9 ),
			} );
			ktUniqueIDs.push( '_' + clientId.substr( 2, 9 ) );
		} else if ( ktUniqueIDs.includes( uniqueID ) ) {
			setAttributes( {
				uniqueID: '_' + clientId.substr( 2, 9 ),
			} );
			ktUniqueIDs.push( '_' + clientId.substr( 2, 9 ) );
		} else {
			ktUniqueIDs.push( uniqueID );
		}
	}, [] );

	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID: ( value ) => select( 'kadenceblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'kadenceblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'kadenceblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	const previewMarginTop = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[0] : '' ), ( undefined !== marginTablet ? marginTablet[ 0 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 0 ] : '' ) );
	const previewMarginRight = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[1] : '' ), ( undefined !== marginTablet ? marginTablet[ 1 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 1 ] : '' ) );
	const previewMarginBottom = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[2] : '' ), ( undefined !== marginTablet ? marginTablet[ 2 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 2 ] : '' ) );
	const previewMarginLeft = getPreviewSize( previewDevice, ( undefined !== marginDesktop ? marginDesktop[3] : '' ), ( undefined !== marginTablet ? marginTablet[ 3 ] : '' ), ( undefined !== marginMobile ? marginMobile[ 3 ] : '' ) );

	const previewPaddingTop = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[0] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 0 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 0 ] : '' ) );
	const previewPaddingRight = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[1] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 1 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 1 ] : '' ) );
	const previewPaddingBottom = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[2] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 2 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 2 ] : '' ) );
	const previewPaddingLeft = getPreviewSize( previewDevice, ( undefined !== paddingDesktop ? paddingDesktop[3] : '' ), ( undefined !== paddingTablet ? paddingTablet[ 3 ] : '' ), ( undefined !== paddingMobile ? paddingMobile[ 3 ] : '' ) );

	const previewBarBorderTop = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 0 ] ? containerBorder[ 0 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 0 ] ? containerTabletBorder[ 0 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 0 ] ? containerMobileBorder[ 0 ] : '' ) );
	const previewBarBorderRight = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 1 ] ? containerBorder[ 1 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 1 ] ? containerTabletBorder[ 1 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 1 ] ? containerMobileBorder[ 1 ] : '' ) );
	const previewBarBorderBottom = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 2 ] ? containerBorder[ 2 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 2 ] ? containerTabletBorder[ 2 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 2 ] ? containerMobileBorder[ 2 ] : '' ) );
	const previewBarBorderLeft = getPreviewSize( previewDevice, ( undefined !== containerBorder && undefined !== containerBorder[ 3 ] ? containerBorder[ 3 ] : '' ), ( undefined !== containerTabletBorder && undefined !== containerTabletBorder[ 3 ] ? containerTabletBorder[ 3 ] : '' ), ( undefined !== containerMobileBorder && undefined !== containerMobileBorder[ 3 ] ? containerMobileBorder[ 3 ] : '' ) );
	
	const [ marginControl, setMarginControl ] = useState( 'individual');
	const [ paddingControl, setPaddingControl ] = useState( 'individual');
	const [ borderControl, setBorderControl ] = useState( 'individual');


	const classes = classnames( className, {
		[ `kt-block-template${ uniqueID }` ]: uniqueID,
	} );

	const containerClasses = classnames( {
		'kb-block-template-container': true,
		[ `kb-block-template-container${ uniqueID }` ] : true,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const layoutPresetOptions = [
		{ key: 'line', name: __( 'Line', 'kadence-blocks' ), icon: lineBar },
		{ key: 'circle', name: __( 'Circle', 'kadence-blocks' ), icon: circleBar }
	];
	const container = document.createElement('div');
	const ProgressCircle = ({animate}) => { 
		const circle = useMemo(()=>
		new Circle(container,{
			color: KadenceColorOutput( borderColor , borderOpacity ),
			strokeWidth: previewBarBorderTop,
			fill: KadenceColorOutput( barBackground , barBackgroundOpacity ),
			duration: 1200,
		}),[]);
		const node = useCallback( node => {
			if ( node ) {
				node.appendChild( container );
			}
		}, [] );

		useEffect( () => {
			circle.animate( animate );
		}, [ animate, circle ] );

		return <div ref={node} />;
	};
	const [animate,setAnimate] = useState(0.0)
	const circleBarStyles = (
		<style>
			{`
			 .bg {
				fill: ${KadenceColorOutput( barBackground , barBackgroundOpacity )};
				stroke-width: ${previewBarBorderTop + containerBorderType };
				stroke: ${KadenceColorOutput( borderColor , borderOpacity )};
			  }	
			`}
		</style>
	)	

	return (
		<div { ...blockProps }>
			<BlockControls group="block">
				<BlockAlignmentControl
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
				/>
			</BlockControls>
			<InspectorControls>

				<Fragment>
					<h2>{__( 'Progress Bar Layout', 'kadence-blocks' )}</h2>
					<ButtonGroup className="kt-style-btn-group kb-info-layouts" aria-label={__( 'Progress Bar Layout', 'kadence-blocks' )}>
						{map( layoutPresetOptions, ( { name, key, icon } ) => (
							<Button
								key={key}
								className="kt-style-btn"
								isSmall
								isPrimary={false}
								aria-pressed={false}
								onClick={
									() => setAttributes( { barType: key } )
								}
							>
								{icon}
							</Button>
						) )}
					</ButtonGroup>
				</Fragment>


				<PanelBody
					title={ __( 'Size Controls', 'kadence-blocks' ) }
					initialOpen={ false }
				>
					<ResponsiveMeasurementControls
						label={ __( 'Padding', 'kadence-blocks' ) }
						value={ [ previewPaddingTop, previewPaddingRight, previewPaddingBottom, previewPaddingLeft ] }
						control={ paddingControl }
						tabletValue={ paddingTablet }
						mobileValue={ paddingMobile }
						onChange={ ( value ) => setAttributes( { paddingDesktop: value } ) }
						onChangeTablet={ ( value ) => setAttributes( { paddingTablet: value } ) }
						onChangeMobile={ ( value ) => setAttributes( { paddingMobile: value } ) }
						onChangeControl={ ( value ) => setPaddingControl( value ) }
						min={ 0 }
						max={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 24 : 200 ) }
						step={ ( paddingUnit === 'em' || paddingUnit === 'rem' ? 0.1 : 1 ) }
						unit={ paddingUnit }
						units={ [ 'px', 'em', 'rem', '%' ] }
						onUnit={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<ResponsiveMeasurementControls
						label={ __( 'Margin', 'kadence-blocks' ) }
						value={ [ previewMarginTop, previewMarginRight, previewMarginBottom, previewMarginLeft ] }
						control={ marginControl }
						tabletValue={ marginTablet }
						mobileValue={ marginMobile }
						onChange={ ( value ) => {
							setAttributes( { marginDesktop: [ value[ 0 ], value[ 1 ], value[ 2 ], value[ 3 ] ] } );
						} }
						onChangeTablet={ ( value ) => setAttributes( { marginTablet: value } ) }
						onChangeMobile={ ( value ) => setAttributes( { marginMobile: value } ) }
						onChangeControl={ ( value ) => setMarginControl( value ) }
						min={ ( marginUnit === 'em' || marginUnit === 'rem' ? -12 : -200 ) }
						max={ ( marginUnit === 'em' || marginUnit === 'rem' ? 24 : 200 ) }
						step={ ( marginUnit === 'em' || marginUnit === 'rem' ? 0.1 : 1 ) }
						unit={ marginUnit }
						units={ [ 'px', 'em', 'rem', '%', 'vh' ] }
						onUnit={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
				</PanelBody>
				
				<PanelBody
					title={ __( 'Progress Bar Settings', 'kadence-blocks' ) }
					initialOpen={ false }
				>
					
					<PopColorControl
						label={ __( 'Bar Background', 'kadence-blocks' ) }
						colorValue={ ( barBackground ? barBackground : '#4A5568' ) }
						colorDefault={ '#4A5568' }
						opacityValue={ barBackgroundOpacity }
						onColorChange={ value => setAttributes( { barBackground: value } ) }
						onOpacityChange={ value => setAttributes( { barBackgroundOpacity: value } ) }
					/>
					<PopColorControl
						label={ __( 'Border Color', 'kadence-blocks' ) }
						colorValue={ ( borderColor ? borderColor : '#4A5568' ) }
						colorDefault={ '#4A5568' }
						opacityValue={ borderOpacity }
						onColorChange={ value => setAttributes( { borderColor: value } ) }
						onOpacityChange={ value => setAttributes( { borderOpacity: value } ) }
					/>
					<ResponsiveMeasurementControls
						label={ __( 'Bar Border', 'kadence-blocks' ) }
						control={(barType==="circle" ? 'slider': borderControl) }
						tabletControl={ borderControl }
						mobileControl={ borderControl }
						value={ containerBorder }
						tabletValue={ containerTabletBorder }
						mobileValue={ containerMobileBorder }
						onChange={ ( value ) => {
							setAttributes( { containerBorder: value } );
						} }
						onChangeTablet={ ( value ) => {
							setAttributes( { containerTabletBorder: value } );
						} }
						onChangeMobile={ ( value ) => {
							setAttributes( { containerMobileBorder: value } );
						} }
						onChangeControl={ ( value ) => setBorderControl( value ) }
						onChangeTabletControl={ ( value ) => setBorderControl( value ) }
						onChangeMobileControl={ ( value ) => setBorderControl( value ) }
						allowEmpty={ true }
						min={ 0 }
						max={ 50 }
						step={ 1 }
						unit={ containerBorderType }
						units={ [ '%' ] }
						onUnit={ ( value ) => setAttributes( { containerBorderType: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ containerClasses } style={
				{
					marginTop: ( '' !== previewMarginTop ? previewMarginTop + marginUnit : undefined ),
					marginRight: ( '' !== previewMarginRight ? previewMarginRight + marginUnit : undefined ),
					marginBottom: ( '' !== previewMarginBottom ? previewMarginBottom + marginUnit : undefined ),
					marginLeft: ( '' !== previewMarginLeft ? previewMarginLeft + marginUnit : undefined ),

					paddingTop: ( '' !== previewPaddingTop ? previewPaddingTop + paddingUnit : undefined ),
					paddingRight: ( '' !== previewPaddingRight ? previewPaddingRight + paddingUnit : undefined ),
					paddingBottom: ( '' !== previewPaddingBottom ? previewPaddingBottom + paddingUnit : undefined ),
					paddingLeft: ( '' !== previewPaddingLeft ? previewPaddingLeft + paddingUnit : undefined ),
				}
			}>

				<div class="container">
					{(barType === "line") &&
						<div class="progress-bar__container" style={{
							backgroundColor: KadenceColorOutput( barBackground , barBackgroundOpacity ),
							borderTopWidth: previewBarBorderTop + containerBorderType,
							borderBottomWidth: previewBarBorderBottom + containerBorderType,
							borderRightWidth: previewBarBorderRight + containerBorderType,
							borderLeftWidth: previewBarBorderLeft + containerBorderType,
							borderColor:  KadenceColorOutput( borderColor , borderOpacity ),
							borderStyle: "solid"
							}}>
							<div class="progressbar-1">
								<span class="progress-bar__text"></span>
							</div>
						</div>
					}

					{(barType === "circle") &&
						<div class="circle-bars">
							{circleBarStyles}
							<ProgressCircle animate={animate} />
							<button onClick={()=> setAnimate(Math.random())}>Click Me</button>
						</div>
					}
					
				</div>
				
			</div>
		</div>
	);
}

export default ( Edit );
