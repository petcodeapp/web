import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import OnboardingProvider from './context/index'
import useOnboarding from './hooks/index'

import OnboardingSidebar from './components/onboarding-sidebar'
import CreateYourAccountStep from './components/create-your-account-step'

const Onboarding: React.FC = () => {
	const [state] = useOnboarding()
	const router = useRouter()

	useEffect(() => {
		router.push(`#${state.step}`, undefined, { shallow: true })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.step])

	return (
		<Flex direction="row" minHeight="100vh">
			<OnboardingSidebar />
			<Box flexGrow={1} />
			<CreateYourAccountStep />
			<Box flexGrow={1} />
		</Flex>
	)
}

const OnboardingWithProvider: React.FC = () => (
	<OnboardingProvider>
		<Onboarding />
	</OnboardingProvider>
)

export default OnboardingWithProvider
