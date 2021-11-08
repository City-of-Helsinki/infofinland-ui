// import { CSSTransition } from 'react-transition-group'
// import cls from 'classnames'
import ReactModal from 'react-modal'
import { CloseButton } from '@/components/Button'

const SearchDrawer = ({ close, children, isOpen, contentLabel }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel={contentLabel}
      className="ifu-drawer"
      overlayClassName="ifu-search__overlay"
    >
      <div className="relative">
        {/* <CSSTransition
        classNames={'ifu-drawer-'}
        timeout={5000}
        in={isOpen}
        appear
        mountOnEnter
      > */}
        <div className=" overflow-visible pb-2 h-screen md:h-auto bg-white">
          <div className="md:hidden mb-2 md:max-w-screen-3xl h-12">
            <CloseButton className="float-end me-6" close={close} />
          </div>
          <div className="md:max-w-screen-3xl">{children}</div>
        </div>
        {/* </CSSTransition> */}
      </div>
    </ReactModal>
  )
}

export default SearchDrawer
