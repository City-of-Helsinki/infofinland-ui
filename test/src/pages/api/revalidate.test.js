import { createMocks } from "node-mocks-http";
import handler from '@/pages/api/revalidate'

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
  describe('revalidate', () => {
    it('should return 401 status code without secret', async () => {
      const { res } = await handlerMock()
      expect(res.statusCode).toBe(401)
    })

    it('should return 400 status code without slug', async () => {
      const { res } = await handlerMock('GET', { secret: 'secret' })
      expect(res.statusCode).toBe(400)
    })

    it('should return 404 status code with secret and unknown path', async () => {
      process.env.DRUPAL_PREVIEW_SECRET = 'secret'
      const { res } = await handlerMock('GET', { secret: 'secret', path: 'unknown' })
      expect(res.statusCode).toBe(404)
    })
  })
})
