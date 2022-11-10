import React from 'react';
import layoutpicture from '../images/layoutpicture.png';
import { Box, Text, Flex, Image } from '@chakra-ui/react';

function Layout({ children }) {
	return (
		<>
			<Flex w="100%" minH="100vh">
				<Box  w="55%" bg="white" justifyContent="center" padding="20px">
					<Flex
						mx="auto"
						mt="190px"
						width="550px"
						height="241px"
						flexDir="column"
					>
						<Image src={layoutpicture} height="441px" />
						<Text
							mt="10px"
							fontWeight="700"
							textAlign="center"
							fontSize="20px"
							w="550px"
						>
							Utilizamos inteligência artificial para realizar a avaliação
							corporal por meio de fotos.
						</Text>
					</Flex>
				</Box>
				<Box mx="auto" width="45%" bg="#E4EBEE">
					{children}
				</Box>
			</Flex>
		</>
	);
}

export default Layout;
