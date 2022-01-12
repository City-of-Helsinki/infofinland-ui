/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import IngressBlock from '@/components/article/IngressBlock'

describe('IngressBlock', () => {
  it('should render the given HTML inside a Block', () => {
    const { asFragment } = render(
      <IngressBlock
        field_description={
          'Alkukartoituksessa arvioidaan, mitkä palvelut auttavat sinua kotoutumaan.'
        }
      />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
