import { useState } from '@wordpress/element';
import { Dashicon, Tooltip, SelectControl, Button, Modal, ToggleControl } from '@wordpress/components';
import { map } from 'lodash';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

function KadenceSetting(props) {
	const { slug, label, type, theDefault } = props;

	const [isSaving, setIsSaving] = useState(false);
	const [settings, setSettings] = useState(
		kadence_blocks_params.globalSettings ? JSON.parse(kadence_blocks_params.globalSettings) : {}
	);
	const { createErrorNotice } = useDispatch(noticesStore);

	const saveConfig = (key, value) => {
		setIsSaving(true);
		// console.log('saveConfig', key, value);
		const config = kadence_blocks_params.globalSettings ? JSON.parse(kadence_blocks_params.globalSettings) : {};
		config[key] = value;
		const settingModel = new wp.api.models.Settings({ kadence_blocks_settings: JSON.stringify(config) });

		settingModel.save().then((response) => {
			createErrorNotice(__('Settings saved', 'kadence-blocks'), {
				type: 'snackbar',
			});

			setIsSaving(false);
			setSettings(config);
			kadence_blocks_params.globalSettings = JSON.stringify(config);
		});
	};

	return (
		<>
			{type == 'toggle' && (
				<ToggleControl
					label={label}
					isBusy={isSaving}
					checked={
						undefined !== settings?.[slug] && !theDefault === settings?.[slug] ? !theDefault : theDefault
					}
					onChange={(value) => saveConfig(slug, value)}
				/>
			)}
		</>
	);
}

export default KadenceSetting;
