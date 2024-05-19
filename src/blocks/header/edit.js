/**
 * BLOCK: Kadence Advanced Header
 */

/**
 * Import Css
 */
import './editor.scss';
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { isEmpty, get } from 'lodash';
import { useSelect, useDispatch } from '@wordpress/data';
import { formBlockIcon, formTemplateContactIcon } from '@kadence/icons';
import { KadencePanelBody, SelectPostFromPostType } from '@kadence/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Placeholder, Spinner } from '@wordpress/components';
import { store as coreStore, EntityProvider, useEntityProp, useEntityBlockEditor } from '@wordpress/core-data';

import { useEntityAutoDraft } from './hooks';
import { SelectOrCreatePlaceholder } from './components';
import { getUniqueId, getPostOrFseId, getPreviewSize } from '@kadence/helpers';

/**
 * Internal dependencies
 */
import EditInner from './edit-inner';
import { useEffect, Fragment, useState, useMemo } from '@wordpress/element';

export function Edit(props) {
	const { attributes, setAttributes, isSelected, clientId } = props;

	const { id, uniqueID } = attributes;

	const [meta, setMeta] = useHeaderProp('meta', id);

	const metaAttributes = {
		isSticky: meta?._kad_header_isSticky,
		isStickyTablet: meta?._kad_header_isStickyTablet,
		isStickyMobile: meta?._kad_header_isStickyMobile,
		isTransparent: meta?._kad_header_isTransparent,
		isTransparentTablet: meta?._kad_header_isTransparentTablet,
		isTransparentMobile: meta?._kad_header_isTransparentMobile,
	};

	const { isSticky, isStickyTablet, isStickyMobile, isTransparent, isTransparentTablet, isTransparentMobile } =
		metaAttributes;

	const { previewDevice } = useSelect(
		(select) => {
			return {
				previewDevice: select('kadenceblocks/data').getPreviewDeviceType(),
			};
		},
		[clientId]
	);

	const { post, postExists, isLoading, currentPostType, postId } = useSelect(
		(select) => {
			return {
				post: id && select(coreStore).getEditedEntityRecord('postType', 'kadence_header', id),
				postExists: id && select(coreStore).getEntityRecord('postType', 'kadence_header', id),
				isLoading: select(coreStore).isResolving('getEntityRecord', ['postType', 'kadence_header', id]),
				currentPostType: select('core/editor')?.getCurrentPostType()
					? select('core/editor')?.getCurrentPostType()
					: '',
				postId: select('core/editor')?.getCurrentPostId() ? select('core/editor')?.getCurrentPostId() : '',
			};
		},
		[id]
	);

	const { addUniqueID } = useDispatch('kadenceblocks/data');
	const { isUniqueID, isUniqueBlock, parentData, isPreviewMode } = useSelect(
		(select) => {
			return {
				isUniqueID: (value) => select('kadenceblocks/data').isUniqueID(value),
				isUniqueBlock: (value, clientId) => select('kadenceblocks/data').isUniqueBlock(value, clientId),
				isPreviewMode: select('core/block-editor').getSettings().__unstableIsPreviewMode,
				parentData: {
					rootBlock: select('core/block-editor').getBlock(
						select('core/block-editor').getBlockHierarchyRootClientId(clientId)
					),
					postId: select('core/editor')?.getCurrentPostId() ? select('core/editor')?.getCurrentPostId() : '',
					reusableParent: select('core/block-editor').getBlockAttributes(
						select('core/block-editor').getBlockParentsByBlockName(clientId, 'core/block').slice(-1)[0]
					),
					editedPostId: select('core/edit-site') ? select('core/edit-site').getEditedPostId() : false,
				},
			};
		},
		[clientId]
	);

	let [blocks] = useEntityBlockEditor('postType', 'kadence_header', id);

	const headerInnerBlocks = useMemo(() => {
		return get(blocks, [0, 'innerBlocks'], []);
	}, [blocks]);

	const previewIsSticky = getPreviewSize(previewDevice, isSticky, isStickyTablet, isStickyMobile);
	const previewIsTransparent = getPreviewSize(previewDevice, isTransparent, isTransparentTablet, isTransparentMobile);
	const style =
		isSticky && isTransparent
			? 'sticky-transparent'
			: isSticky
			? 'sticky '
			: isTransparent
			? 'transparent'
			: 'standard';
	const styleTablet =
		isStickyTablet && isTransparentTablet
			? 'sticky-transparent'
			: isStickyTablet
			? 'sticky '
			: isTransparentTablet
			? 'transparent'
			: 'standard';
	const styleMobile =
		isStickyMobile && isTransparentMobile
			? 'sticky-transparent'
			: isStickyMobile
			? 'sticky '
			: isTransparentMobile
			? 'transparent'
			: 'standard';

	const blockClasses = classnames({
		'wp-block-kadence-header': true,
		[`wp-block-kadence-header${uniqueID}`]: uniqueID,
		[`header-desktop-sticky`]: isSticky == '1' && (!previewDevice || previewDevice == 'Desktop'),
		[`header-tablet-sticky`]: isStickyTablet == '1' && previewDevice == 'Tablet',
		[`header-mobile-sticky`]: isStickyMobile == '1' && previewDevice == 'Mobile',
		[`header-desktop-transparent`]: isTransparent == '1' && (!previewDevice || previewDevice == 'Desktop'),
		[`header-tablet-transparent`]: isTransparentTablet == '1' && previewDevice == 'Tablet',
		[`header-mobile-transparent`]: isTransparentMobile == '1' && previewDevice == 'Mobile',
	});

	const blockProps = useBlockProps({
		className: blockClasses,
	});

	if (isPreviewMode) {
		return <>{formTemplateContactIcon}</>;
	}

	useEffect(() => {
		const postOrFseId = getPostOrFseId(props, parentData);
		const uniqueId = getUniqueId(uniqueID, clientId, isUniqueID, isUniqueBlock, postOrFseId);
		if (uniqueId !== uniqueID) {
			attributes.uniqueID = uniqueId;
			setAttributes({ uniqueID: uniqueId });
			addUniqueID(uniqueId, clientId);
		} else {
			addUniqueID(uniqueId, clientId);
		}
		if (currentPostType === 'kadence_header') {
			// Lame workaround for gutenberg to prevent showing the block Validity error.
			window.wp.data.dispatch('core/block-editor').setTemplateValidity(true);
		}
	}, []);

	let mainBlockContent = (
		<>
			<div {...blockProps}>
				{/* No form selected or selected form was deleted from the site, display chooser */}
				{(id === 0 || (undefined === postExists && !isLoading)) && (
					<Chooser
						id={id}
						postExists={postExists}
						post={post}
						commit={(nextId) => setAttributes({ id: nextId })}
					/>
				)}

				{/* Form selected but not loaded yet, show spinner */}
				{id > 0 && isEmpty(post) && undefined === postExists && isLoading && (
					<>
						<Placeholder
							className="kb-select-or-create-placeholder"
							label={__('Kadence Heading', 'kadence-blocks')}
							icon={formBlockIcon}
						>
							<Spinner />
						</Placeholder>
						<InspectorControls>
							<KadencePanelBody
								panelName={'kb-advanced-form-selected-switch'}
								title={__('Selected Form', 'kadence-blocks')}
							>
								<SelectPostFromPostType
									postType="kadence_header"
									label={__('Selected Form', 'kadence-blocks')}
									hideLabelFromVision={true}
									onChange={(nextId) => {
										setAttributes({ id: parseInt(nextId) });
									}}
									value={id}
								/>
							</KadencePanelBody>
						</InspectorControls>
					</>
				)}
				{/* Form selected is in the trash */}
				{id > 0 && !isEmpty(post) && post.status === 'trash' && (
					<>
						<Placeholder
							className="kb-select-or-create-placeholder"
							label={__('Kadence Heading', 'kadence-blocks')}
							icon={formBlockIcon}
						>
							{__('The selected from is in the trash.', 'kadence-blocks')}
						</Placeholder>
						<InspectorControls>
							<KadencePanelBody
								panelName={'kb-advanced-form-selected-switch'}
								title={__('Selected Form', 'kadence-blocks')}
							>
								<SelectPostFromPostType
									postType="kadence_header"
									label={__('Selected Form', 'kadence-blocks')}
									hideLabelFromVision={true}
									onChange={(nextId) => {
										setAttributes({ id: parseInt(nextId) });
									}}
									value={id}
								/>
							</KadencePanelBody>
						</InspectorControls>
					</>
				)}

				{/* Form selected and loaded, display it */}
				{id > 0 && !isEmpty(post) && post.status !== 'trash' && (
					<EntityProvider kind="postType" type="kadence_header" id={id}>
						<EditInner {...props} direct={false} id={id} />
					</EntityProvider>
				)}
			</div>
		</>
	);

	//Directly editing from via kadence_header post type
	if (currentPostType === 'kadence_header') {
		mainBlockContent = (
			<>
				<div {...blockProps}>
					<EditInner {...props} direct={true} id={postId} />
				</div>
			</>
		);
	}

	if (previewIsTransparent) {
		return <div className="kb-header-transparent-placeholder">{mainBlockContent}</div>;
	}
	return mainBlockContent;
}

export default Edit;

function Chooser({ id, post, commit, postExists }) {
	const [isAdding, addNew] = useEntityAutoDraft('kadence_header', 'kadence_header');
	const onAdd = async () => {
		try {
			const response = await addNew();
			commit(response.id);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SelectOrCreatePlaceholder
			postType="kadence_header"
			label={__('Advanced Header', 'kadence-blocks')}
			instructions={__('Select an existing header or create a new one.', 'kadence-blocks')}
			placeholder={__('Select header', 'kadence-blocks')}
			onSelect={commit}
			isSelecting={id && isEmpty(post) && undefined !== postExists}
			onAdd={onAdd}
			isAdding={isAdding}
		/>
	);
}

function useHeaderProp(prop, postId) {
	return useEntityProp('postType', 'kadence_header', prop, postId);
}
