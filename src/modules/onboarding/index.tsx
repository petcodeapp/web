import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

import OnboardingSidebar from './components/onboarding-sidebar'

const Onboarding = () => (
	<Flex direction="row" minHeight="100vh">
		<OnboardingSidebar />
		<Box flexGrow={1} />
	</Flex>
)

export default Onboarding
