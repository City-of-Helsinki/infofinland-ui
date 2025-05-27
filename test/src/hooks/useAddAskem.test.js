import useAddAskem from '@/hooks/useAddAskem'
import { loadAskemScript } from '@/lib/askem'
import { useRef } from 'react'

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn((f) => f()),
  useRef: jest.fn(() => ({
    current: ''
  }))
}));
jest.mock('@/lib/askem', () => ({
  loadAskemScript: jest.fn(() => Promise.resolve())
}))

describe('hooks', () => {
  describe('useAddAskem', () => {
    it('should not load Askem when api key is missing', async () => {
      const res = useAddAskem('en', 'test')
      expect(res).toBeUndefined()
      expect(loadAskemScript).not.toHaveBeenCalled()
    })
  })
})
