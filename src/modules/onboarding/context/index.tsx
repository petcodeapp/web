import React, { Dispatch, useEffect, useReducer } from 'react'
import onboardingReducer, {
	IOnboardingState,
	INITIAL_ONBOARDING_STATE,
} from '../reducers/index'

export const OnboardingContext = React.createContext<
	[
		ReturnType<typeof onboardingReducer>,
		Dispatch<{
			type: string
			[key: string]: any
		}>
	]
>(null)

const OnboardingProvider: React.FC = ({ children }) => {
	// try to use local storage state from unless they're not navigating to a specific step
	const shouldUsePersistedState =
		typeof window !== 'undefined' &&
		window.location.hash &&
		localStorage.getItem('onboarding')
	const [state, dispatch] = useReducer<typeof onboardingReducer>(
		onboardingReducer,
		shouldUsePersistedState
			? JSON.parse(localStorage.getItem('onboarding'))
			: INITIAL_ONBOARDING_STATE
	)

	useEffect(() => {
		localStorage.setItem('onboarding', JSON.stringify(state))
	}, [state])

	return (
		<OnboardingContext.Provider value={[state, dispatch]}>
			{children}
		</OnboardingContext.Provider>
	)
}

export default OnboardingProvider
