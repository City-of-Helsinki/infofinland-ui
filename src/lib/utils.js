import DOMPurify from 'isomorphic-dompurify'

export const sanitiseStrict = (value) =>
  DOMPurify.sanitize(value, {
    USE_PROFILES: { html: false },
  })
