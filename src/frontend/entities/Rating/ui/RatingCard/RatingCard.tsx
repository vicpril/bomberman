import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RatingCard.module.scss'
import { BrowserView, MobileView } from '@/shared/lib/deviceDetect'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { VStack, HStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Modal } from '@/widgets/Modal'
import { Text } from '@/shared/ui/Text/Text'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { Input } from '@/shared/ui/Input/Input'

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number
  responsive?: boolean
}

const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    onAccept,
    onCancel,
    hasFeedback,
    feedbackTitle,
    rate,
    responsive = false,
  } = props

  const { t } = useTranslation()

  const { flag: isModalOpen, on: showModal, off: hideModal } = useFlag(false)
  const [starsCount, setStarsCount] = useState(rate ?? 0)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      showModal()
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept, showModal])

  const acceptHandle = useCallback(() => {
    hideModal()
    onAccept?.(starsCount, feedback)
  }, [feedback, hideModal, onAccept, starsCount])

  const cancelHandle = useCallback(() => {
    hideModal()
    onCancel?.(starsCount)
  }, [hideModal, onCancel, starsCount])

  const modalContent = (
    <>
      <Text
        title={feedbackTitle}
      />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Ваш отзыв')}
      />
    </>
  )

  return (
    <Card className={classNames(cls.RatingCard, { [cls.responsive]: responsive }, [className])}>
      <VStack align="center" gap="8">
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button onClick={cancelHandle} theme={ButtonTheme.Outline}>
                {t('Закрыть')}
              </Button>
              <Button onClick={acceptHandle}>
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <Button responsive onClick={acceptHandle} size={ButtonSize.L}>
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>

  )
})

export { RatingCard }
