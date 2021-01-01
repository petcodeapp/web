import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import { AnimatePresence } from 'framer-motion'
import OnboardingProvider from './context/index'
import useOnboarding from './hooks/index'
import { onboardingActions } from './reducers/index'

import OnboardingSidebar from './components/onboarding-sidebar'
import OnboardingContainer from './components/onboarding-container'
import CreateYourAccountStep from './components/create-your-account-step'

const OnboardingStep: React.FC = () => {
	const [state] = useOnboarding()

	if (state.step === 'create-your-account') {
		return <CreateYourAccountStep />
	}

	return <OnboardingContainer />
}

const Onboarding: React.FC = () => {
	const [state, dispatch] = useOnboarding()
	const router = useRouter()

	useEffect(() => {
		// handle external hash changes (e.g. history navigation)
		const hashChangeHandler = () => {
			if (
				window.location.hash &&
				state.step !== window.location.hash.substr(1)
			) {
				dispatch(onboardingActions.setStep(window.location.hash.substr(1)))
			}
		}
		router.events.on('hashChangeComplete', hashChangeHandler)

		// sync state w/ page hash
		router.push(`#${state.step}`, undefined, { shallow: true })

		return () => router.events.off('hashChangeComplete', hashChangeHandler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.step])

	return (
		<Flex direction="row" minHeight="100vh">
			<OnboardingSidebar />
			<Box flexGrow={1} />
			<AnimatePresence exitBeforeEnter>
				<OnboardingStep key={state.step} />
			</AnimatePresence>
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
