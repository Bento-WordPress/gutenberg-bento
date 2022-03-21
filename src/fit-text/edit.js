import classnames from 'classnames';
import { BentoFitText } from '@bentoproject/fit-text/react';
import '@bentoproject/fit-text/styles.css';
import './view.css';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	ResizableBox,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import './edit.css';

function FitTextEdit({ attributes, setAttributes }) {
	const {
		content,
		minFontSize,
		maxFontSize,
		height = 50,
		textAlign,
	} = attributes;

	const [localHeight, setLocalHeight] = useState(height);

	useEffect(() => {
		setAttributes({ height: localHeight });
	}, [localHeight]);

	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	function setMinFontSize(fontSize) {
		setAttributes({ minFontSize: fontSize });
	}

	function setMaxFontSize(fontSize) {
		setAttributes({ maxFontSize: fontSize });
	}

	function setContent(nextValue) {
		setAttributes({ content: nextValue });
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Fit-Text Settings', 'gutenberg-bento')}>
					<UnitControl
						label={__('Minimum Font Size', 'gutenberg-bento')}
						onChange={setMinFontSize}
						units={[
							{
								a11yLabel: 'Pixels (px)',
								label: 'px',
								step: 1,
								value: 'px',
							},
						]}
						value={minFontSize}
					/>
					<UnitControl
						label={__('Maximum Font Size', 'gutenberg-bento')}
						onChange={setMaxFontSize}
						units={[
							{
								a11yLabel: 'Pixels (px)',
								label: 'px',
								step: 1,
								value: 'px',
							},
						]}
						value={maxFontSize}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ResizableBox
					minHeight={50}
					enable={{ bottom: true, right: false }}
					onResizeStop={(event, direction, elt, delta) => {
						setLocalHeight(
							(prevHeight) => prevHeight + delta.height
						);
					}}
				>
					<BentoFitText
						className="bento-fit-text"
						style={{ height: localHeight }}
						minFontSize={parseInt(
							minFontSize.replace('px', ''),
							10
						)}
						maxFontSize={parseInt(
							maxFontSize.replace('px', ''),
							10
						)}
					>
						<RichText
							identifier="content"
							value={content}
							onChange={setContent}
							aria-label={__('Fitted Text', 'gutenberg-bento')}
							placeholder={__('Write text…', 'gutenberg-bento')}
						/>
					</BentoFitText>
				</ResizableBox>
			</div>
		</>
	);
}

export default FitTextEdit;
