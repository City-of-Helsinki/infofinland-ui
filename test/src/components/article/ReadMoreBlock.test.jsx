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
    mainTranslation:{locale:'fi',url:'http://www.kela.fi/fi/'},
    pageName: 'Some random Kela page',
    languages: [
      { url: 'http://www.kela.fi/fi/', text: 'Suomi', lang: 'fi' },
      {
        url: 'http://www.kela.fi/sv/',
        text: 'Ruotsi',
        lang: 'sv',
      },

    ],
  },
]
describe('ReadMoreBlock', () => {
  it('should render the ReadMoreBlock', () => {
    const { asFragment } = render(<ReadMoreBlock content={READMORE_CONTENT}/>)
    expect(asFragment()).toMatchSnapshot()
  })
})
