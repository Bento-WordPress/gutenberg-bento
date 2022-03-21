/**
 * WordPress dependencies
 */
import { InnerBlocks, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {
	__experimentalUseEntityRecords as useEntityRecords,
} from '@wordpress/core-data';

export default function save( { attributes: { templatePartId } } ) {
	const uuid = uuidv4();
	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( {
				} ),
			) }
		>
			<button id={ `opener-${ uuid }` }>
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
			<bento-sidebar id={ `sidebar-${ uuid }` } side="left" hidden
										 data-opener-id={ `opener-${ uuid }` }>
				<InnerBlocks.Content/>
			</bento-sidebar>
		</div>
	);
}

// hack
function uuidv4() {
	return ( [1e7] + - 1e3 + - 4e3 + - 8e3 + - 1e11 ).replace( /[018]/g, c =>
		( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 ),
	);
}
