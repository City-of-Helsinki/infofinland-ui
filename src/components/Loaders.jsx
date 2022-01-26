export const DotsLoader = () => (
  <div className="ifu-loader__feeedback--ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export const RingsLoader = () => (
  <div className="flex absolute justify-items-center items-center w-full h-full">
    <div className=" scale-75 lg:scale-100 ifu-loader__image--ripple">
      <div></div>
      <div></div>
    </div>
  </div>
)
