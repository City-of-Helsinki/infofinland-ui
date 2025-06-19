import '@testing-library/jest-dom'
import { setConfig } from 'next/config'
import { publicRuntimeConfig, serverRuntimeConfig } from './next.config'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig, serverRuntimeConfig })

// Mock visibility state for SWR.
global.beforeEach(() => {
  const original = jest.requireActual("swr/_internal");
  const originalIsVisible = original.defaultConfig.isVisible;
  original.defaultConfig.isVisible = () => {
    try {
      return originalIsVisible();
    } catch {
      return true;
    }
  };
});