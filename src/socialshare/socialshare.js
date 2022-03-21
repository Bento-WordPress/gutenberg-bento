import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import save from './save';

export const settings = {
	edit,
	save,
};

registerBlockType(metadata.name, settings);
