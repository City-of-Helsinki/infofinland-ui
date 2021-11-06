/* eslint-disable import/no-extraneous-dependencies */
import { getPage } from 'next-page-tester'
// import { screen, fireEvent } from '@testing-library/react';
import prettier from 'prettier'

describe('Article page', () => {
  beforeAll(() => {
    // prevent language notification from showing up on react hydration phase"
    window.sessionStorage.setItem('langMessage', 'shown')
  })

  it('page renders and matches snapshot', async () => {
    const { serverRenderToString, render } = await getPage({
      route: '/theme/page',
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

  it('renders ltr text direction attribute', async () => {
    const { render } = await getPage({
      route: '/fi',
    })
    render()

    const html = document.documentElement

    expect(html).toHaveAttribute('dir', 'ltr')

    // const head = document.head;
    // expect(head.querySelector('meta[name="Description"]')).toHaveAttribute(
    //   'Content',
    //   'My custom page description'
    // );
  })

  it('renders rtl text direction attribute', async () => {
    const { render } = await getPage({
      route: '/fa',
    })
    render()

    const html = document.documentElement

    expect(html).toHaveAttribute('dir', 'rtl')

    // const head = document.head;
    // expect(head.querySelector('meta[name="Description"]')).toHaveAttribute(
    //   'Content',
    //   'My custom page description'
    // );
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
