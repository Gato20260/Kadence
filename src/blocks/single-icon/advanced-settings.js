import { ResponsiveMeasureRangeControl, KadencePanelBody } from '@kadence/components';
import { __ } from '@wordpress/i18n';

export function AdvancedSettings({ attributes, setAttributes }) {
	const {
		margin,
		tabletMargin,
		mobileMargin,
		marginUnit,
		padding,
		tabletPadding,
		mobilePadding,
		paddingUnit,
		style,
	} = attributes;

	return (
		<KadencePanelBody
			title={__('Icon', 'kadence-blocks') + ' ' + __('Spacing Settings', 'kadence-blocks')}
			initialOpen={true}
			panelName={'iconSpacing'}
			blockSlug={'kadence/icon'}
		>
			{style !== 'default' && (
				<ResponsiveMeasureRangeControl
					label={__('Icon Padding', 'kadence-blocks')}
					value={padding ? padding : ['', '', '', '']}
					onChange={(value) => setAttributes({ padding: value })}
					tabletValue={tabletPadding ? tabletPadding : ['', '', '', '']}
					onChangeTablet={(value) => setAttributes({ tabletPadding: value })}
					mobileValue={mobilePadding ? mobilePadding : ['', '', '', '']}
					onChangeMobile={(value) => setAttributes({ mobilePadding: value })}
					min={0}
					max={
						(paddingUnit ? paddingUnit : 'px') === 'em' || (paddingUnit ? paddingUnit : 'px') === 'rem'
							? 25
							: 999
					}
					step={
						(paddingUnit ? paddingUnit : 'px') === 'em' || (paddingUnit ? paddingUnit : 'px') === 'rem'
							? 0.1
							: 1
					}
					unit={paddingUnit ? paddingUnit : 'px'}
					units={['px', 'em', 'rem']}
					onUnit={(value) => setAttributes({ paddingUnit: value })}
				/>
			)}
			<ResponsiveMeasureRangeControl
				label={__('Icon Margin', 'kadence-blocks')}
				value={margin ? margin : ['', '', '', '']}
				onChange={(value) => setAttributes({ margin: value })}
				tabletValue={tabletMargin ? tabletMargin : ['', '', '', '']}
				onChangeTablet={(value) => setAttributes({ tabletMargin: value })}
				mobileValue={mobileMargin ? mobileMargin : ['', '', '', '']}
				onChangeMobile={(value) => setAttributes({ mobileMargin: value })}
				min={
					(marginUnit ? marginUnit : 'px') === 'em' || (marginUnit ? marginUnit : 'px') === 'rem' ? -25 : -999
				}
				max={(marginUnit ? marginUnit : 'px') === 'em' || (marginUnit ? marginUnit : 'px') === 'rem' ? 25 : 999}
				step={(marginUnit ? marginUnit : 'px') === 'em' || (marginUnit ? marginUnit : 'px') === 'rem' ? 0.1 : 1}
				unit={marginUnit ? marginUnit : 'px'}
				units={['px', 'em', 'rem']}
				onUnit={(value) => setAttributes({ marginUnit: value })}
				allowAuto={true}
			/>
		</KadencePanelBody>
	);
}
