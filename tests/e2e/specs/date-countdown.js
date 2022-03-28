/* global describe, it, expect, page, beforeEach */

import {
	insertBlock,
	createNewPost,
	setPostContent,
	openPreviewPage,
	saveDraft,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';

const SAMPLE_COUNTDOWN = `
<!-- wp:gutenberg-bento/date-countdown {"dateTime":"2030-12-31T16:00:00"} -->
<figure class="wp-block-gutenberg-bento-date-countdown"><bento-date-countdown end-date="2030-12-31T16:00:00" when-ended="stop" biggest-unit="DAYS"><template><!-- wp:gutenberg-bento/countdown-days -->
{{dd}}
<!-- /wp:gutenberg-bento/countdown-days -->

<!-- wp:gutenberg-bento/countdown-hours -->
{{hh}}
<!-- /wp:gutenberg-bento/countdown-hours -->

<!-- wp:gutenberg-bento/countdown-minutes -->
{{mm}}
<!-- /wp:gutenberg-bento/countdown-minutes -->

<!-- wp:gutenberg-bento/countdown-seconds -->
{{ss}}
<!-- /wp:gutenberg-bento/countdown-seconds --></template></bento-date-countdown></figure>
<!-- /wp:gutenberg-bento/date-countdown -->
`;

describe('Date Countdown', () => {
	beforeEach(async () => {
		await createNewPost();
	});

	it('should allow adding countdown', async () => {
		await insertBlock('Date Countdown');

		await openDocumentSettingsSidebar();

		await expect(page).toMatch(/Countdown Settings/i);
		await expect(page).toMatch(/Choose date/i);

		await saveDraft();
	});

	it('should replace placeholders on frontend', async () => {
		await setPostContent(SAMPLE_COUNTDOWN);

		await expect(page).toMatchElement(
			'[data-type="gutenberg-bento/countdown-days"]',
			{ text: /[0-9]+/ }
		);

		await saveDraft();

		const editorPage = page;

		const previewPage = await openPreviewPage();
		await previewPage.bringToFront();
		await previewPage.waitForNetworkIdle();

		await expect(previewPage).not.toMatch('{{dd}}');
		await expect(previewPage).not.toMatch('{{hh}}');
		await expect(previewPage).not.toMatch('{{mm}}');
		await expect(previewPage).not.toMatch('{{ss}}');

		await editorPage.bringToFront();
		await previewPage.close();
	});
});
