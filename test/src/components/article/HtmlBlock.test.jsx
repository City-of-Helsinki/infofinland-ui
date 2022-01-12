/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import HtmlBlock from '@/components/article/HtmlBlock'

const FIELD_CONTENT = {
  format: 'full_html',
  processed: '<p>Paragraph content<a href="http://link.ki/fi">linkki</a></p>',
}

describe('Block', () => {
  it('should render the given HTML inside a Block', () => {
    const { asFragment } = render(
      <HtmlBlock field_text={FIELD_CONTENT} className="tester" />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
