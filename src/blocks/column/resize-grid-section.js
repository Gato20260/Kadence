/**
 * BLOCK Section: Kadence Row / Layout Overlay
 */

import memoize from 'memize';

import { KadenceColorOutput, getPreviewSize } from '@kadence/helpers';

import { ToggleControl, SelectControl, ToolbarGroup, TabPanel, ResizableBox, Icon } from '@wordpress/components';
import { dragHandle } from '@wordpress/icons';
import { Fragment, useEffect, useMemo, useState } from '@wordpress/element';
import { withSelect, withDispatch, useSelect, useDispatch } from '@wordpress/data';
import Draggable from 'react-draggable';
/**
 * Build the row edit
 */
function ResizeGridSection(props) {
	const { attributes, setAttributes, clientId, context } = props;
	const [moveGrid, setMoveGrid] = useState([25, 25]);
	const [transform, setTransform] = useState(attributes?.dragTransform ? attributes.dragTransform : [0, 0]);
	const { previewDevice } = useSelect(
		(select) => {
			return {
				previewDevice: select('kadenceblocks/data').getPreviewDeviceType(),
			};
		},
		[clientId]
	);
	useEffect(() => {
		console.log('transfrom', attributes?.dragTransform);
		console.log('transfromState', transform);
	}, [clientId]);
	let displayGrid = true;
	// if (undefined !== context.gridResize && false === context.gridResize) {
	// 	displayGrid = true;
	// }
	if (!displayGrid) {
		return props.children;
	}
	return (
		<Draggable
			handle=".grid-section-move-handle"
			defaultPosition={{ x: transform[0], y: transform[1] }}
			position={null}
			grid={moveGrid}
			scale={1}
			onStart={(value, ui) => {
				console.log(attributes.dragTransform);
				console.log(value);
			}}
			onDrag={(value, ui) => {
				setTransform([ui.x, ui.y]);
				console.log('DRAG');
				console.log(value);
				console.log(ui);
			}}
			onStop={(value, ui) => {
				console.log('STOP');
				console.log(value);
				console.log(ui);
				setTransform([ui.x, ui.y]);
				setAttributes({ dragTransform: [ui.x, ui.y] });
				// const parentEl = document.querySelector( `[data-block="${ parentBlockClientId }"] > .innerblocks-wrap` )
				// const parentWidth = parentEl.clientWidth/12;
				// const parentHeight = parentEl.clientHeight/6;
				// setMoveGrid( [parentWidth, parentHeight ])
			}}
			style={{ transform: `translate(${transform[0]}, ${transform[1]})` }}
		>
			<div className="grid-section-resize">
				{props.children}
				<span className="grid-section-move-handle">
					<Icon icon={dragHandle} />
				</span>
			</div>
		</Draggable>
	);
}
export default ResizeGridSection;
