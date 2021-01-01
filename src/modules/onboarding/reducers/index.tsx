import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPet } from '#types/models/pet'
import { IContact } from '#types/models/pet/Contact'
import { IVaccination } from '#types/models/pet/Vaccination'
import { IReminder } from '#types/models/pet/Reminder'

export interface IOnboardingState {
	step: string
	account: {
		tagId: string
		fullName: string
		password: string
		email: string
		phoneNumber: string
	}
	pet: IPet
}

export const INITIAL_ONBOARDING_STATE: IOnboardingState = {
	step: 'create-your-account',
	account: {
		tagId: '',
		fullName: '',
		password: '',
		email: '',
		phoneNumber: '',
	},
	pet: {
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

const onboardingSlice = createSlice({
	name: 'onboarding',
	initialState: INITIAL_ONBOARDING_STATE,
	reducers: {
		setStep: (state, action: PayloadAction<string>) => {
			state.step = action.payload
			return state
		},
		createYourAccount: (
			state,
			action: PayloadAction<
				Pick<
					IOnboardingState['account'],
					'fullName' | 'password' | 'email' | 'phoneNumber'
				>
			>
		) => {
			state.account = {
				...state.account,
				...action.payload,
			}
			return state
		},
		connectYourTag: (
			state,
			action: PayloadAction<Pick<IOnboardingState['account'], 'tagId'>>
		) => {
			state.account = {
				...state.account,
				...action.payload,
			}
			return state
		},
		setPetInformation: (
			state,
			action: PayloadAction<
				Pick<
					IPet,
					| 'name'
					| 'species'
					| 'breed'
					| 'birthdate'
					| 'color'
					| 'temperament'
					| 'isServiceAnimal'
				>
			>
		) => {
			state.pet = {
				...state.pet,
				...action.payload,
			}
			return state
		},
		addOwner: (state, action: PayloadAction<IContact>) => {
			state.pet.contacts.push(action.payload)
			return state
		},
		setMedicalInformation: (
			state,
			action: PayloadAction<{
				allergies: string
				specialNeeds: string
				vetName: string
				vetPhoneNumber: string
			}>
		) => {
			state.pet.allergies.value = action.payload.allergies
			state.pet.specialNeeds.value = action.payload.specialNeeds
			state.pet.vet.name.value = action.payload.vetName
			state.pet.vet.phoneNumber.value = action.payload.vetPhoneNumber
			return state
		},
		addVaccination: (state, action: PayloadAction<IVaccination>) => {
			state.pet.vaccinations.push(action.payload)
			return state
		},
		addReminder: (state, action: PayloadAction<IReminder>) => {
			state.pet.reminders.push(action.payload)
			return state
		},
	},
})

export const onboardingActions = onboardingSlice.actions
export default onboardingSlice.reducer
