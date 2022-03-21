/**
 * WordPress dependencies
 */
import { InnerBlocks, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {
	__experimentalUseEntityRecords as useEntityRecords,
} from '@wordpress/core-data';

export default function save( { attributes: { templatePartId, side } } ) {
	const openerId = `opener-${ templatePartId.replace( /\//g, '-' ) }-${ side }`;
	return (
		<div
		>
			<button id={ openerId }>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="48px"
					viewBox="0 0 24 24"
					width="48px"
					fill="#000000"
				>
					<path d="M0 0h24v24H0V0z" fill="none"/>
					<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
				</svg>
			</button>
			<bento-sidebar
				id={ `sidebar-${ openerId }` } side={ side } hidden
				data-opener-id={ openerId }
				{ ...useInnerBlocksProps.save(
					useBlockProps.save( {} ),
				) }
			/>
		</div>
	);
}
