export const getFit = ({ width, height }) =>
  width < height ? 'contain' : 'cover'
