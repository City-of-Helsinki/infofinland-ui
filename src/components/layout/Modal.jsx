import ReactModal from 'react-modal'
import { CloseButton } from '@/components/Button'

const Modal = ({ children, isOpen, close, contentLabel }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={close}
      className="ifu-modal"
      overlayClassName="ifu-modal__overlay"
    >
      <div className="ifu-modal__body">
        <div className="mb-2 h-12">
          <CloseButton className="float-end me-6" close={close} />
        </div>

        {children}
      </div>
    </ReactModal>
  )
}

export default Modal
