/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render } from '@testing-library/react'
import HomeHero from '@/components/home/HomeHero'

describe('HomeHero', () => {
  it('should render the HomeHero component', () => {
    const { asFragment } = render(<HomeHero title="test" image="/foo.png" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
