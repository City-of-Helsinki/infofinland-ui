/* eslint-disable import/no-extraneous-dependencies */
import { getPage } from 'next-page-tester'
// import { screen, fireEvent } from '@testing-library/react';
import prettier from 'prettier'

describe('Search Page', () => {
  beforeAll(() => {
    // prevent language notification from showing up on react hydration phase"
    window.sessionStorage.setItem('langMessage', 'shown')
  })

  it('page renders empty search field ', async () => {
    const { serverRenderToString, render } = await getPage({
      route: '/fi/hae',
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

  it('page renders with given query string from url', async () => {
    const { serverRenderToString, render } = await getPage({
      route: '/fi/hae?q=testi',
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

  it('page renders with no results', async () => {
    // Scaffold test for empty results. using _ for testing empty results in UI
    // this should break accordingly when real API is connected.
    const { serverRenderToString, render } = await getPage({
      route: '/fi/hae?q=_',
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
