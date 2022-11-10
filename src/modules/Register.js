import React from 'react';
import {
	Box,
	Flex,
	Heading,
	Button,
	Input,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { isCPF, isCEP } from 'brazilian-values';

function Register() {
	const route = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			cpf: '',
			profession: '',
			concil: '',
			register: '',
			cep: '',
			city: '',
			district: '',
			state: '',
			street: '',
			number: '',
			password: '',
			passwordConfirmation: '',
			complement: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Campo obrigatório'),
			email: Yup.string()
				.email('Email está no formato invalido')
				.required('Campo obrigatório'),
			cpf: Yup.string()
				.required('Campo obrigatório')
				.test('cpf', 'CPF é inválido', (value) => {
					return isCPF(value);
				}),
			profession: Yup.string().required('Campo obrigatório'),
			concil: Yup.string().required('Campo obrigatório'),
			state: Yup.string().required('Campo obrigatório'),
			cep: Yup.string()
				.required('Campo obrigatório')
				.test('cep', 'isCEP é inválido', (value) => {
					return isCEP(value);
				}),
			street: Yup.string().required('Campo obrigatório'),
			number: Yup.string().required('Campo obrigatório'),
			complement: Yup.string(),
			city: Yup.string().required('Campo obrigatório'),
			district: Yup.string().required('Campo obrigatório'),
			register: Yup.string().required('Campo obrigatório'),
			password: Yup.string().required('Necessário a utilização de senha'),
			passwordConfirmation: Yup.string().required('Necessário repetir a senha'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			try {
				route('/logged');
			} catch (e) {
				formik.setErrors(e);
			}
		},
	});

	const check = async (e) => {
		const data = await fetch(
			`https://viacep.com.br/ws/${e.target.value.replace(/\D/g, '')}/json/`,
		).then((res) => res.json());

		formik.setValues({
			...formik.values,
			cep: e.target.value,
			district: data?.bairro,
			city: data?.localidade,
			street: data?.logradouro,
			state: data?.uf,
		});
	};

	return (
		<Layout>
			<Flex align="center" h="100%">
				<Box mx="auto">
					<Heading color="#424A52">Cadastro</Heading>

					<form onSubmit={formik.handleSubmit}>
						<Box alignContent="center" m="0 auto" mt="32px" width="410px">
							<FormControl mt="16px" isInvalid={!!formik.errors.email}>
								{/* <FormLabel>Nome </FormLabel> */}
								<Input
									bg="white"
									placeholder="Nome"
									name="name"
									onChange={formik.handleChange}
									value={formik.values.name}
								/>
								{
									formik.errors.name ? (
										<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
									) : null
									// (
									// 	<FormHelperText>Esse campo so aceita nome.</FormHelperText>
									// )
								}
							</FormControl>

							<FormControl mt="16px" isInvalid={!!formik.errors.email}>
								{/* <FormLabel>Email</FormLabel> */}
								<Input
									bg="white"
									placeholder="Email"
									name="email"
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								{
									formik.errors.email ? (
										<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
									) : null
									// (
									// 	<FormHelperText>Informe o email.</FormHelperText>
									// )
								}
							</FormControl>

							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.cpf}
								>
									{/* <FormLabel>CPF</FormLabel> */}
									<Input
										bg="white"
										placeholder="CPF"
										name="cpf"
										onChange={(e) =>
											formik.setFieldValue('cpf', e.target.value.replace(/\D/g, ''))
										}
										value={formik.values.cpf}
									/>
									{
										formik.errors.cpf ? (
											<FormErrorMessage>{formik.errors.cpf}</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe o cpf.</FormHelperText>
										// )
									}
								</FormControl>

								<FormControl mt="16px" isInvalid={!!formik.errors.profession}>
									{/* <FormLabel>Profissão</FormLabel> */}
									<Select
										bg="white"
										placeholder="Profissão"
										name="profession"
										onChange={formik.handleChange}
										value={formik.values.profession}
									>
										<option value="nutricionista">Nutricionista</option>
										<option value="medico">Médico</option>
									</Select>
									{
										formik.errors.profession ? (
											<FormErrorMessage>
												{formik.errors.profession}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe a profissão.</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>

							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.concil}
								>
									{/* <FormLabel>Conselho</FormLabel> */}
									<Select
										bg="white"
										placeholder="Conselho"
										name="concil"
										onChange={(e) =>
											formik.setFieldValue('concil', e.target.value)
										}
										value={formik.values.concil}
									>
										<option value="crn1">CRN-1</option>
										<option value="crn2">CRN-2</option>
										<option value="crn3">CRN-3</option>
										<option value="crn4">CRN-4</option>
									</Select>
									{
										formik.errors.concil ? (
											<FormErrorMessage>
												{formik.errors.concil}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe o conselho.</FormHelperText>
										// )
									}
								</FormControl>

								<FormControl mt="16px" isInvalid={!!formik.errors.register}>
									{/* <FormLabel>Nº do registro</FormLabel> */}
									<Input
										bg="white"
										placeholder="Nº do registro"
										name="register"
										onChange={(e) =>
											formik.setFieldValue('register', e.target.value)
										}
										value={formik.values.register}
									/>
									{
										formik.errors.register ? (
											<FormErrorMessage>
												{formik.errors.register}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>
										// 		Informe o numero do registro.
										// 	</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>

							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.cep}
								>
									{/* <FormLabel>CEP</FormLabel> */}
									<Input
										onBlur={check}
										bg="white"
										placeholder="CEP"
										name="cep"
										onChange={(e) =>
											formik.setFieldValue('cep', e.target.value)
										}
										value={formik.values.cep}
									/>
									{
										formik.errors.cep ? (
											<FormErrorMessage>{formik.errors.cep}</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe o CEP.</FormHelperText>
										// )
									}
								</FormControl>

								<FormControl mt="16px" isInvalid={!!formik.errors.state}>
									{/* <FormLabel>Estado</FormLabel> */}
									<Input
										bg="white"
										placeholder="Estado"
										name="state"
										onChange={(e) =>
											formik.setFieldValue('state', e.target.value)
										}
										value={formik.values.state}
									/>
									{
										formik.errors.state ? (
											<FormErrorMessage>{formik.errors.state}</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>
										// 		Informe o estado.
										// 	</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>

							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.cep}
								>
									{/* <FormLabel>Cidade</FormLabel> */}
									<Input
										onBlur={check}
										bg="white"
										placeholder="Cidade"
										name="city"
										onChange={(e) =>
											formik.setFieldValue('city', e.target.value)
										}
										value={formik.values.city}
									/>
									{
										formik.errors.city ? (
											<FormErrorMessage>{formik.errors.city}</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe o CEP.</FormHelperText>
										// )
									}
								</FormControl>

								<FormControl mt="16px" isInvalid={!!formik.errors.district}>
									{/* <FormLabel>Bairro</FormLabel> */}
									<Input
										bg="white"
										placeholder="Bairro"
										name="district"
										onChange={(e) =>
											formik.setFieldValue('district', e.target.value)
										}
										value={formik.values.district}
									/>
									{
										formik.errors.district ? (
											<FormErrorMessage>
												{formik.errors.district}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>
										// 		Informe o estado.
										// 	</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>

							<FormControl mt="16px" isInvalid={!!formik.errors.street}>
								{/* <FormLabel>Rua</FormLabel> */}
								<Input
									bg="white"
									placeholder="Rua"
									name="street"
									onChange={(e) =>
										formik.setFieldValue('street', e.target.value)
									}
									value={formik.values.street}
								/>
								{
									formik.errors.street ? (
										<FormErrorMessage>{formik.errors.street}</FormErrorMessage>
									) : null
									// (
									// 	<FormHelperText>Informe a rua.</FormHelperText>
									// )
								}
							</FormControl>

							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.number}
								>
									{/* <FormLabel>Numero</FormLabel> */}
									<Input
										bg="white"
										placeholder="Numero"
										name="number"
										onChange={(e) =>
											formik.setFieldValue('number', e.target.value)
										}
										value={formik.values.number}
									/>
									{formik.errors.number ? (
										<FormErrorMessage>{formik.errors.number}</FormErrorMessage>
									) : (
										<FormHelperText>Informe o conselho.</FormHelperText>
									)}
								</FormControl>

								<FormControl mt="16px" isInvalid={!!formik.errors.complement}>
									{/* <FormLabel>Estado</FormLabel> */}
									<Input
										bg="white"
										placeholder="Complemento"
										name="complement"
										onChange={(e) =>
											formik.setFieldValue('complement', e.target.value)
										}
										value={formik.values.complement}
									/>
									{
										formik.errors.complement ? (
											<FormErrorMessage>
												{formik.errors.complement}
											</FormErrorMessage>
										) : null

										// (
										// 	<FormHelperText>Informe caso tenha.</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>
							<Flex>
								<FormControl
									mr="16px"
									mt="16px"
									isInvalid={!!formik.errors.password}
								>
									{/* <FormLabel>Senha</FormLabel> */}
									<Input
										type="password"
										bg="white"
										placeholder="Senha"
										name="password"
										onChange={(e) =>
											formik.setFieldValue('password', e.target.value)
										}
										value={formik.values.password}
									/>
									{
										formik.errors.password ? (
											<FormErrorMessage>
												{formik.errors.password}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Informe a senha.</FormHelperText>
										// )
									}
								</FormControl>

								<FormControl
									mt="16px"
									isInvalid={!!formik.errors.passwordConfirmation}
								>
									{/* <FormLabel>Senha</FormLabel> */}
									<Input
										type="password"
										bg="white"
										placeholder="Repetir senha"
										name="passwordConfirmation"
										onChange={(e) =>
											formik.setFieldValue(
												'passwordConfirmation',
												e.target.value,
											)
										}
										value={formik.values.passwordConfirmation}
									/>
									{
										formik.errors.passwordConfirmation ? (
											<FormErrorMessage>
												{formik.errors.passwordConfirmation}
											</FormErrorMessage>
										) : null
										// (
										// 	<FormHelperText>Confirme a senha.</FormHelperText>
										// )
									}
								</FormControl>
							</Flex>

							<Box align="center" mt="16px">
								<Button
									h="66px"
									w="412px"
									bg="#3E7D89"
									color="white"
									m="0 auto"
									type="submit"
								>
									Cadastrar
								</Button>
							</Box>
							<Box mt="16px">
								<Button
									h="66px"
									w="412px"
									bg="white"
									colorScheme="teal"
									variant="outline"
									m="0 auto"
									type="button"
									onClick={() => route('/')}
								>
									Cancelar
								</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Flex>
		</Layout>
	);
}

export default Register;
