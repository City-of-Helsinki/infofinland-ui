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
        <div className=" overflow-visible pb-2 h-screen md:h-auto bg-white">
          <div className="md:hidden mb-2 md:max-w-screen-3xl h-12">
            <CloseButton className="float-end me-6" close={close} />
          </div>
          <div className="md:max-w-screen-3xl">{children}</div>
        </div>
      </div>
    </ReactModal>
  )
}

export default SearchDrawer
