import { __ } from '@wordpress/i18n';
import {
	KadencePanelBody,
	PopColorControl,
	TypographyControls,
	ColorGroup,
	ResponsiveBorderControl,
	ResponsiveMeasurementControls,
	ResponsiveMeasureRangeControl,
} from '@kadence/components';

export default function MessageStyling( { setMetaAttribute, useFormMeta } ) {

	const [ messageBorderRadius ] = useFormMeta( '_kad_form_messageBorderRadius' );
	const [ tabletMessageBorderRadius ] = useFormMeta( '_kad_form_tabletMessageBorderRadius' );
	const [ mobileMessageBorderRadius ] = useFormMeta( '_kad_form_mobileMessageBorderRadius' );
	const [ messageBorderRadiusUnit ] = useFormMeta( '_kad_form_messageBorderRadiusUnit' );

	const [ messagePadding ] = useFormMeta( '_kad_form_messagePadding' );
	const [ tabletMessagePadding ] = useFormMeta( '_kad_form_tabletMessagePadding' );
	const [ mobileMessagePadding ] = useFormMeta( '_kad_form_mobileMessagePadding' );
	const [ messagePaddingUnit ] = useFormMeta( '_kad_form_messagePaddingUnit' );

	const [ messageMargin ] = useFormMeta( '_kad_form_messageMargin' );
	const [ tabletMessageMargin ] = useFormMeta( '_kad_form_tabletMessageMargin' );
	const [ mobileMessageMargin ] = useFormMeta( '_kad_form_mobileMessageMargin' );
	const [ messageMarginUnit ] = useFormMeta( '_kad_form_messageMarginUnit' );

	const [ messageColor ] = useFormMeta( '_kad_form_messageColor' );
	const [ messageBackground ] = useFormMeta( '_kad_form_messageBackground' );
	const [ messageColorError ] = useFormMeta( '_kad_form_messageColorError' );
	const [ messageBackgroundError ] = useFormMeta( '_kad_form_messageBackgroundError' );

	const [ messageBorderSuccess ] = useFormMeta( '_kad_form_messageBorderSuccess' );
	const [ tabletMessageBorderSuccess ] = useFormMeta( '_kad_form_tabletMessageBorderSuccess' );
	const [ mobileMessageBorderSuccess ] = useFormMeta( '_kad_form_mobileMessageBorderSuccess' );

	const [ messageBorderError ] = useFormMeta( '_kad_form_messageBorderError' );
	const [ tabletMessageBorderError ] = useFormMeta( '_kad_form_tabletMessageBorderError' );
	const [ mobileMessageBorderError ] = useFormMeta( '_kad_form_mobileMessageBorderError' );
	const [ messageFont ] = useFormMeta( '_kad_form_messageFont' );

	const saveMessageFont = ( value ) => {
		setMetaAttribute( [ { ...messageFont[0], ...value } ], 'messageFont' );
	};

	return (
		<>
			<ColorGroup label={ __( 'Success Message Colors', 'kadence-blocks' ) }>
				<PopColorControl
					label={__( 'Text Color', 'kadence-blocks' )}
					value={( messageColor ? messageColor : '' )}
					default={''}
					onChange={ ( value ) => {
						setMetaAttribute( value, 'messageColor' );
					}}
				/>
				<PopColorControl
					label={__( 'Background Color', 'kadence-blocks' )}
					value={( messageBackground ? messageBackground : '' )}
					default={''}
					onChange={ ( value ) => {
						setMetaAttribute( value, 'messageBackground' );
					}}
				/>
				<ResponsiveBorderControl
					label={__( 'Border', 'kadence-blocks' )}
					value={messageBorderSuccess}
					tabletValue={tabletMessageBorderSuccess}
					mobileValue={mobileMessageBorderSuccess}
					onChange={( value ) => setMetaAttribute( value, 'messageBorderSuccess' ) }
					onChangeTablet={( value ) => setMetaAttribute( value, 'tabletMessageBorderSuccess' ) }
					onChangeMobile={( value ) => setMetaAttribute( value, 'mobileMessageBorderSuccess' ) }
				/>
			</ColorGroup>
			<ColorGroup label={ __( 'Error Message Colors', 'kadence-blocks' ) }>
				<PopColorControl
					label={__( 'Error Message Color', 'kadence-blocks' )}
					value={( messageColorError ? messageColorError : '' )}
					default={''}
					onChange={ ( value ) => {
						setMetaAttribute( value, 'messageColorError' );
					}}
				/>
				<PopColorControl
					label={__( 'Error Message Background', 'kadence-blocks' )}
					value={( messageBackgroundError ? messageBackgroundError : '' )}
					default={''}
					onChange={ ( value ) => {
						setMetaAttribute( value, 'messageBackgroundError' );
					}}
				/>
				<ResponsiveBorderControl
					label={__( 'Border', 'kadence-blocks' )}
					value={messageBorderError}
					tabletValue={tabletMessageBorderError}
					mobileValue={mobileMessageBorderError}
					onChange={( value ) => setMetaAttribute( value, 'messageBorderError' )}
					onChangeTablet={( value ) => setMetaAttribute( value, 'tabletMessageBorderError')}
					onChangeMobile={( value ) => setMetaAttribute( value, 'setMetaAttribute' )}
				/>
			</ColorGroup>
			<TypographyControls
				fontSize={messageFont[0].size}
				onFontSize={( value ) => saveMessageFont( { size: value } )}
				fontSizeType={messageFont[0].sizeType}
				onFontSizeType={( value ) => saveMessageFont( { sizeType: value } )}
				lineHeight={messageFont[0].lineHeight}
				onLineHeight={( value ) => saveMessageFont( { lineHeight: value } )}
				lineHeightType={messageFont[0].lineType}
				onLineHeightType={( value ) => saveMessageFont( { lineType: value } )}
				textTransform={messageFont[0].textTransform}
				onTextTransform={( value ) => saveMessageFont( { textTransform: value } )}
			/>
			<ResponsiveMeasurementControls
				label={__( 'Border Radius', 'kadence-blocks' )}
				value={messageBorderRadius}
				tabletValue={tabletMessageBorderRadius}
				mobileValue={mobileMessageBorderRadius}
				onChange={( value ) => setMetaAttribute( value.map(String), 'messageBorderRadius' )}
				onChangeTablet={( value ) => setMetaAttribute( value.map(String), 'tabletMessageBorderRadius' )}
				onChangeMobile={( value ) => setMetaAttribute( value.map(String), 'mobileMessageBorderRadius' )}
				unit={messageBorderRadiusUnit}
				units={[ 'px', 'em', 'rem', '%' ]}
				onUnit={( value ) => setMetaAttribute( value, 'messageBorderRadiusUnit' )}
				max={(messageBorderRadiusUnit === 'em' || messageBorderRadiusUnit === 'rem' ? 24 : 500)}
				step={(messageBorderRadiusUnit === 'em' || messageBorderRadiusUnit === 'rem' ? 0.1 : 1)}
				min={ 0 }
				isBorderRadius={ true }
				allowEmpty={true}
			/>
			<KadencePanelBody
				title={__( 'Advanced Message Font Settings', 'kadence-blocks' )}
				initialOpen={false}
				panelName={'kb-form-advanced-message-font-settings'}
			>
				<TypographyControls
					reLetterSpacing={messageFont[0].letterSpacing}
					onLetterSpacing={( value ) => saveMessageFont( { letterSpacing: value } )}
					fontFamily={messageFont[0].family}
					onFontFamily={( value ) => saveMessageFont( { family: value } )}
					onFontChange={( select ) => {
						saveMessageFont( {
							family: select.value,
							google: select.google,
						} );
					}}
					onFontArrayChange={( values ) => saveMessageFont( values )}
					googleFont={messageFont[0].google}
					onGoogleFont={( value ) => saveMessageFont( { google: value } )}
					loadGoogleFont={messageFont[0].loadGoogle}
					onLoadGoogleFont={( value ) => saveMessageFont( { loadGoogle: value } )}
					fontVariant={messageFont[0].variant}
					onFontVariant={( value ) => saveMessageFont( { variant: value } )}
					fontWeight={messageFont[0].weight}
					onFontWeight={( value ) => saveMessageFont( { weight: value } )}
					fontStyle={messageFont[0].style}
					onFontStyle={( value ) => saveMessageFont( { style: value } )}
					fontSubset={messageFont[0].subset}
					onFontSubset={( value ) => saveMessageFont( { subset: value } )}
				/>
			</KadencePanelBody>
			<ResponsiveMeasureRangeControl
				label={__( 'Padding', 'kadence-blocks' )}
				value={ messagePadding }
				tabletValue={tabletMessagePadding}
				mobileValue={mobileMessagePadding}
				onChange={( value ) => {
					setMetaAttribute( value.map(String), 'messagePadding' );
				}}
				onChangeTablet={( value ) => {
					setMetaAttribute( value.map(String), 'tabletMessagePadding' );
				}}
				onChangeMobile={( value ) => {
					setMetaAttribute( value.map(String), 'mobileMessagePadding' );
				}}
				min={ 0 }
				max={ ( messagePaddingUnit === 'em' || messagePaddingUnit === 'rem' ? 24 : 500 ) }
				step={ ( messagePaddingUnit === 'em' || messagePaddingUnit === 'rem' ? 0.1 : 1 ) }
				unit={ messagePaddingUnit }
				units={ [ 'px', 'em', 'rem', '%', 'vh', 'vw' ] }
				onUnit={( value ) => setMetaAttribute( value, 'messagePaddingUnit' )}
			/>
			<ResponsiveMeasureRangeControl
				label={__( 'Margin', 'kadence-blocks' )}
				value={messageMargin}
				tabletValue={tabletMessageMargin}
				mobileValue={mobileMessageMargin}
				onChange={( value ) => {
					setMetaAttribute( value.map(String), 'messageMargin' );
				}}
				onChangeTablet={( value ) => {
					setMetaAttribute( value.map(String), 'tabletMessageMargin' );
				}}
				onChangeMobile={( value ) => {
					setMetaAttribute( value.map(String), 'mobileMessageMargin' );
				}}
				min={ ( messageMarginUnit === 'em' || messageMarginUnit === 'rem' ? -24 : -500 ) }
				max={ ( messageMarginUnit === 'em' || messageMarginUnit === 'rem' ? 24 : 500 ) }
				step={ ( messageMarginUnit === 'em' || messageMarginUnit === 'rem' ? 0.1 : 1 ) }
				unit={ messageMarginUnit }
				units={ [ 'px', 'em', 'rem', '%', 'vh', 'vw' ] }
				onUnit={ ( value ) => setMetaAttribute( value, 'messageMarginUnit' ) }
			/>
		</>
	);

}
