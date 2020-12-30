import React from 'react'

import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionButton = motion.custom(Button)

type BaseButtonProps = React.ComponentProps<typeof MotionButton>

const BaseButton: React.FC<BaseButtonProps> = ({ ...props }) => (
	<MotionButton
		rounded="full"
		size="lg"
		variant="solid"
		whileHover={{
			scale: 1.05,
		}}
		transition={{
			duration: '0.2',
		}}
		{...props}
	/>
)

export default BaseButton
