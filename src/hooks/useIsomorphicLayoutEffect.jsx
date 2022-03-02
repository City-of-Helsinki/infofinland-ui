//useLayoutEffect wont be running in SSR
import { useLayoutEffect, useEffect } from 'react'

const useIsomorphicLayoutEffect =
  isSSR() === false ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect

export function isSSR() {
  return typeof window === 'undefined'
}
