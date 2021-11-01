export const getRequestUrlFromContext = (ctx) => {
  const {
    req: { rawHeaders },
  } = ctx
  return rawHeaders.find((h) => /^http:/.test(h))
}
