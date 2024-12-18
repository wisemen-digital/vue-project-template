import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'subtext',
            'xs',
            'hero',
            'title',
            'subtitle',
            'heading',
            'body',
          ],
        },
      ],
    },
  },
})
