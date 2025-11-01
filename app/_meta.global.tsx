import { MetaRecord } from 'nextra';

const DOCS_ITEMS: MetaRecord = {
  index: '',
  navigation: '',
  tips: '',
};

export default {
  index: {
    type: 'page',
    theme: {
      layout: 'full',
      toc: false,
      timestamp: false,
    },
  },
  notes: {
    title: 'Notes',
    type: 'menu',
    items: {
      year1: {
        title: 'Year 1',
        href: '/notes/year1',
      },
      year2: {
        title: 'Year 2',
        href: '/notes/year2',
      },
      year3: {
        title: 'Year 3',
        href: '/notes/year3',
      },
      year4: {
        title: 'Year 4',
        href: '/notes/year4',
      },
    },
  },
  docs: {
    type: 'page',
    title: 'Documentation',
    items: DOCS_ITEMS,
  },

  article: {
    type: 'page',
    theme: {
      toc: false,
      typesetting: 'article',
    },
  },
  contact: {
    type: 'page',
    theme: {
      layout: 'full',
      toc: false,
      timestamp: false,
    },
  },
};
