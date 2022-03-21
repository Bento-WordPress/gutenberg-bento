import { createBlock } from '@wordpress/blocks';
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: ['core/paragraph'],
			transform: (attributes) => createBlock(metadata.name, attributes),
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/paragraph'],
			transform: (attributes) =>
				createBlock('core/paragraph', attributes),
		},
	],
};

export default transforms;
