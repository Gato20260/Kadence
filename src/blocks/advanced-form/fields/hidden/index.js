/**
 * External dependencies
 */
import { hiddenInputIcon } from '@kadence/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';


/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

registerBlockType('kadence/advanced-form-hidden', {
	...metadata,
	title: __( 'Hidden Field', 'kadence-blocks' ),
	description: __( 'Kadence Form hidden field', 'kadence-blocks' ),
	keywords: [
		'kadence',
	],
	icon: {
		src: hiddenInputIcon,
	},
	edit,
	save: () => null,
});
