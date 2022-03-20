/* This JS is only used in the editor. */

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	example: {
		attributes: {
			fittedText: '',
			minFontSize: "10px",
			maxFontSize: "40px"
		},
	},
	edit,
	save,
};

registerBlockType('gutenberg-bento/fit-text', settings);