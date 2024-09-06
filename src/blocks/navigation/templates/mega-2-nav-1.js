/**
 * Template: Features with icon
 * Post Type: kadence_navigation
 */

import { createBlock } from '@wordpress/blocks';

const postMeta = {
	_kad_navigation_collapseSubMenus: '1',
	_kad_navigation_collapseSubMenusTablet: '1',
	_kad_navigation_collapseSubMenusMobile: '1',
	_kad_navigation_orientation: 'vertical',
	_kad_navigation_spacing: ['', '2', '', '2'],
	_kad_navigation_linkColor: 'palette3',
	_kad_navigation_linkColorHover: 'palette3',
	_kad_navigation_linkColorActive: 'palette3',
	_kad_navigation_background: 'palette9',
	_kad_navigation_backgroundHover: 'palette7',
	_kad_navigation_backgroundActive: 'palette7',
	_kad_navigation_typography: [
		{
			size: ['sm', '', ''],
			sizeType: 'px',
			lineHeight: ['', '', ''],
			lineType: '',
			letterSpacing: [0.5, '', ''],
			letterType: 'px',
			textTransform: '',
			family: '',
			google: false,
			style: '',
			weight: 'bold',
			variant: '',
			subset: '',
			loadGoogle: true,
		},
	],
};

function innerBlocks() {
	return [
		createBlock('kadence/navigation', {}, [
			createBlock(
				'kadence/navigation-link',
				{
					uniqueID: '320_ddfd5b-7f',
					label: 'Add a short title',
					description: 'Use this space to add a short description.',
					url: 'Add%20a%20short%20title',
					kind: 'custom',
					linkColor: 'palette3',
					mediaType: 'icon',
					mediaAlign: 'left',
					mediaIcon: [
						{
							icon: 'fe_star',
							size: 20,
							sizeTablet: '',
							sizeMobile: '',
							width: 2,
							widthTablet: 2,
							widthMobile: 2,
							hoverAnimation: 'none',
							title: '',
							flipIcon: '',
						},
					],
					mediaStyle: [
						{
							color: 'palette9',
							colorTablet: '',
							colorMobile: '',
							colorHover: 'palette9',
							colorHoverTablet: '',
							colorHoverMobile: '',
							colorActive: 'palette9',
							colorActiveTablet: '',
							colorActiveMobile: '',
							background: 'palette6',
							backgroundTablet: '',
							backgroundMobile: '',
							backgroundHover: 'palette6',
							backgroundHoverTablet: '',
							backgroundHoverMobile: '',
							backgroundActive: 'palette6',
							backgroundActiveTablet: '',
							backgroundActiveMobile: '',
							border: '',
							hoverBorder: '',
							borderRadius: 7,
							borderRadiusTablet: '',
							borderRadiusMobile: '',
							borderWidth: [0, 0, 0, 0],
							padding: [5, 5, 5, 5],
							paddingTablet: [5, 5, 5, 5],
							paddingMobile: [5, 5, 5, 5],
							margin: [8, '', '', ''],
							marginTablet: ['', '', '', ''],
							marginMobile: ['', '', '', ''],
						},
					],
				},
				[]
			),
			createBlock(
				'kadence/navigation-link',
				{
					uniqueID: '320_ae34d1-d7',
					label: 'Add a short title',
					description: 'Use this space to add a short description.',
					url: 'Add%20a%20short%20title',
					kind: 'custom',
					linkColor: 'palette3',
					mediaType: 'icon',
					mediaAlign: 'left',
					mediaIcon: [
						{
							icon: 'fe_star',
							size: 20,
							sizeTablet: '',
							sizeMobile: '',
							width: 2,
							widthTablet: 2,
							widthMobile: 2,
							hoverAnimation: 'none',
							title: '',
							flipIcon: '',
						},
					],
					mediaStyle: [
						{
							color: 'palette9',
							colorTablet: '',
							colorMobile: '',
							colorHover: 'palette9',
							colorHoverTablet: '',
							colorHoverMobile: '',
							colorActive: 'palette9',
							colorActiveTablet: '',
							colorActiveMobile: '',
							background: 'palette6',
							backgroundTablet: '',
							backgroundMobile: '',
							backgroundHover: 'palette6',
							backgroundHoverTablet: '',
							backgroundHoverMobile: '',
							backgroundActive: 'palette6',
							backgroundActiveTablet: '',
							backgroundActiveMobile: '',
							border: '',
							hoverBorder: '',
							borderRadius: 7,
							borderRadiusTablet: '',
							borderRadiusMobile: '',
							borderWidth: [0, 0, 0, 0],
							padding: [5, 5, 5, 5],
							paddingTablet: [5, 5, 5, 5],
							paddingMobile: [5, 5, 5, 5],
							margin: [8, '', '', ''],
							marginTablet: ['', '', '', ''],
							marginMobile: ['', '', '', ''],
						},
					],
				},
				[]
			),
			createBlock(
				'kadence/navigation-link',
				{
					uniqueID: '320_96d062-2d',
					label: 'Add a short title',
					description: 'Use this space to add a short description.',
					url: 'Add%20a%20short%20title',
					kind: 'custom',
					linkColor: 'palette3',
					mediaType: 'icon',
					mediaAlign: 'left',
					mediaIcon: [
						{
							icon: 'fe_star',
							size: 20,
							sizeTablet: '',
							sizeMobile: '',
							width: 2,
							widthTablet: 2,
							widthMobile: 2,
							hoverAnimation: 'none',
							title: '',
							flipIcon: '',
						},
					],
					mediaStyle: [
						{
							color: 'palette9',
							colorTablet: '',
							colorMobile: '',
							colorHover: 'palette9',
							colorHoverTablet: '',
							colorHoverMobile: '',
							colorActive: 'palette9',
							colorActiveTablet: '',
							colorActiveMobile: '',
							background: 'palette6',
							backgroundTablet: '',
							backgroundMobile: '',
							backgroundHover: 'palette6',
							backgroundHoverTablet: '',
							backgroundHoverMobile: '',
							backgroundActive: 'palette6',
							backgroundActiveTablet: '',
							backgroundActiveMobile: '',
							border: '',
							hoverBorder: '',
							borderRadius: 7,
							borderRadiusTablet: '',
							borderRadiusMobile: '',
							borderWidth: [0, 0, 0, 0],
							padding: [5, 5, 5, 5],
							paddingTablet: [5, 5, 5, 5],
							paddingMobile: [5, 5, 5, 5],
							margin: [8, '', '', ''],
							marginTablet: ['', '', '', ''],
							marginMobile: ['', '', '', ''],
						},
					],
				},
				[]
			),
		]),
	];
}

export { postMeta, innerBlocks };
