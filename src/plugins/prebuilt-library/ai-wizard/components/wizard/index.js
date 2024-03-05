/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useRef } from '@wordpress/element';
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { focus } from '@wordpress/dom';

/**
 * Internal dependencies
 */
import { Button } from '../button';
import { StepperIcon } from './stepper-icon';
import { useDatabase } from '../../hooks/use-database';
import { useKadenceAi } from '../../context/kadence-ai-provider';
import './wizard.scss';

export function Wizard({
	className,
	contentLabel,
	logo,
	backButtonText = __('Back', 'kadence-blocks'),
	forwardButtonText = __('Next', 'kadence-blocks'),
	backButtonDisabled = false,
	forwardButtonDisabled = false,
	onPageChange = () => {},
	onClose = () => {},
	onPrimaryClick = () => {},
	primaryButtonText = __('Save', 'kadence-blocks'),
	primaryButtonDisabled = false,
	onSecondaryClick,
	secondaryButtonText,
	credits = '',
	photographyOnly,
	pages = [],
	isFullScreen = false,
}) {
	const guideContainer = useRef(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [completed, setCompleted] = useState(new Set());
	const { saveAiWizardData } = useDatabase();
	useEffect(() => {
		// Communicate current page index.
		onPageChange && onPageChange(currentPage);

		// Each time we change the current page, start from the first element of the page.
		// This also solves any focus loss that can happen.
		if (guideContainer.current) {
			focus.tabbable.find(guideContainer.current)[0]?.focus();
		}
	}, [currentPage]);
	const pageId = pages && pages?.[currentPage]?.id ? pages[currentPage].id : `page-${currentPage}`;

	const canGoBack = currentPage > 0;
	const canGoForward = currentPage < pages.length - 1;

	const isStepCompleted = (step) => {
		return completed.has(step);
	};

	const isStepDisabled = (step) => {
		return step > completed.size ? true : null;
	};

	const goBack = () => {
		if (canGoBack) {
			setCurrentPage(currentPage - 1);
		}
	};
	const { state, dispatch } = useKadenceAi();
	async function goForward() {
		if (!canGoForward) {
			return;
		}
		dispatch({ type: 'SET_SAVING', payload: true });

		const { firstTime, saving, saveError, ...rest } = state;

		const saveStatus = await saveAiWizardData({
			firstTime: false,
			...rest,
		});
		if (saveStatus) {
			dispatch({ type: 'SET_SAVING', payload: false });
			setCurrentPage(currentPage + 1);
			setCompleted((prevCompleted) => {
				const newCompleted = new Set(prevCompleted.values());
				newCompleted.add(currentPage);

				return newCompleted;
			});
		}
	}
	if (pages.length === 0) {
		return null;
	}

	return (
		<Modal
			title={logo}
			className={classnames('components-guide', 'stellarwp', className, pageId, {
				'is-fullscreen': isFullScreen,
			})}
			contentLabel={contentLabel}
			onRequestClose={onClose}
			ref={guideContainer}
		>
			<div className="components-guide__container">
				<div className="components-guide__page">
					{pages[currentPage].image}
					{pages[currentPage].content}
				</div>
			</div>
			<div className="components-guide__footer">
				{canGoBack && (
					<Button className="components-wizard__back-button" disabled={backButtonDisabled} onClick={goBack}>
						{backButtonText}
					</Button>
				)}
				{pages.length > 1 && (
					<ul className="components-guide__page-control" aria-label={__('Guide controls', 'kadence-blocks')}>
						{pages.map((page, index) => (
							<li
								key={index}
								// Set aria-current="step" on the active page, see https://www.w3.org/TR/wai-aria-1.1/#aria-current
								aria-current={index === currentPage ? 'step' : undefined}
							>
								<Button
									key={index}
									className={classnames('wizard-step', {
										'is-complete': isStepCompleted(index),
										'is-current': index === currentPage,
									})}
									disabled={isStepDisabled(index)}
									icon={
										<StepperIcon
											pageNumber={index + 1}
											isComplete={isStepCompleted(index)}
											isSelected={index === currentPage}
										/>
									}
									aria-label={sprintf(
										/* translators: 1: current page number 2: total number of pages */
										__('Page %1$d of %2$d', 'kadence-blocks'),
										index + 1,
										pages.length
									)}
									text={page.step}
									onClick={() => setCurrentPage(index)}
								/>
							</li>
						))}
					</ul>
				)}
				{canGoForward && (
					<Button
						variant="primary"
						className={'components-wizard__forward-button'}
						disabled={forwardButtonDisabled}
						onClick={goForward}
					>
						{forwardButtonText}
					</Button>
				)}
				{!canGoForward && (
					<div className="components-wizard__finish-button-container">
						{onSecondaryClick && typeof onSecondaryClick === 'function' ? (
							<Button
								variant="link"
								className={'components-wizard__secondary-button'}
								onClick={onSecondaryClick}
							>
								{secondaryButtonText ? secondaryButtonText : ''}
							</Button>
						) : null}
						{photographyOnly && (
							<Button
								variant="primary"
								className={'components-wizard__primary-button'}
								disabled={primaryButtonDisabled}
								onClick={onPrimaryClick}
							>
								{primaryButtonText}
							</Button>
						)}
						{!photographyOnly && (
							<div className="kt-generate-wrap">
								<Button
									variant="primary"
									className={'components-wizard__primary-button'}
									disabled={primaryButtonDisabled}
									onClick={onPrimaryClick}
								>
									{primaryButtonText + ' ' + __('(70 Credits)', 'kadence-blocks')}
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
}
