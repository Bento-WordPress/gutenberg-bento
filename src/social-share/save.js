/**
 * External Components
 */
import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes: { facebook, twitter } }) => {
	return (
		<div {...useBlockProps.save()}>
			{facebook && (
				<bento-social-share
					type="facebook"
					aria-label="Share via Facebook"
				></bento-social-share>
			)}
			{twitter && (
				<bento-social-share
					type="twitter"
					aria-label="Share via Twitter"
				></bento-social-share>
			)}
		</div>
	);
};

export default Save;
