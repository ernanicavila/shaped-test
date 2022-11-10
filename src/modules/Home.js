import React from 'react';
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import LayoutCompany from '../components/LayoutCompany';
import done from '../images/done.png';

function Home() {
	return (
		<LayoutCompany>
			<Flex
				alignItems="center"
				rounded="md"
				h="817px"
				m="26px"
				bg="white"
				justifyContent="center"
			>
				<Box flexDir="column" h="350px">
					<Text fontSize="20px" fontWeight="700" textAlign="center">
						Parabéns! Você acessou o sistema
					</Text>
					<Image h="303px" mx="auto" src={done} />
				</Box>
			</Flex>
		</LayoutCompany>
	);
}

export default Home;
