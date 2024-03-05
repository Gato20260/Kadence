/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { store, mapMarker, desktop } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BusinessBg from '../assets/business-bg.jpg';
import EducationBg from '../assets/education-bg.jpg';
import SpaBg from '../assets/spa-bg.jpg';
import TaxesBg from '../assets/taxes-bg.jpg';

export const SEARCH_APP_ID = 'A3VQNQXTF3';
export const SEARCH_API_KEY = 'cc59dfc943ec5810607801b4247d449e';
export const SEARCH_INDEX = 'ai_modal_industries';
export const API_MAX_ATTEMPTS = 3;
export const API_ROUTE_GET_COLLECTIONS = '/kb-design-library/v1/get_image_collections';
export const API_ROUTE_GET_IMAGES = '/kb-design-library/v1/get_images';
export const API_ROUTE_GET_VERTICALS = '/kb-design-library/v1/get_verticals';
export const COLLECTION_REQUEST_IMAGE_TYPE = 'JPEG';
export const API_URL = 'https://content.startertemplatecloud.com/wp-json/prophecy/v1/';
export const API_ROUTE_GET_KEYWORDS = '/kb-design-library/v1/get_keywords';
export const API_ROUTE_GET_SEARCH_QUERY = '/kb-design-library/v1/get_search_query';

export const CONTENT_TONE = [
	{
		value: 'NEUTRAL',
		label: __('Neutral', 'kadence-blocks'),
	},
	{
		value: 'PROFESSIONAL',
		label: __('Professional', 'kadence-blocks'),
	},
	{
		value: 'FRIENDLY',
		label: __('Friendly', 'kadence-blocks'),
	},
	{
		value: 'INFORMATIVE',
		label: __('Informative', 'kadence-blocks'),
	},
	{
		value: 'ENGAGING',
		label: __('Engaging', 'kadence-blocks'),
	},
	{
		value: 'TRUSTWORTHY',
		label: __('Trustworthy', 'kadence-blocks'),
	},
	{
		value: 'CONVERSATIONAL',
		label: __('Conversational', 'kadence-blocks'),
	},
	{
		value: 'PERSUASIVE',
		label: __('Persuasive', 'kadence-blocks'),
	},
	{
		value: 'UPBEAT',
		label: __('Upbeat', 'kadence-blocks'),
	},
	{
		value: 'FUNNY',
		label: __('Funny', 'kadence-blocks'),
	},
	{
		value: 'INSPIRATIONAL',
		label: __('Inspirational', 'kadence-blocks'),
	},
];

export const VERTICALS_SESSION_KEY = 'kadence_ai_verticals';
export const COLLECTIONS_SESSION_KEY = 'kadence_ai_collections';
export const COLLECTIONS_CUSTOM_SESSION_KEY = 'kadence_ai_custom_collections';

export const COLLECTION_REQUEST_BODY = {
	image_type: 'JPEG',
	sizes: [
		{
			id: 'medium_square',
			width: 600,
			height: 600,
			crop: true,
		},
		{
			id: 'download',
			width: 2048,
			height: 2048,
			crop: false,
		},
	],
};

export const ENTITY_TYPE_COMPANY = 'COMPANY';
export const ENTITY_TYPE_INDIVIDUAL = 'INDIVIDUAL';
export const ENTITY_TYPE_ORGANIZATION = 'ORGANIZATION';

export const ENTITY_TYPE = [
	{
		value: ENTITY_TYPE_COMPANY,
		label: __('A Company', 'kadence-blocks'),
	},
	{
		value: ENTITY_TYPE_INDIVIDUAL,
		label: __('An Individual', 'kadence-blocks'),
	},
	{
		value: ENTITY_TYPE_ORGANIZATION,
		label: __('An Organization', 'kadence-blocks'),
	},
];
export const LANG_TYPE = [
	{
		value: 'da-DK',
		label: __('Danish (Denmark)', 'kadence-starter-templates'),
	},
	{
		value: 'nl-BE',
		label: __('Dutch (Belgium)', 'kadence-starter-templates'),
	},
	{
		value: 'nl-N',
		label: __('Dutch (Netherlands)', 'kadence-starter-templates'),
	},
	{
		value: 'en-AU',
		label: __('English (Australia)', 'kadence-starter-templates'),
	},
	{
		value: 'en-CA',
		label: __('English (Canada)', 'kadence-starter-templates'),
	},
	{
		value: 'en-IN',
		label: __('English (India)', 'kadence-starter-templates'),
	},
	{
		value: 'en-NZ',
		label: __('English (New Zealand)', 'kadence-starter-templates'),
	},
	{
		value: 'en-GB',
		label: __('English (UK)', 'kadence-starter-templates'),
	},
	{
		value: 'en-US',
		label: __('English (US)', 'kadence-starter-templates'),
	},
	{
		value: 'fr-BE',
		label: __('French (Belgium)', 'kadence-starter-templates'),
	},
	{
		value: 'fr-CA',
		label: __('French (Canada)', 'kadence-starter-templates'),
	},
	{
		value: 'fr-FR',
		label: __('French (France)', 'kadence-starter-templates'),
	},
	{
		value: 'de-AT',
		label: __('German (Austria)', 'kadence-starter-templates'),
	},
	{
		value: 'de-BE',
		label: __('German (Belgium)', 'kadence-starter-templates'),
	},
	{
		value: 'de-DE',
		label: __('German (Germany)', 'kadence-starter-templates'),
	},
	{
		value: 'de-CH',
		label: __('German (Switzerland)', 'kadence-starter-templates'),
	},
	{
		value: 'it-IT',
		label: __('Italian (Italy)', 'kadence-starter-templates'),
	},
	{
		value: 'pt-BR',
		label: __('Portuguese (Brazil)', 'kadence-starter-templates'),
	},
	{
		value: 'pt-PT',
		label: __('Portuguese (Portugal)', 'kadence-starter-templates'),
	},
	{
		value: 'es-AR',
		label: __('Spanish (Argentina)', 'kadence-starter-templates'),
	},
	{
		value: 'es-CO',
		label: __('Spanish (Colombia)', 'kadence-starter-templates'),
	},
	{
		value: 'es-419',
		label: __('Spanish (Latin America)', 'kadence-starter-templates'),
	},
	{
		value: 'es-MX',
		label: __('Spanish (Mexico)', 'kadence-starter-templates'),
	},
	{
		value: 'es-ES',
		label: __('Spanish (Spain)', 'kadence-starter-templates'),
	},
	{
		value: 'sv-SE',
		label: __('Swedish (Sweden)', 'kadence-starter-templates'),
	},
];

export const ENTITY_TO_NAME = {
	COMPANY: {
		label: __('Company Name', 'kadence-blocks'),
		placeholder: __('Your Company', 'kadence-blocks'),
	},
	INDIVIDUAL: {
		label: __('Name', 'kadence-blocks'),
		placeholder: __('Your Name', 'kadence-blocks'),
	},
	ORGANIZATION: {
		label: __('Organization Name', 'kadence-blocks'),
		placeholder: __('Your Organization', 'kadence-blocks'),
	},
};

export const LOCATION_BUSINESS_ADDRESS = 'Business Address';
export const LOCATION_SERVICE_AREA = 'Service Area';
export const LOCATION_ONLINE_ONLY = 'Online Only';

export const LOCATION_TYPES = [
	{
		icon: store,
		text: __('Business Address', 'kadence-blocks'),
		value: LOCATION_BUSINESS_ADDRESS,
		help: __('E.g.: 1234 Street #1, Chicago, IL 60076, USA', 'kadence-blocks'),
		placeholder: __('Street Adress, City, State, Zipcode, Country', 'kadence-blocks'),
	},
	{
		icon: mapMarker,
		text: __('Service Area', 'kadence-blocks'),
		value: LOCATION_SERVICE_AREA,
		help: __('E.g.: Chicago, USA', 'kadence-blocks'),
		placeholder: __('District, City, State, Zipcode, Country', 'kadence-blocks'),
	},
	{
		icon: desktop,
		text: __('Online Only', 'kadence-blocks'),
		value: LOCATION_ONLINE_ONLY,
		help: '',
		placeholder: '',
	},
];

export const MISSION_STATEMENT_GOAL = 300;

export const MISSION_STATEMENT_STATUS = {
	initial: {
		color: '#757575',
		message: __('The more detail you add, the better.', 'kadence-blocks'),
	},
	weak: {
		color: '#DF3416',
		message: __('For better, more accurate copy enter a bit more content.', 'kadence-blocks'),
	},
	medium: {
		color: '#B35F00',
		message: __('This is a great start. Try adding a bit more information to your description.', 'kadence-blocks'),
	},
	strong: {
		color: '#1B8F6D',
		message: __('Excellent work! Want to add more? Keep going! More info means better content.', 'kadence-blocks'),
	},
	enough: {
		color: '#1B8F6D',
		message: __('Excellent work! You have added enough information.', 'kadence-blocks'),
	},
	less: {
		color: '#B35F00',
		message: __(
			"ok, you've added a lot of information. Try removing some to get better results.",
			'kadence-blocks'
		),
	},
	muchLess: {
		color: '#DF3416',
		message: __("You've added too much information. Remove some to move forward.", 'kadence-blocks'),
	},
};

export const INDUSTRY_BACKGROUNDS = [SpaBg, BusinessBg, TaxesBg, EducationBg];

export const THOUGHT_STARTERS = {
	INDIVIDUAL: [
		'What is your core offering or skill?',
		'Tell your story. Be sure to feature your expertise and standout skills.',
		'Describe your process, services, or products you offer.',
		'What makes you stand out? Highlight your competitive edge and the value you bring?',
		'Do you have work and recognitions to highlight?',
		'What is the action you want visitors to take?',
	],
	COMPANY: [
		'What is your core offering or business purpose?',
		'What products and services do your offer?',
		'Describe your team and/or brand story.',
		'Highlight relevant numbers or statistics that support your value or impact.',
		'What makes you stand out in your industry? Highlight your competitive edge and the value you bring.',
		'List any notable partnerships.',
		'What is the action you want visitors to take?',
	],
	ORGANIZATION: [
		"What is your organization's purpose? How does your history and mission support that?",
		'Describe your team and/or brand story.',
		'Highlight relevant numbers or statistics that support your value or impact.',
		'Do you offer any services or products?',
		'List any notable partnerships.',
		'What is the action you want visitors to take?',
	],
};

export const KEYWORD_SUGGESTION_STATES = {
	loading: 'loading',
	notFound: 'notFound',
	error: 'error',
	success: 'success',
	allAdded: 'allAdded',
};
