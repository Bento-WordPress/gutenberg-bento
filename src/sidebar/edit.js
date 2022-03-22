import {
	BlockControls,
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import {
	MenuGroup,
	MenuItemsChoice,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseEntityRecords as useEntityRecords,
	useEntityBlockEditor,
} from '@wordpress/core-data';

export default function Edit({
	clientId,
	attributes: { templatePartId, side },
	setAttributes,
}) {
	const blockProps = useBlockProps();

	const { records: templateParts } = useEntityRecords(
		'postType',
		'wp_template_part'
	);
	const choices = useMemo(
		() =>
			templateParts?.map(({ id, title }) => ({
				label: title?.rendered,
				value: id,
			})),
		[templateParts]
	);

	const [blocks] = useEntityBlockEditor('postType', 'wp_template_part', {
		id: templatePartId,
	});

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	useEffect(() => {
		replaceInnerBlocks(clientId, blocks || []);
	}, [blocks, templatePartId]);

	return (
		<>
			<div {...blockProps}>
				<button id="open-sidebar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="48px"
						viewBox="0 0 24 24"
						width="48px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
					</svg>
				</button>
			</div>
			<BlockControls>
				<ToolbarGroup className="wp-block-template-part__block-control-group">
					<ToolbarDropdownMenu
						label={__('Select Template Part', 'gutenberg-bento')}
						text={__('Select Template Part', 'gutenberg-bento')}
						icon={null}
					>
						{({ onClose }) => (
							<MenuGroup>
								<MenuItemsChoice
									value={templatePartId}
									onSelect={(selectedValue) => {
										setAttributes({
											templatePartId: selectedValue,
										});
										onClose();
									}}
									choices={choices}
								/>
							</MenuGroup>
						)}
					</ToolbarDropdownMenu>
				</ToolbarGroup>
				<ToolbarGroup className="wp-block-template-part__block-control-group">
					<ToolbarDropdownMenu
						label={
							side === 'left'
								? __('Left sidebar', 'gutenberg-bento')
								: __('Right sidebar', 'gutenberg-bento')
						}
						text={
							side === 'left'
								? __('Left sidebar', 'gutenberg-bento')
								: __('Right sidebar', 'gutenberg-bento')
						}
						icon={null}
					>
						{({ onClose }) => (
							<MenuGroup>
								<MenuItemsChoice
									value={side}
									onSelect={(selectedValue) => {
										setAttributes({ side: selectedValue });
										onClose();
									}}
									choices={[
										{
											label: __(
												'Left sidebar',
												'gutenberg-bento'
											),
											value: 'left',
										},
										{
											label: __(
												'Right sidebar',
												'gutenberg-bento'
											),
											value: 'right',
										},
									]}
								/>
							</MenuGroup>
						)}
					</ToolbarDropdownMenu>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
