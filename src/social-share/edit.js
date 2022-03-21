/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BentoSocialShare } from '@bentoproject/social-share/react';
import '@bentoproject/social-share/styles.css';
import './social-share.css';

const Edit = ({ attributes: { facebook, twitter }, setAttributes }) => {
	const toggleFacebook = useCallback((nextValue) => {
		setAttributes({ facebook: nextValue });
	}, []);

	const toggleTwitter = useCallback((nextValue) => {
		setAttributes({ twitter: nextValue });
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'gutenberg-bento')}>
					<ToggleControl
						label={__('Facebook', 'gutenberg-bento')}
						checked={facebook}
						onChange={toggleFacebook}
					/>
					<ToggleControl
						label={__('Twitter', 'gutenberg-bento')}
						checked={twitter}
						onChange={toggleTwitter}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} className="social-share-group">
				{facebook && (
					<BentoSocialShare
						type="facebook"
						aria-label="Share via email"
					></BentoSocialShare>
				)}
				{twitter && (
					<BentoSocialShare
						type="twitter"
						aria-label="Share via email"
					></BentoSocialShare>
				)}
			</div>
		</>
	);
};

export default Edit;
