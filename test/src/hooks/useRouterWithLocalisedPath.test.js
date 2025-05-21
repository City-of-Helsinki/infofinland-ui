import useRouterWithLocalizedPath from '@/hooks/useRouterWithLocalizedPath'
import { useRouter } from 'next/router'

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(() => ({
    asPath: '/',
    locale: 'en',
    pathname: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }))
}));

describe('hooks', () => {
  describe('useRouterWithLocalizedPath', () => {
    it('should strip query string and anchor hash from path', async () => {
      useRouter.mockReturnValue({
        asPath: '/test?test=1#test',
        locale: 'en',
      })
      const { localePath } = useRouterWithLocalizedPath()
      expect(localePath).toBe('/en/test')
    })
  })
})
