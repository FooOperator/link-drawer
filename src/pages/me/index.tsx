import {
	Divider,
	Flex,
	Heading,
	Avatar,
	IconButton,
	Link,
	Tooltip,
	Kbd,
	Input,
	Container,
	Button,
	Text,
	Modal,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalOverlay,
	useDisclosure,
	List,
	ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {
	ReactElement,
	useCallback,
	useEffect,
	useState,
} from "react";
import { NextPageWithLayout } from "../_app";
import { BsGearFill } from "react-icons/bs";
import { ImDrawer } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { IconType } from "react-icons";
import { SearchIcon } from "@chakra-ui/icons";
import SEARCH_SAMPLE from "../../data/searchSample.json";
import {
	signOut,
	useSession,
} from "next-auth/react";
import { Session } from "inspector";

const gerber: NextPageWithLayout<{ session: Session }> = ({ session }) => {
	return (
		<>
			<Heading>Home</Heading>
		</>
	);
};

const SidebarNavLink: React.FC<{
	route: string;
	Icon: IconType;
	color: string;
	handleClick: () => void;
}> = ({ Icon, route, color, handleClick }) => {
	return (
		<Tooltip
			label={
				route.charAt(0).toUpperCase() + route.slice(1) || "Home"
			}
			hasArrow
			fontSize={"lg"}
			placement={"right"}>
			<IconButton
				size={"lg"}
				py={0}
				bg={"none"}
				color={color}
				aria-label={`go to ${route}`}
				icon={<Icon size={32} />}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};

const SidebarNav = () => {
	const router = useRouter();
	const routes: [route: string, Icon: IconType][] = [
		["", AiFillHome],
		["drawer", ImDrawer],
	];
	const { data: session, status } = useSession();

	return (
		<Flex direction="column" p={4} gap={1} bg={"gray.900"}>
			{routes.map(([route, Icon], index) => (
				<>
					<SidebarNavLink
						key={index}
						color={index === 0 ? "purple" : "teal"}
						handleClick={() => router.push(`/me/${route}`)}
						route={route}
						Icon={Icon}
					/>
					{index + 1 !== routes.length && (
						<Divider bg={"gray.500"} />
					)}
				</>
			))}
			<IconButton
				mt="auto"
				size={"lg"}
				bg={"none"}
				aria-label={`open account menu`}
				icon={
					<Avatar
						src={session?.user?.image}
						bg="none"
						rounded={0}
						size={"sm"}
					/>
				}
				onClick={() => alert("profile")}
			/>
			<SidebarNavLink
				handleClick={() => router.push(`/me/settings`)}
				Icon={BsGearFill}
				color={"teal"}
				route={"settings"}
			/>
			<button
				onClick={() =>
					signOut({
						callbackUrl: `${window.location.origin}`,
					})
				}>
				sign out
			</button>
		</Flex>
	);
};

const Main: React.FC<{ children: ReactElement }> = ({ children }) => {
	return (
		<Flex direction="column" as="main" h="100%" w="100%">
			{children}
		</Flex>
	);
};

const Footer: React.FC = () => {
	return (
		<Flex as="footer" mt="auto" gap={4}>
			<Link href="/info/about">About</Link>
			<Link href="https://github.com/FooOperator" isExternal>
				Github
			</Link>
		</Flex>
	);
};

const SearchModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [searchTerm, setSearchTerm] = useState("");
	const [options, setOptions] = useState(() => SEARCH_SAMPLE);

	const handleModalToggle = useCallback(
		(e: KeyboardEvent) => {
			if (!(e.ctrlKey && e.key === "k")) return;
			e.preventDefault();

			if (isOpen) {
				onClose();
			} else {
				onOpen();
			}
		},
		[isOpen, onClose, onOpen]
	);

	const handleSearchTermChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchTerm(e.currentTarget.value);
	};

	useEffect(() => {
		document.addEventListener("keydown", handleModalToggle);

		return () => {
			document.removeEventListener("keydown", handleModalToggle);
		};
	}, [handleModalToggle]);

	useEffect(() => {
		setOptions(() =>
			SEARCH_SAMPLE.filter(({ name }) =>
				name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm]);

	return (
		<>
			<Button w="100%" onClick={onOpen} py={6}>
				<Flex align="center" w="100%" gap={4}>
					<SearchIcon ml={5} />
					<Text>What do you need?</Text>
					<Flex ml="auto" align="center" gap={1}>
						<Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
					</Flex>
				</Flex>
			</Button>
			<Modal onEsc={onClose} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minH={"50%"}>
					<ModalBody>
						<Flex mt={3}>
							<Input
								value={searchTerm}
								onChange={handleSearchTermChange}
								placeholder="Search for..."
							/>
						</Flex>
						<Divider />
						<List spacing={1} mt={2}>
							{options.map((option, index) => (
								<ListItem key={index}>
									<Button
										w="100%"
										py={2}
										px={3}
										rounded={5}
										borderWidth={1}>
										<Text fontSize={"lg"}>
											{option.name}
										</Text>
									</Button>
								</ListItem>
							))}
						</List>
					</ModalBody>
					<ModalFooter>
						<Flex>
							<Text>
								<Kbd>ESC</Kbd> to quit
							</Text>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export const MeLayout: React.FC<{
	children: ReactElement;
}> = ({ children }) => {
	return (
		<Flex h="100vh">
			<SidebarNav />
			<Divider orientation="vertical" />
			<Flex direction="column" h="100%" w="100%" mt={5} ml={4}>
				<Container>
					<SearchModal />
				</Container>
				<Main>{children}</Main>
				<Footer />
			</Flex>
		</Flex>
	);
};

gerber.getLayout = (page) => <MeLayout>{page}</MeLayout>;
gerber.protected = true;
export default gerber;
