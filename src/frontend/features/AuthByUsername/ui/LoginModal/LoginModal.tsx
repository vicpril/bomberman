import { classNames } from '@/shared/lib/classNames/classNames'
import LoginForm from '../LoginForm/LoginForm'
import { Modal } from '@/shared/ui/Modal'

interface LoginModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen = false, onClose } = props

  return (
    <Modal
      className={classNames('LoginModal', {}, [className])}
      isOpen={isOpen}
      onClose={() => onClose?.()}
    >
      <LoginForm onSuccess={onClose} />
    </Modal>

  )
}
