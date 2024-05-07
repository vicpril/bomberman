import { useCallback, useEffect, useState } from 'react'

interface ModalProps {
    isOpen?: boolean
    onClose?: () => void
    animationDelay?: number
    targetId?: string
}

export const useModal = (props: ModalProps) => {
    const { isOpen, onClose, animationDelay = 300, targetId = 'modals' } = props

    const [isMounted, setIsMounted] = useState(false)
    const [isOpened, setIsOpened] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isOpening, setIsOpening] = useState(false)

    const [target, setTarget] = useState<HTMLElement | null>(null)

    useEffect(() => {
        setTarget(document.getElementById(targetId))
    }, [targetId])

    const onOpenHandler = useCallback(() => {
        setIsOpening(true)
        setTimeout(() => {
            setIsOpened(true)
            setIsOpening(false)
        }, animationDelay)
    }, [animationDelay])

    const onCloseHandler = useCallback(() => {
        setIsClosing(true)
        setTimeout(() => {
            onClose?.()
            setIsOpened(false)
            setIsClosing(false)
        }, animationDelay)
    }, [animationDelay, onClose])

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            onOpenHandler()
        } else {
            setIsMounted(false)
        }
    }, [isOpen, onOpenHandler])

    const onEscDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onCloseHandler()
            }
        },
        [isOpen, onCloseHandler],
    )

    window.addEventListener('keydown', onEscDown)

    useEffect(
        () => () => {
            window.removeEventListener('keydown', onEscDown)
        },
        [onEscDown],
    )

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return {
        target,
        close: onCloseHandler,
        click: onContentClick,
        isMounted,
        isOpened,
        isClosing,
        isOpening,
    }
}
