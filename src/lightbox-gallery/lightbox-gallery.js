import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Filters blocks edit function of all blocks.
 *
 * @param {Function} BlockEdit function.
 *
 * @return {Function} Edit function.
 */
function addLightBoxGallerySupport(BlockEdit) {
	return (props) => {
		const { name } = props;
		const {
			attributes: { bentoLightbox },
			setAttributes,
		} = props;

		return (
			<>
				<BlockEdit {...props} />
				{'core/gallery' === name && (
					<InspectorControls>
						<PanelBody>
							<ToggleControl
								label={__(
									'Add lightbox effect',
									'gutenberg-bento'
								)}
								checked={bentoLightbox}
								onChange={() => {
									setAttributes({
										bentoLightbox: !bentoLightbox,
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'gutenberg-bento/add-lightbox-gallery',
	addLightBoxGallerySupport,
	20
);
