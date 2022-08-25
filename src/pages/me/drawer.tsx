import { DownloadIcon } from "@chakra-ui/icons";
import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	ButtonGroup,
	Center,
	Fade,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	IconButton,
	Image,
	Input,
	Select,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";
import { MeLayout } from ".";
import { LinkDrawer } from "../[userId]";
import { NextPageWithLayout } from "../_app";

interface CustomizationSectionProps {
	buttonName: string;
	children: ReactElement;
}

const CustomizationSection: React.FC<CustomizationSectionProps> = ({
	buttonName,
	children,
}) => {
	return (
		<AccordionItem borderWidth={0}>
			<AccordionButton>
				<Flex w="100%" align="center" justify={"space-between"}>
					<Heading>{buttonName}</Heading>
					<AccordionIcon />
				</Flex>
			</AccordionButton>
			<AccordionPanel p={10}>{children}</AccordionPanel>
		</AccordionItem>
	);
};

const Toolbar: React.FC = () => {
	const [overImage, setOverImage] = useState(false);
	return (
		<Tabs variant="enclosed-colored">
			<TabList mx={[0, 0, 5, 4]}>
				<Tab>Identity</Tab>
				<Tab>Readability</Tab>
				<Tab>Theme</Tab>
			</TabList>
			<TabPanels px={1}>
				<TabPanel>
					<Stack gap={2}>
						<Stack>
							<Box
								pos="relative"
								onMouseOver={() => setOverImage(true)}
								onMouseLeave={() => setOverImage(false)}>
								<Image
									objectFit="cover"
									alt="avatar of current user"
									src="https://source.unsplash.com/photo-1659429470953-9ce6c3b382ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
								/>
								<Fade in={overImage}>
									<IconButton
										pos="absolute"
										right={3}
										top={3}
										aria-label="download your current avatar image"
										icon={<DownloadIcon boxSize={5} />}
									/>
								</Fade>
							</Box>
							<ButtonGroup>
								<Button w="100%">Change Image</Button>
								<Button w="100%">Remove</Button>
							</ButtonGroup>
						</Stack>
						<FormControl
							display="flex"
							justifyContent="space-between"
							alignItems="center">
							<FormLabel my="auto">Name</FormLabel>
							<Input
								size="xs"
								placeholder="Lucas Guerra Cardoso"
							/>
						</FormControl>
						<FormControl
							display="flex"
							justifyContent="space-between"
							alignItems="center">
							<FormLabel my="auto">About</FormLabel>
							<Textarea
								size="xs"
								resize="none"
								placeholder="Lucas Guerra Cardoso"
							/>
						</FormControl>
					</Stack>
				</TabPanel>
				<TabPanel>
					<Heading>Font</Heading>
					<Grid templateColumns={"repeat(3, 1fr)"} p={3}>
						<CardRadio
							title="Aa"
							subtitle="Sans Serif"
							onClick={function (): void {
								throw new Error(
									"Function not implemented."
								);
							}}
						/>
						<CardRadio
							title="Aa"
							subtitle="Serif"
							onClick={function (): void {
								throw new Error(
									"Function not implemented."
								);
							}}
						/>
						<CardRadio
							title="Aa"
							subtitle="Mono"
							onClick={function (): void {
								throw new Error(
									"Function not implemented."
								);
							}}
						/>
					</Grid>
				</TabPanel>
				<TabPanel>
					<>
						<Heading>Background</Heading>
						<Select />
						<Heading>Text</Heading>
						<Select />
						<Heading>Button</Heading>
						<Heading>Border</Heading>
						<Select />
						<Heading>Background</Heading>
						<Select />
					</>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

const gerber: NextPageWithLayout = () => {
	return (
		<>
			<Heading>Drawer</Heading>
			<Flex h="100%" w="100%" mt={10}>
				<Box w={["540px", "320px", "350px", "540px"]}>
					<Toolbar />
				</Box>
				<Box
					mt={38}
					ml={[9, 7, 6, "20%"]}
					w={["300px", "320px", "350px", "540px"]}>
					<LinkDrawer
						userData={{
							email: "John",
							emailVerified: new Date(),
							id: "120u301u230981",
							image: "https://source.unsplash.com/photo-1659429470953-9ce6c3b382ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
							name: "Ho",
						}}
						mode="editing"
					/>
				</Box>
			</Flex>
		</>
	);
};

interface CardRadioProps {
	title: string;
	subtitle: string;
	onClick: () => void;
}

const CardRadio: React.FC<CardRadioProps> = ({
	onClick,
	subtitle,
	title,
}) => {
	return (
		<Center flexDirection={"column"} borderWidth={1} p={2}>
			<Heading>{title}</Heading>
			<Text>{subtitle}</Text>
		</Center>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};

gerber.getLayout = (page) => <MeLayout>{page}</MeLayout>;
gerber.protected = true;
export default gerber;
