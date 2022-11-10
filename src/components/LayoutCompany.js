import React from 'react';

import { Box, Flex, Image } from '@chakra-ui/react';
import shaped from '../images/shaped.png';

function Layout({ children }) {
	return (
		<>
			<Box w="100%" minH="100vh">
				<Box h="97px" w="100%" boxShadow="lg">
					<Image src={shaped} />
				</Box>
				<Flex>
					<Box w="170px" />
					<Box w="100%" h="100%" bg="#E4EBEE">
						{children}
					</Box>
				</Flex>
			</Box>
		</>
	);
}

export default Layout;
