import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";

const fourOhOne: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>Error - 401</title>
			</Head>
			<Flex h="100vh">
				<Flex
					direction="column"
					justify="space-evenly"
					align="center"
					as="article"
					alignSelf="center"
					mx="auto"
					gap={4}>
					<Heading size="3xl" whiteSpace="nowrap">
						Unauthorized Access
					</Heading>
					<Heading size="2xl">
						Status Code{" "}
						<Text as="span" color="red.600">
							401
						</Text>
					</Heading>
					<Text fontSize={"1.9rem"}>
						Please{" "}
						<Link
							href="/api/auth/signin"
							textDecorationStyle={"solid"}
							color="yellow.600">
							Log in
						</Link>{" "}
						to access our services
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default fourOhOne;
