/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import LocalInformation from '@/components/cities/LocalInformation'
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
useRouter.mockImplementation(() => ({
  locale: 'fi'
}))

describe('LocalInformation', () => {
  it('should render', () => {
    const { asFragment } = render(<LocalInformation cities={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
