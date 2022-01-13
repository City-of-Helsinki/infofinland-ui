/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import HomeHero from '@/components/home/HomeHero'

describe('HomeHero', () => {
  it('should render the given image inside a  Home Hero Block', () => {
    const { asFragment } = render(<HomeHero image="/hero.png" title="title" />)
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})
