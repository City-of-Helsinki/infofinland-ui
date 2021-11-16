import Loader from 'react-loader-spinner'

export const DotsLoader = (
  props = { height: 100, width: 100, color: '#00A3E8' }
) => <Loader type="MutatingDots" {...props} />
