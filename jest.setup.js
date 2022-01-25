import '@testing-library/jest-dom'
import { setConfig } from 'next/config'
import { publicRuntimeConfig, serverRuntimeConfig } from './next.config'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig, serverRuntimeConfig })
