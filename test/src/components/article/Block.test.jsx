/**
 * @jest-environment jsdom
 */

import React from 'react'
// Using render and screen from test-utils.js instead of
// @testing-library/react
// import { render } from "@/test/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import Block from '@/components/article/Block'

describe('Block', () => {
  it('should render the Block', () => {
    const { asFragment } = render(
      <Block>
        <p>Paragraph content</p>
      </Block>
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
