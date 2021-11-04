/* eslint-disable import/no-extraneous-dependencies */
import { getPage } from 'next-page-tester'
// import { screen, fireEvent } from '@testing-library/react';
import prettier from 'prettier'

describe('Home page', () => {
  it('page renders and matches snapshot', async () => {
    const { serverRenderToString, render } = await getPage({
      route: '/',
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

  //   it('renders home page in default language', async () => {
  //     const { render } = await getPage({
  //       route: '/',
  //     });

  // console.log(screen);
  //     expect(screen.getByText('Your source for living in Finland')).toBeInTheDocument();

  //     // fireEvent.click(screen.getByText('Link'));
  //     // await screen.findByText('Linked page');
  //   });
})
