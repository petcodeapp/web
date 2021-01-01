import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPet } from '#types/models/pet'
import { IContact } from '#types/models/pet/Contact'
import { IVaccination } from '#types/models/pet/Vaccination'
import { IReminder } from '#types/models/pet/Reminder'

export interface IOnboardingState {
	step: string
	accountInfo: {
		fullName: string
		email: string
		phoneNumber: string
		password: string
		confirmPassword: string
	}
	tagInfo: {
		tagId: string
	}
	petInfo: Pick<
		IPet,
		| 'name'
		| 'species'
		| 'breed'
		| 'birthdate'
		| 'color'
		| 'temperament'
		| 'isServiceAnimal'
	>
	owners: IContact[]
	medicalInfo: {
		vetName: string
		vetPhoneNumber: string
		allergies: string
		specialNeeds: string
	}
	vaccinations: IVaccination[]
	reminders: IReminder[]
}

export const INITIAL_ONBOARDING_STATE: IOnboardingState = {
	step: 'create-your-account',
	accountInfo: {
		fullName: '',
		email: '',
		phoneNumber: '',
		password: '',
		confirmPassword: '',
	},
	tagInfo: {
		tagId: '',
	},
	petInfo: {
		name: '',
		species: '',
		breed: '',
		birthdate: null,
		color: '',
		temperament: '',
		isServiceAnimal: null,
	},
	owners: [],
	medicalInfo: {
		vetName: '',
		vetPhoneNumber: '',
		allergies: '',
		specialNeeds: '',
	},
	vaccinations: [],
	reminders: [],
}

const onboardingSlice = createSlice({
	name: 'onboarding',
	initialState: INITIAL_ONBOARDING_STATE,
	reducers: {
		setStep: (state, action: PayloadAction<string>) => {
			state.step = action.payload
			return state
		},
		setAccountInformation: (
			state,
			action: PayloadAction<IOnboardingState['accountInfo']>
		) => {
			state.accountInfo = action.payload
			return state
		},
		setTagInformation: (
			state,
			action: PayloadAction<IOnboardingState['tagInfo']>
		) => {
			state.tagInfo = action.payload
			return state
		},
		setPetInformation: (
			state,
			action: PayloadAction<IOnboardingState['petInfo']>
		) => {
			state.petInfo = action.payload
			return state
		},
		addOwner: (state, action: PayloadAction<IContact>) => {
			state.owners.push(action.payload)
			return state
		},
		setMedicalInformation: (
			state,
			action: PayloadAction<IOnboardingState['medicalInfo']>
		) => {
			state.medicalInfo = action.payload
			return state
		},
		addVaccination: (state, action: PayloadAction<IVaccination>) => {
			state.vaccinations.push(action.payload)
			return state
		},
		addReminder: (state, action: PayloadAction<IReminder>) => {
			state.reminders.push(action.payload)
			return state
		},
	},
})

export const onboardingActions = onboardingSlice.actions
export default onboardingSlice.reducer
