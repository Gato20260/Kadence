/**
 * Internal dependencies
 */
import FormFieldLabel from '../../label';

/**
 * WordPress dependencies
 */
import { TextControl, TextareaControl, Button, ToggleControl, Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { KadencePanelBody, InspectorControlTabs, ResponsiveRangeControls, FormInputControl } from '@kadence/components';
import {
	useEffect,
	useState,
	useMemo,
} from '@wordpress/element';
import {
	getUniqueId,
	getPreviewSize,
} from '@kadence/helpers';
import classNames from 'classnames';
import { DuplicateField, FieldBlockAppender, FieldName } from '../../components';
import { times } from 'lodash';

function FieldCheckbox( { attributes, setAttributes, isSelected, clientId, context, name } ) {

	const {
		uniqueID,
		required,
		label,
		showLabel,
		defaultValue,
		options,
		helpText,
		ariaDescription,
		maxWidth,
		maxWidthUnit,
		minWidth,
		minWidthUnit,
		defaultParameter,
		placeholder,
		inputName,
		requiredMessage,
		kadenceDynamic,
	} = attributes;

	const [ rerender, setRerender ] = useState( 0 );
	const [ activeTab, setActiveTab ] = useState( 'general' );
	const { addUniqueID } = useDispatch( 'kadenceblocks/data' );
	const { isUniqueID, isUniqueBlock, previewDevice } = useSelect(
		( select ) => {
			return {
				isUniqueID   : ( value ) => select( 'kadenceblocks/data' ).isUniqueID( value ),
				isUniqueBlock: ( value, clientId ) => select( 'kadenceblocks/data' ).isUniqueBlock( value, clientId ),
				previewDevice: select( 'kadenceblocks/data' ).getPreviewDeviceType(),
			};
		},
		[ clientId ],
	);

	useEffect( () => {
		let uniqueId = getUniqueId( uniqueID, clientId, isUniqueID, isUniqueBlock );
		setAttributes( { uniqueID: uniqueId } );
		addUniqueID( uniqueId, clientId );
	}, [ rerender ] );

	const previewMaxWidth = getPreviewSize( previewDevice, ( maxWidth && maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ), ( maxWidth && maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), ( maxWidth && maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) );
	const previewMinWidth = getPreviewSize( previewDevice, ( minWidth && minWidth[ 0 ] ? minWidth[ 0 ] : '' ), ( minWidth && minWidth[ 1 ] ? minWidth[ 1 ] : '' ), ( minWidth && minWidth[ 2 ] ? minWidth[ 2 ] : '' ) );
	const classes = classNames( {
		'kb-adv-form-field': true,
	} );
	const blockProps = useBlockProps( {
		className: classes,
		style    : {
			maxWidth: '' !== previewMaxWidth ? previewMaxWidth + ( maxWidthUnit ? maxWidthUnit : '%' ) : undefined,
			minWidth: '' !== previewMinWidth ? previewMinWidth + ( minWidthUnit ? minWidthUnit : 'px' ) : undefined,
		},
	} );
	const defaultPreview = useMemo( () => {
		if ( undefined !== kadenceDynamic && undefined !== kadenceDynamic[ 'defaultValue' ] && undefined !== kadenceDynamic[ 'defaultValue' ]?.enable && '' !== kadenceDynamic[ 'defaultValue' ].enable && true === kadenceDynamic[ 'defaultValue' ].enable ) {
			return kadenceDynamic?.[ 'defaultValue' ]?.field ? '{' + kadenceDynamic[ 'defaultValue' ].field + '}' : '';
		}
		return attributes?.defaultValue ? attributes.defaultValue : '';
	}, [ kadenceDynamic, defaultValue ] );

	const updateOption = ( index, value ) => {
		const newOptions = options.map( ( item, iteration ) => {
			if ( index === iteration ) {
				item = { ...item, ...value };
			}
			return item;
		} );

		setAttributes( {
			options: newOptions,
		} );
		setRerender( Math.random() );
	};

	const toggleSelected = ( index, value ) => {
		updateOption( index, { selected: !options[ index ].selected } );
	};

	function onOptionMoveUp( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			onOptionMove( oldIndex, oldIndex - 1 );
		};
	}

	function onOptionMoveDown( oldIndex ) {
		return () => {
			if ( oldIndex === options.length - 1 ) {
				return;
			}
			onOptionMove( oldIndex, oldIndex + 1 );
		};
	}

	function onOptionMove( oldIndex, newIndex ) {
		if ( !options ) {
			return;
		}

		let tmpValue = options[ newIndex ];

		options.splice( newIndex, 1, options[ oldIndex ] );
		options.splice( oldIndex, 1, tmpValue );

		setAttributes( { options: options } );
	}

	const removeOptionItem = ( previousIndex ) => {
		const amount = Math.abs( options.length );
		if ( amount === 1 ) {
			return;
		}
		const currentItems = filter( options, ( item, i ) => previousIndex !== i );
		setAttributes( { options: currentItems } );
	};

	return (
		<>
			<style>
				{isSelected && (
					<>
						{`.block-editor-block-popover__inbetween-container .block-editor-block-list__insertion-point.is-with-inserter { display: none }`};
					</>
				)}
			</style>
			<div {...blockProps}>
				<DuplicateField
					clientId={ clientId }
					name={name}
					attributes={ attributes }
				/>
				<InspectorControls>

					<InspectorControlTabs
						panelName={'advanced-form-checkbox-general'}
						setActiveTab={ ( value ) => setActiveTab( value ) }
						activeTab={ activeTab }
						allowedTabs={ [ 'general', 'advanced' ] }
					/>
					{ ( activeTab === 'general' ) &&
						<>
							<KadencePanelBody
								title={ __( 'Field Options', 'kadence-blocks') }
								initialOpen={true}
								panelName={ 'kb-adv-form-checkbox-options'}
							>
							<div className="kb-field-options-wrap">
								{times( options.length, n => (
									<div className="field-options-wrap">

										<hr/>

										<TextControl
											className={'kb-option-text-control'}
											key={n}
											label={__( 'Option', 'kadence-blocks' ) + ' ' + ( n + 1 )}
											placeholder={__( 'Option', 'kadence-blocks' )}
											value={( undefined !== options[ n ].label ? options[ n ].label : '' )}
											onChange={( text ) => updateOption( n, { label: text } )}
										/>
										<TextControl
											label={__( 'Value', 'kadence-blocks' )}
											placeholder={options[ n ].label}
											value={( undefined !== options[ n ].value ? options[ n ].value : '' )}
											onChange={( text ) => updateOption( n, { value: text } )}
										/>
										<div className="kadence-blocks-list-item__control-menu">
											<Button
												icon="arrow-up"
												onClick={n === 0 ? undefined : onOptionMoveUp( n )}
												className="kadence-blocks-list-item__move-up"
												label={__( 'Move Item Up' )}
												aria-disabled={n === 0}
												disabled={n === 0}
											/>
											<Button
												icon="arrow-down"
												onClick={( n + 1 ) === options.length ? undefined : onOptionMoveDown( n )}
												className="kadence-blocks-list-item__move-down"
												label={__( 'Move Item Down' )}
												aria-disabled={( n + 1 ) === options.length}
												disabled={( n + 1 ) === options.length}
											/>
											<Button
												icon="no-alt"
												onClick={() => removeOptionItem( n )}
												className="kadence-blocks-list-item__remove"
												label={__( 'Remove Item' )}
												disabled={1 === options.length}
											/>
										</div>
									</div>
								) )}
							</div>
							<Button
								className="kb-add-option"
								isPrimary={true}
								onClick={() => {
									const newOptions = options;
									newOptions.push( {
										value: '',
										label: '',
									} );
									setAttributes( { options: newOptions } );
									setRerender( Math.random() );
								}}
							>
								<Dashicon icon="plus"/>
								{__( 'Add Option', 'kadence-blocks' )}
							</Button>
							</KadencePanelBody>
							<KadencePanelBody
								title={__( 'Field Controls', 'kadence-blocks' )}
								initialOpen={false}
								panelName={ 'kb-adv-form-checkbox-controls' }
							>
								<ToggleControl
									label={__( 'Required', 'kadence-blocks' )}
									checked={required}
									onChange={( value ) => setAttributes( { required: value } )}
								/>
								<TextControl
									label={__( 'Field Label', 'kadence-blocks' )}
									value={label}
									onChange={( value ) => setAttributes( { label: value } )}
								/>
								<ToggleControl
									label={__( 'Show Label', 'kadence-blocks' )}
									checked={showLabel}
									onChange={( value ) => setAttributes( { showLabel: value } )}
								/>
								<TextareaControl
									label={__( 'Description', 'kadence-blocks' )}
									help={ __( 'This will be displayed under the input and can be used to provide direction on how the field should be filled out.', 'kadence-blocks' )}
									value={helpText}
									onChange={( value ) => setAttributes( { helpText: value } )}
								/>
								<TextControl
									label={__( 'Field Placeholder', 'kadence-blocks' )}
									value={placeholder}
									onChange={( value ) => setAttributes( { placeholder: value } )}
								/>
								<FormInputControl
									label={__( 'Default Value', 'kadence-blocks' )}
									value={defaultValue}
									preview={ defaultPreview }
									onChange={( value ) => setAttributes( { defaultValue: value } )}
									dynamicAttribute={'defaultValue'}
									allowClear={true}
									isSelected={ isSelected }
									attributes={ attributes }
									setAttributes={ setAttributes }
									name={ name }
									clientId={ clientId }
									context={ context }
								/>
							</KadencePanelBody>
						</>
					}
					{ ( activeTab === 'advanced' ) &&
						<>
							<KadencePanelBody
								title={__( 'Field Width', 'kadence-blocks' )}
								initialOpen={true}
								panelName={ 'kb-adv-form-checkbox-width' }
							>
								<ResponsiveRangeControls
									label={__( 'Max Width', 'kadence-blocks' )}
									value={( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' )}
									onChange={value => {
										setAttributes( { maxWidth: [ value, ( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), ( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) ] } );
									}}
									tabletValue={( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' )}
									onChangeTablet={( value ) => {
										setAttributes( { maxWidth: [ ( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ), value, ( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' ) ] } );
									}}
									mobileValue={( undefined !== maxWidth && undefined !== maxWidth[ 2 ] ? maxWidth[ 2 ] : '' )}
									onChangeMobile={( value ) => {
										setAttributes( { maxWidth: [ ( undefined !== maxWidth && undefined !== maxWidth[ 0 ] ? maxWidth[ 0 ] : '' ), ( undefined !== maxWidth && undefined !== maxWidth[ 1 ] ? maxWidth[ 1 ] : '' ), value ] } );
									}}
									min={0}
									max={( maxWidthUnit === 'px' ? 2000 : 100 )}
									step={1}
									unit={maxWidthUnit ? maxWidthUnit : '%'}
									onUnit={( value ) => {
										setAttributes( { maxWidthUnit: value } );
									}}
									units={[ 'px', '%', 'vw' ]}
								/>
								<ResponsiveRangeControls
									label={__( 'Min Width', 'kadence-blocks' )}
									value={( undefined !== minWidth && undefined !== minWidth[ 0 ] ? minWidth[ 0 ] : '' )}
									onChange={value => {
										setAttributes( { minWidth: [ value, ( undefined !== minWidth && undefined !== minWidth[ 1 ] ? minWidth[ 1 ] : '' ), ( undefined !== minWidth && undefined !== minWidth[ 2 ] ? minWidth[ 2 ] : '' ) ] } );
									}}
									tabletValue={( undefined !== minWidth && undefined !== minWidth[ 1 ] ? minWidth[ 1 ] : '' )}
									onChangeTablet={( value ) => {
										setAttributes( { minWidth: [ ( undefined !== minWidth && undefined !== minWidth[ 0 ] ? minWidth[ 0 ] : '' ), value, ( undefined !== minWidth && undefined !== minWidth[ 2 ] ? minWidth[ 2 ] : '' ) ] } );
									}}
									mobileValue={( undefined !== minWidth && undefined !== minWidth[ 2 ] ? minWidth[ 2 ] : '' )}
									onChangeMobile={( value ) => {
										setAttributes( { minWidth: [ ( undefined !== minWidth && undefined !== minWidth[ 0 ] ? minWidth[ 0 ] : '' ), ( undefined !== minWidth && undefined !== minWidth[ 1 ] ? minWidth[ 1 ] : '' ), value ] } );
									}}
									min={0}
									max={( minWidthUnit === 'px' ? 2000 : 100 )}
									step={1}
									unit={minWidthUnit ? minWidthUnit : 'px'}
									onUnit={( value ) => {
										setAttributes( { minWidthUnit: value } );
									}}
									units={[ 'px', '%', 'vw' ]}
								/>
							</KadencePanelBody>
							<KadencePanelBody
								title={__( 'Extra Settings', 'kadence-blocks' )}
								initialOpen={false}
								panelName={ 'kb-adv-form-checkbox-extra-settings' }
							>
								<FieldName
									value={inputName}
									uniqueID={uniqueID}
									onChange={( value ) => setAttributes( { inputName: value.replace(/[^a-z0-9-_]/gi, '') } ) }
								/>
								<TextControl
									label={__( 'Input aria description', 'kadence-blocks' )}
									value={ariaDescription}
									onChange={( value ) => setAttributes( { ariaDescription: value } )}
								/>
								{ required && (
									<TextControl
										label={__( 'Field error message when required', 'kadence-blocks' )}
										value={requiredMessage}
										onChange={( value ) => setAttributes( { requiredMessage: value } )}
										placeholder={( undefined !== label ? label : '' ) + ' ' + __( 'is required', 'kadence-blocks' )}
									/>
								)}
								<TextControl
									label={__( 'Populate with Parameter', 'kadence-blocks' )}
									help={ __( 'Enter a parameter that can be used in the page url to dynamically populate the field.', 'kadence-blocks' ) }
									value={defaultParameter}
									onChange={( value ) => setAttributes( { defaultParameter: value } )}
								/>
							</KadencePanelBody>
						</>
					}

				</InspectorControls>
				<>
					<FormFieldLabel
						required={required}
						label={label}
						showLabel={showLabel}
						setAttributes={setAttributes}
						isSelected={isSelected}
						name={name}
					/>

					{isSelected ?
						<div className={'kb-form-field kb-form-multi'}>
							{times( options.length, n => (
								<div className={'kb-checkbox-item'} key={n}>
									<input key={'cb' + n} type="checkbox" name={'kb_field'} className={'kb-sub-field kb-checkbox-style'} onChange={( value ) => toggleSelected( n, value.target.value )}
										   checked={options[ n ].selected}/>
									<input key={'text' + n} type={'text'} value={options[ n ].label} className={'ignore-field-styles'}
										   onChange={( value ) => updateOption( n, { label: value.target.value } )}/>
									<Button onClick={() => removeOptionItem( n )}>
										<span className="dashicons dashicons-trash"></span>
									</Button>
								</div>
							) )}

							<Button
								variant={'primary'}
								className={'kb-form-multi__add-option'}
								onClick={() => {
									const newOptions = options;
									newOptions.push( {
										value: '',
										label: '',
									} );
									setAttributes( { options: newOptions } );
									setRerender( Math.random() );
								}}
							>
								<Dashicon icon="plus"/>
								{__( 'Add Option', 'kadence-blocks' )}
							</Button>
						</div>
						:
						<>
							{times( options.length, n => (
								<div className={'kb-checkbox-item'} key={n}>
									<input type="checkbox" name={'kb_field'} className={'kb-sub-field kb-checkbox-style'} checked={options[ n ].selected}/>
									<label htmlFor={'kb_field'}>{options[ n ].label}</label>
								</div>
							) )}
						</>
					}

					{helpText && <span className="kb-form-field-help">{helpText}</span>}

				</>
				<FieldBlockAppender inline={true} className="kb-custom-inbetween-inserter" getRoot={clientId}/>
			</div>
		</>
	);
}

export default FieldCheckbox;
