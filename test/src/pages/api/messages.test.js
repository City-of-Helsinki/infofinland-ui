import { createMocks } from "node-mocks-http";
import handler from '@/pages/api/messages'
import cache from '@/lib/cacher/server-cache'
jest.mock('@/lib/cacher/server-cache', () => ({
  has: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
}))

const handlerMock = async (
  method = 'GET',
  query = {},
  body = {}
) => {
  const { req, res } = createMocks({
    method: method,
    query: query,
    body: body,
  });

  await handler(req, res)

  return { req, res }
};

describe('api', () => {
  describe('messages', () => {
    it('should return 400 status code without locale', async () => {
      const { res } = await handlerMock()
      expect(res.statusCode).toBe(400)
    })

    it('should return 200 status code with locale', async () => {
      cache.has.mockReturnValue(true)
      cache.get.mockReturnValue([])
      const { res } = await handlerMock('GET', { locale: 'fi' })
      expect(res.statusCode).toBe(200)
    })
  })
})
