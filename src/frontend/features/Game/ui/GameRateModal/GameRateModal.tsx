import { memo } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { RatingCard } from '@/entities/Rating'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from '@/shared/lib/deviceDetect'
import { Drawer } from '@/shared/ui/Drawer'
import { useRateGame } from '../../api/gameRatingApi'

interface GameRateModalProps {
    isOpen: boolean
    onClose?: () => void
    win: boolean
}

const GameRateModal = memo((props: GameRateModalProps) => {
    const { isOpen, onClose, win } = props

    const { t } = useTranslation('game')

    const [rateGame] = useRateGame()

    const onAcceptHandler = (starsCount: number, feedback?: string) => {
        onClose?.()
        rateGame({
            rate: starsCount,
            win,
            feedback,
        })
    }
    const onCancelHandler = (starsCount: number) => {
        onClose?.()
        rateGame({
            rate: starsCount,
            win,
        })
    }

    const content = (
        <RatingCard
            title={t('Оцените игру')}
            onAccept={onAcceptHandler}
            onCancel={onCancelHandler}
            hasFeedback
            responsive
        />
    )

    return (
        <>
            <BrowserView>
                <Modal isOpen={isOpen} onClose={onClose}>
                    {content}
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isOpen} onClose={onClose}>
                    {content}
                </Drawer>
            </MobileView>
        </>
    )
})

export { GameRateModal }
