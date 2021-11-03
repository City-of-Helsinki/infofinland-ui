/**
 * @jest-environment jsdom
 */

import React from 'react'
// Using render and screen from test-utils.js instead of
// @testing-library/react
// import { render } from "@/test/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import { H1, H2, H3, H4, H5, H6, HR } from '@/components/Typo'

describe('Typography', () => {
  it('should render the h1', () => {
    const { asFragment } = render(<H1>Heading 1</H1>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the h2', () => {
    const { asFragment } = render(<H2>Heading 2</H2>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the h3', () => {
    const { asFragment } = render(<H3>Heading 3</H3>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the h4', () => {
    const { asFragment } = render(<H4>Heading 4</H4>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the h5', () => {
    const { asFragment } = render(<H5>Heading 5</H5>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the h6', () => {
    const { asFragment } = render(<H6>Heading 6</H6>)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render the hr', () => {
    const { asFragment } = render(<HR />)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
