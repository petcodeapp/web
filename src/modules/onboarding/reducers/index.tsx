import { IPet } from '#types/models/pet'

export interface IOnboardingState {
	step: string
	tagId: string
	payload: IPet
}

export const ONBOARDING_STATE: IOnboardingState = {
	step: 'create-your-account',
	tagId: '',
	payload: {
		contacts: [],
		reminders: [],
		species: '',
		vet: {
			phoneNumber: {
				value: '',
				visible: true,
			},
			name: {
				value: '',
				visible: true,
			},
		},
		specialNeeds: {
			value: '',
			visible: true,
		},
		temperament: '',
		name: '',
		isLost: false,
		isServiceAnimal: null,
		color: '',
		breed: '',
		birthdate: null,
		allergies: {
			value: '',
			visible: true,
		},
		vaccinations: [],
	},
}

const onboardingReducer: React.Reducer<
	typeof ONBOARDING_STATE,
	{
		type: string
		[key: string]: any
	}
> = (state, action) => {
	switch (action.type) {
		default:
			break
	}

	return state
}

export default onboardingReducer
