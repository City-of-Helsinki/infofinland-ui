/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import Columns from '@/components/article/Columns'
import { CONTENT_TYPES, TEXT_HTML_FORMAT } from '@/lib/DRUPAL_API_TYPES'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (i18nKey) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const CONTENT =
  'Alkukartoituksessa arvioidaan, mitkä palvelut auttavat sinua kotoutumaan.'

describe('Columns', () => {
  it('should render text and images', () => {
    const { asFragment } = render(
      <Columns
        field_columns_left_column={{
          type: CONTENT_TYPES.TEXT,
          field_text: { processed: CONTENT, format: TEXT_HTML_FORMAT },
        }}
        field_columns_right_column={{
          type: CONTENT_TYPES.PARAGRAPH_IMAGE,
          field_image: {
            field_image_caption: 'Kuvatekstiä',
            field_media_image: {
              resourceObjectMeta: {
                alt: 'alt',
                title: 'title',
                height: 200,
                width: 600,
              },
              uri: { url: '/FOO.png' },
            },
          },
        }}
      />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
