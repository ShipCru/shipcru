import type { Field } from 'payload';

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields';

export const seo = (): Field[] => {
	return [
		OverviewField({
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
			imagePath: 'meta.image',
		}),
		MetaTitleField({
			hasGenerateFn: true,
		}),
		MetaImageField({
			relationTo: 'media',
		}),
		MetaDescriptionField({
			hasGenerateFn: true,
		}),
		PreviewField({
			hasGenerateFn: true,
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
		}),
		{
			name: 'robots',
			type: 'select',
			label: 'Robots',
			defaultValue: 'index',
			options: [
				{
					label: 'Index',
					value: 'index',
				},
				{
					label: 'No Index',
					value: 'noindex',
				},
			],
			admin: {
				description: 'Allow search engines to index this page',
			},
		},
	];
};
