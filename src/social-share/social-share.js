import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import edit from './edit';
import save from './save';

export const settings = {
	metadata,
	edit,
	save,
};

registerBlockType( 'gutenberg-bento/social-share', settings );
