import { createMocks } from "node-mocks-http";
import handler from '@/pages/api/revalidate'
import logger from '@/logger'

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
      jest.spyOn(logger, 'warn').mockImplementation()
      const { res } = await handlerMock()
      expect(res.statusCode).toBe(401)
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid secret.'),
        expect.objectContaining({ status: 401 })
      )
    })

    it('should return 400 status code without slug', async () => {
      jest.spyOn(logger, 'warn').mockImplementation()
      const { res } = await handlerMock('GET', { secret: 'secret' })
      expect(res.statusCode).toBe(400)
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid slug.'),
        expect.objectContaining({ status: 400 })
      )
    })

    it('should return 404 status code with secret and unknown path', async () => {
      jest.spyOn(logger, 'warn').mockImplementation()
      process.env.DRUPAL_PREVIEW_SECRET = 'secret'
      const { res } = await handlerMock('GET', { secret: 'secret', path: 'unknown' })
      expect(res.statusCode).toBe(404)
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Page not found.'),
        expect.objectContaining({ status: 404 })
      )
    })
  })
})
