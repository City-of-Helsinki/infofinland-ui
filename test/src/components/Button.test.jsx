/**
 * @jest-environment jsdom
 */

import React from 'react'
// Using render and screen from test-utils.js instead of
// @testing-library/react
// import { render } from "@/test/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'
import Button, { CloseButton, LinkButton } from '@/components/Button'

describe('Buttons', () => {
  describe('Button', () => {
    it('should render Button component with ifu-button base class', () => {
      const { asFragment } = render(<Button>Hello</Button>)

      expect(asFragment()).toMatchSnapshot()
    })
    it('should render append classNames component', () => {
      const { asFragment } = render(<Button className="hello">Hello</Button>)
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render pass any props to button', () => {
      const { asFragment } = render(
        <Button type="submit" id="test" aria-label="hello">
          Hello
        </Button>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('LinkButton', () => {
    it('should render LinkButton component with ifu-text-link base class', () => {
      const { asFragment } = render(<LinkButton>looks like link</LinkButton>)

      expect(asFragment()).toMatchSnapshot()
    })
    it('should render append classNames component', () => {
      const { asFragment } = render(
        <LinkButton className="foo">looks like link</LinkButton>
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render pass any props to button', () => {
      const { asFragment } = render(
        <LinkButton id="test" type="submit">
          looks like link
        </LinkButton>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('CloseButton', () => {
    it('should render LinkButton component with ifu-text-link base class', () => {
      const { asFragment } = render(<CloseButton>looks like link</CloseButton>)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
