/* global describe, it, expect, page */

import {
	insertBlock,
	createNewPost,
	saveDraft,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';

describe('Lightbox Gallery', () => {
	it('should add a toggle to the core/gallery block', async () => {
		await createNewPost();
		await insertBlock('Gallery');

		// TODO: Actually add some images here.

		await openDocumentSettingsSidebar();

		await expect(page).toMatch(/Add lightbox effect/i);
		await expect(page).toClick('label', { text: /Add lightbox effect/i });
		await saveDraft();

		// TODO: Click on images to verify that lightbox opens.
	});
});
