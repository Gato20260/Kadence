/**
 * External dependencies
 */
import { textInputIcon } from '@kadence/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

registerBlockType('kadence/advanced-form-text', {
	...metadata,
	title: __( 'Text Field', 'kadence-blocks' ),
	description: __( 'Kadence Form text input field', 'kadence-blocks' ),
	keywords: [
		'kadence',
	],
	icon: {
		src: textInputIcon,
	},
	edit,
	transforms,
	save: () => null,

});
