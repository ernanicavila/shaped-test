import React from 'react';
import Layout from '../components/Layout';
import {
	Box,
	Flex,
	Heading,
	Button,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Login() {
	const route = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('Email está no formato invalido')
				.required('Campo obrigatório'),
			password: Yup.string().required('Necessário a utilização de senha'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			try {
				route('/logged');
			} catch (e) {
				formik.setErrors({ password: 'Email ou senha estão incorretos' });
			}
		},
	});
	return (
		<Layout>
			<Flex align="center" h="100%">
				<Box mx="auto">
					<Heading color="#424A52">Fazer Login</Heading>
					<form onSubmit={formik.handleSubmit}>
						<Box alignContent="center" m="0 auto" mt="64px" width="412px">
							<FormControl mt="16px" isInvalid={!!formik.errors.email}>
								<FormLabel>Email </FormLabel>
								<Input
									bg="white"
									placeholder="Email"
									name="email"
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								{formik.errors.email ? (
									<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
								) : (
									<FormHelperText>Esse campo so aceita email.</FormHelperText>
								)}
							</FormControl>

							<FormControl mt="16px" isInvalid={!!formik.errors.password}>
								<FormLabel>Senha</FormLabel>
								<Input
									bg="white"
									type="password"
									placeholder="Senha"
									name="password"
									onChange={formik.handleChange}
									value={formik.values.password}
								/>
								{formik.errors.password ? (
									<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
								) : (
									<FormHelperText>Informe a senha.</FormHelperText>
								)}
							</FormControl>

							<Box align="center" mt="16px">
								<Button
									h="66px"
									w="412px"
									bg="#3E7D89"
									color="white"
									m="0 auto"
									type="submit"
								>
									Logar
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
									onClick={() => route('/register')}
								>
									Cadastrar
								</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Flex>
		</Layout>
	);
}

export default Login;
