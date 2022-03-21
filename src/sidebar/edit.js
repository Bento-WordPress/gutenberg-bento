import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	__experimentalUseNoRecursiveRenders as useNoRecursiveRenders,
	Warning,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useCallback, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
	MenuGroup,
	MenuItemsChoice,
	Spinner,
	Modal,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	store as coreStore,
	__experimentalUseEntityRecords as useEntityRecords,
} from '@wordpress/core-data';
import { useState } from '@wordpress/element';

// import '@bentoproject/sidebar/styles.css';

const SIDEBAR_SECTION_BLOCK = 'gutenberg-bento/sidebar-section';
const ALLOWED_BLOCKS = [SIDEBAR_SECTION_BLOCK];
const TEMPLATE = [[SIDEBAR_SECTION_BLOCK]];

export default function Edit( { attributes: { templatePartId }, setAttributes } ) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: InnerBlocks.ButtonBlockAppender,
			template: TEMPLATE,
		},
	);
	const toggleAnimate = useCallback( ( nextValue ) => {
		setAttributes( { animate: nextValue } );
	}, [] );

	const { records: templateParts, status } = useEntityRecords( 'postType', 'wp_template_part' );
	useEffect( () => {
		// const part = templateParts.find(({id})=>id === templatePartId);
		// replaceInnerBlocks()
	}, [templatePartId] );
	const choices = useMemo(
		() =>
			templateParts?.map( ( { id, title } ) => ( {
				label: title?.rendered,
				value: id,
			} ) ),
		[templateParts],
	);

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
						label={ __( 'Select Template Part' ) }
						text={ __( 'Select Template Part' ) }
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
			</BlockControls>
		</>
	);
}
