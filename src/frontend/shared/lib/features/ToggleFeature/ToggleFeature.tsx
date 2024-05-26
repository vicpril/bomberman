import { FeatureFlags } from '@/shared/types/featureFlags'
import { ReactElement } from 'react'
import { getFeatureFlag } from '../setGetFeatures'

interface ToggleFeatureProps {
    feature: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

export const ToggleFeature = ({ feature, on, off }: ToggleFeatureProps) => {
    const flag = getFeatureFlag(feature)

    if (flag) return on

    return off
}
