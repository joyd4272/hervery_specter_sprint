import {defineField, defineType} from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Social Media', value: 'Social Media'},
          {title: 'Photography', value: 'Photography'},
          {title: 'Branding', value: 'Branding'},
          {title: 'Web Design', value: 'Web Design'},
          {title: 'Web Development', value: 'Web Development'},
          {title: 'Marketing', value: 'Marketing'},
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: '1 = top-left, 2 = bottom-left, 3 = top-right, 4 = bottom-right',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'order',
    },
    prepare({title, media, subtitle}: {title: string; media: unknown; subtitle: number}) {
      return {
        title,
        media,
        subtitle: subtitle ? `Position ${subtitle}` : 'No order set',
      }
    },
  },
})
