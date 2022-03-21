import {
	BlockControls,
	InnerBlocks,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useCallback, useEffect, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import {
	MenuGroup,
	MenuItemsChoice,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	__experimentalUseEntityRecords as useEntityRecords,
	useEntityBlockEditor,
} from '@wordpress/core-data';

const SIDEBAR_SECTION_BLOCK = 'gutenberg-bento/sidebar-section';
const ALLOWED_BLOCKS = [SIDEBAR_SECTION_BLOCK];
const TEMPLATE = [[SIDEBAR_SECTION_BLOCK]];

export default function Edit( { clientId, attributes: { templatePartId, side }, setAttributes } ) {
	const blockProps = useBlockProps();

	const { records: templateParts, status } = useEntityRecords( 'postType', 'wp_template_part' );
	const choices = useMemo(
		() =>
			templateParts?.map( ( { id, title } ) => ( {
				label: title?.rendered,
				value: id,
			} ) ),
		[templateParts],
	);

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{},
	);
	const [blocks, onInput, onChange] = useEntityBlockEditor(
		'postType',
		'wp_template_part',
		{ id: templatePartId },
	);

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		replaceInnerBlocks(
			clientId,
			blocks || [],
		);
		console.log( "Inner blocks", blocks );
	}, [blocks, templatePartId] );

	return (
		<>
			<div { ...blockProps }>
				<button id="open-sidebar">
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
			</div>
			<BlockControls>
				<ToolbarGroup className="wp-block-template-part__block-control-group">
					<ToolbarDropdownMenu
						label={ __( 'Select Template Part', 'gutenberg-bento' ) }
						text={ __( 'Select Template Part', 'gutenberg-bento' ) }
						icon={ null }
					>
						{ ( { onClose } ) => (
							<MenuGroup>
								<MenuItemsChoice
									value={ templatePartId }
									onSelect={ ( selectedValue ) => {
										setAttributes( { templatePartId: selectedValue } );
										onClose();
									} }
									choices={ choices }
								/>
							</MenuGroup>
						) }
					</ToolbarDropdownMenu>
				</ToolbarGroup>
				<ToolbarGroup className="wp-block-template-part__block-control-group">
					<ToolbarDropdownMenu
						label={ __( side === 'left' ? 'Left sidebar' : 'Right sidebar', 'gutenberg-bento' ) }
						text={ __( side === 'left' ? 'Left sidebar' : 'Right sidebar', 'gutenberg-bento' ) }
						icon={ null }
					>
						{ ( { onClose } ) => (
							<MenuGroup>
								<MenuItemsChoice
									value={ side }
									onSelect={ ( selectedValue ) => {
										setAttributes( { side: selectedValue } );
										onClose();
									} }
									choices={ [
										{ label: __( 'Left sidebar', 'gutenberg-bento' ), value: 'left' },
										{ label: __( 'Right sidebar', 'gutenberg-bento' ), value: 'right' },
									] }
								/>
							</MenuGroup>
						) }
					</ToolbarDropdownMenu>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
