import useSetLocalization from '@/hooks/useSetLocalization'
import { renderHook } from '@testing-library/react'

describe('hooks', () => {
  describe('useSetLocalization', () => {
    it('should set the direction of the html element', async () => {
      expect(document.querySelector('html').getAttribute('dir')).toBe(null)
      renderHook(() => useSetLocalization('en'))
      expect(document.querySelector('html').getAttribute('dir')).toBe('ltr')
      renderHook(() => useSetLocalization('ar'))
      expect(document.querySelector('html').getAttribute('dir')).toBe('rtl')
    })
  })
})
