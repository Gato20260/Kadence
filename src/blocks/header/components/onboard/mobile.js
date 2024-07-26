import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import * as MobileIcons from './icons/mobile';

const HeaderMobile = ({ data, onChange }) => {
	const [hoveredOption, setHoveredOption] = useState(null);

	useEffect(() => {
		if (data.meta.isValid && (!data.headerMobile || data.headerMobile === '')) {
			onChange({ ...data, meta: { ...data.meta, isValid: false } });
		} else if (!data.meta.isValid && data.headerMobile && data.headerMobile !== '') {
			onChange({ ...data, meta: { ...data.meta, isValid: true } });
		}
	}, [data, onChange]);

	const basicOptions = {
		'mobile-1': {
			title: __('Mobile 1', 'kadence-blocks'),
			icon: <MobileIcons.Mobile1 />,
			iconHover: <MobileIcons.Mobile1Hover />,
		},
		'mobile-2': {
			title: __('Mobile 2', 'kadence-blocks'),
			icon: <MobileIcons.Mobile2 />,
			iconHover: <MobileIcons.Mobile2Hover />,
		},
		'mobile-3': {
			title: __('Mobile 3', 'kadence-blocks'),
			icon: <MobileIcons.Mobile3 />,
			iconHover: <MobileIcons.Mobile3Hover />,
		},
		'mobile-4': {
			title: __('Mobile 4', 'kadence-blocks'),
			icon: <MobileIcons.Mobile4 />,
			iconHover: <MobileIcons.Mobile4Hover />,
		},
	};

	return (
		<div className={'body'}>
			<div className="width-l">
				<h1>{__('Mobile Layout', 'kadence-blocks')}</h1>
				<p>{__('Choose a header layout for mobile.', 'kadence-blocks')}</p>

				<div className="type-selection">
					<Button className="basic" isPressed={true}>
						{__('Basic', 'kadence-blocks')}
					</Button>
				</div>

				<div className="options options-mobile">
					<div
						className={'option blank' + (data.headerMobile === 'blank' ? ' is-selected' : '')}
						onClick={() => onChange({ headerMobile: 'blank' })}
					>
						<Button>{__('Create blank mobile header.', 'kadence-blocks')}</Button>
					</div>

					{Object.keys(basicOptions).map((key) => (
						<div key={key} className={'option'}>
							<div
								className={'option-image' + (data.headerMobile === key ? ' is-selected' : '')}
								onClick={() => onChange({ headerMobile: key })}
								onMouseEnter={() => setHoveredOption(key)}
								onMouseLeave={() => setHoveredOption(null)}
							>
								{hoveredOption === key ? basicOptions[key].iconHover : basicOptions[key].icon}
							</div>
							<span>{basicOptions[key].title}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HeaderMobile;
