/**
 * @jest-environment jsdom
 */

import React from 'react'
// Using render and screen from test-utils.js instead of
// @testing-library/react
// import { render } from "@/test/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import ThemeCard from '@/components/home/ThemeCard'

describe('ThemeCard', () => {
  it('should render the ThemeCard in Blue', () => {
    const { asFragment } = render(<ThemeCard title="test" url="/" blue />)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the ThemeCard in Green', () => {
    const { asFragment } = render(<ThemeCard title="test" url="/" green />)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
