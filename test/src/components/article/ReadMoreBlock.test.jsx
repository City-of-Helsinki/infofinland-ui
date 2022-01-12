/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import ReadMoreBlock from '@/components/article/ReadMoreBlock'
export const READMORE_CONTENT = [
  {
    siteName: 'DEMO:Kela',
    mainTranslation: { locale: 'fi', url: 'http://www.kela.fi/fi/' ,id:'foooaa'},
    pageName: 'Some random Kela page',
    languages: [
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'fi', id:'foo',},
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
        id:'bar'
      },
    ],
  },
]
describe('ReadMoreBlock', () => {
  it('should render the ReadMoreBlock', () => {
    const { asFragment } = render(<ReadMoreBlock content={READMORE_CONTENT} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
