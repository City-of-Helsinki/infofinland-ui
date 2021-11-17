/* eslint-disable import/no-extraneous-dependencies */
import { getPage } from 'next-page-tester'
// import { screen, fireEvent } from '@testing-library/react';
import prettier from 'prettier'

describe('Error page', () => {


  it('page renders and matches snapshot', async () => {
    const { serverRenderToString, render } = await getPage({
      route: '/500',
    })

    // check correctness of SSR result
    const { html } = serverRenderToString()
    const formattedSSRSnapshot = prettier.format(html, {
      parser: 'html',
    })

    expect(formattedSSRSnapshot).toMatchSnapshot()

    // check hydrated app
    const { nextRoot } = render()
    const formattedHydratedSnapshot = prettier.format(nextRoot.outerHTML, {
      parser: 'html',
    })

    expect(formattedHydratedSnapshot).toMatchSnapshot()
  })


})
