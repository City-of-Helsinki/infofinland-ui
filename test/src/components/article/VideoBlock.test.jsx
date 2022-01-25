/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import VideoBlock from '@/components/article/VideoBlock'

describe('VideoBlock', () => {
  it('should render a ReactPlayer with given url  and title inside a Block', () => {
    const { asFragment } = render(
      <VideoBlock
        url="https://icareus-eu1-progressive.secure2.footprint.net/10154/31238760/285903.mp4/1.0.mp4"
        title="Video Title"
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
