import Loader from 'react-loader-spinner'

const SubmitLoader = () => (
  <div className="flex justify-center items-center pt-8 mb-16 h-56 md:h-96 transform scale-150">
    <Loader type="MutatingDots" color="#00A3E8" height={100} width={100} />
  </div>
)

export default SubmitLoader
