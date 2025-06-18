/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { act, render } from '@testing-library/react'
import VideoBlock from '@/components/article/VideoBlock'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (i18nKey) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('next/dynamic', () => {
  const ReactPlayer = () => <>ReactPlayer</>
  return {
    __esModule: true,
    default: () => {
      return ReactPlayer
    },
  }
});

describe('VideoBlock', () => {
  it('should render a ReactPlayer with given url and title inside a Block', async () => {
    let asFragment;
    await act(async () => {
      const component = render(
        <VideoBlock
          url="https://icareus-eu1-progressive.secure2.footprint.net/10154/31238760/285903.mp4/1.0.mp4"
          title="Video Title"
        />
      )
      asFragment = component.asFragment
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
