/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes: { templatePartId } } ) {
	console.log( templatePartId );
	const templatePart = useEntityRecord( 'postType', 'wp_template_part', templatePartId );
	console.log( 'templatePart', templatePart );
	const uuid = uuidv4();
	return (
		<div>
			<button id={ 'opener-' + uuid }>
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
			<bento-sidebar id="sidebar1" side="right" hidden data-opener-id={ 'opener-' + uuid }>
				<ul>
					<li>Nav item 1</li>
					<li>Nav item 2</li>
					<li>Nav item 3</li>
					<li>Nav item 4</li>
					<li>Nav item 5</li>
					<li>Nav item 6</li>
				</ul>
			</bento-sidebar>
		</div>
	);
	return (
		<bento-sidebar
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( {
					animate: animate ? 'true' : undefined,
					id,
				} ),
			) }
		/>
	);
}

// hack
function uuidv4() {
	return ( [1e7] + - 1e3 + - 4e3 + - 8e3 + - 1e11 ).replace( /[018]/g, c =>
		( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 ),
	);
}
