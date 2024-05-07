import { Flex, FlexProps } from '../Flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'>

const VStack = (props: VStackProps) => {
    return <Flex direction="column" {...props} />
}

export { VStack }
