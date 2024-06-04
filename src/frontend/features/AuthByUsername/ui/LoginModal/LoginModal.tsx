import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal'
import { BrowserView, MobileView } from '@/shared/lib/deviceDetect'
import { Drawer } from '@/shared/ui/Drawer'
import LoginForm from '../LoginForm/LoginForm'

interface LoginModalProps {
    className?: string
    isOpen?: boolean
    onClose?: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const { className, isOpen = false, onClose } = props

    return (
        <>
            <BrowserView>
                <Modal
                    className={classNames('LoginModal', {}, [className])}
                    isOpen={isOpen}
                    onClose={() => onClose?.()}
                >
                    <LoginForm onSuccess={onClose} />
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isOpen} onClose={() => onClose?.()}>
                    <LoginForm onSuccess={onClose} invertedColor />
                </Drawer>
            </MobileView>
        </>
    )
}
