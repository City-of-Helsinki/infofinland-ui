/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import ReadMoreBlock from '@/components/article/ReadMoreBlock'

describe('ReadMoreBlock', () => {
  it('should render the ReadMoreBlock', () => {
    const { asFragment } = render(<ReadMoreBlock />)
    expect(asFragment()).toMatchSnapshot()
  })
})
