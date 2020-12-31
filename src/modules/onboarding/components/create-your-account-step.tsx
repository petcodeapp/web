import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Formik, Form, Field } from 'formik'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import BaseButton from '#components/base-button'
import FormikErrorMessage from '#components/unified-error-message'

import 'yup-phone'

const INITIAL_VALUES = {
	fullName: '',
	emailAddress: '',
	phoneNumber: '',
	password: '',
	confirmPassword: '',
}

const CreateYourPetCodeAccountSchema = Yup.object().shape({
	fullName: Yup.string().label('Full name').required(),
	emailAddress: Yup.string().label('Email address').email().required(),
	phoneNumber: Yup.string().label('Phone number').phone('US', true).required(),
	password: Yup.string()
		.label('Password')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
			({ label }) =>
				`${label} must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter and one number`
		)
		.required(),
	confirmPassword: Yup.string()
		.label('Confirm password')
		.test('Match password', 'Passwords do not match', function (value) {
			return this.parent.password === value
		})
		.required(),
})

const CreateYourPetCodeAccountStep: React.FC = () => (
	<Formik
		initialValues={INITIAL_VALUES}
		validationSchema={CreateYourPetCodeAccountSchema}
		onSubmit={console.log}>
		{({ errors, touched, handleSubmit }) => (
			<OnboardingContainer>
				<Box flexGrow={1} />
				<Stack spacing={3}>
					<Text fontWeight="bold" fontSize="2.5rem">
						Create Your PetCode Account
					</Text>
					<Text fontSize="lg" color="petcode.neutral.600">
						New to PetCode? Get started with your account today!
					</Text>
				</Stack>
				<Form>
					<Stack spacing={6}>
						<Field
							as={OnboardingInput}
							name="fullName"
							placeholder="Full Name"
							autoComplete="name"
						/>
						<Field
							as={OnboardingInput}
							type="email"
							autoComplete="email"
							name="emailAddress"
							placeholder="Email Address"
						/>
						<Field
							as={OnboardingInput}
							type="tel"
							autoComplete="tel"
							name="phoneNumber"
							placeholder="Phone Number"
						/>
						<Stack isInline spacing={6}>
							<Box flexBasis="50%">
								<Field
									as={OnboardingInput}
									type="password"
									name="password"
									placeholder="Password"
								/>
							</Box>
							<Box flexBasis="50%">
								<Field
									as={OnboardingInput}
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
								/>
							</Box>
						</Stack>
						<FormikErrorMessage touched={touched} errors={errors} />
						<BaseButton
							type="submit"
							size="lg"
							alignSelf="end"
							colorScheme="petcode.blue"
							onClick={handleSubmit as any}>
							<Text
								textTransform="uppercase"
								letterSpacing="0.07em"
								lineHeight="1">
								Next Step
							</Text>
							<ChevronRightIcon boxSize="24px" />
						</BaseButton>
					</Stack>
				</Form>
				<Box flexGrow={1} />
			</OnboardingContainer>
		)}
	</Formik>
)

export default CreateYourPetCodeAccountStep
