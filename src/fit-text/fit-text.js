/* This JS is only used in the editor. */

import { registerBlockType } from '@wordpress/blocks';
import { alignJustify as icon } from '@wordpress/icons';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

export const settings = {
	icon,
	example: {
		attributes: {
			content: 'Love all, trust a few, do wrong to none.',
			minFontSize: '10px',
			maxFontSize: '200px',
		},
	},
	edit,
	save,
	transforms,
};

registerBlockType(metadata.name, settings);
