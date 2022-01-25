/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import ImageBlock, { ArticleImage } from '@/components/article/ImageBlock'

describe('ImageBlock', () => {
  it('should render the given image inside a Block', () => {
    const { asFragment } = render(
      <ImageBlock
        alt="alt"
        src="/foo.png"
        height={100}
        width={200}
        caption="caption"
        title="title"
      />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ArticleImage', () => {
  it('should render image alt, title, className and and caption', () => {
    const { asFragment } = render(
      <ArticleImage
        alt="alt"
        src="/foo.png"
        caption="caption-big"
        title="title-big"
        className="test-class"
      />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render use layout="fill" as default and ignore heigh and width', () => {
    const { asFragment } = render(
      <ArticleImage src="/foo.png" height={103} width={404} />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })

  it('should use objectFit="contain" if width < height', () => {
    const { asFragment } = render(
      <ArticleImage src="/foo.png" height={503} width={404} />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })

  it('should use objectFit="hover" if width >= height', () => {
    const { asFragment } = render(
      <ArticleImage src="/foo.png" height={203} width={404} />
    )
    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()
  })

  it('should require height and width for other layouts and throw an error if they are missing', () => {
    //responsive, intrinsic, fixed, fill,
    const { asFragment } = render(
      <ArticleImage
        src="/foo.png"
        height={103}
        width={404}
        layout="responsive"
      />
    )

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(asFragment()).toMatchSnapshot()

    expect(() =>
      render(<ArticleImage src="/foo.png" layout="responsive" />)
    ).toThrow()

    expect(() =>
      render(<ArticleImage src="/foo.png" layout="intrinsic" />)
    ).toThrow()

    expect(() =>
      render(<ArticleImage src="/foo.png" layout="fixed" />)
    ).toThrow()
  })
})
