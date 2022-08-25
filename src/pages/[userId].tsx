import {
	Avatar,
	ButtonGroup,
	Container,
	Flex,
	Icon,
	IconButton,
	Link as ChakraLink,
	LinkBox,
	LinkOverlay,
	List,
	ListItem,
	Stack,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { Link, User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import superjson from "superjson";
import { MdIosShare } from "react-icons/md";
const userId: NextPage<{ userData: User }> = (props) => {
	return (
		<Flex>
			<LinkDrawer userData={props.userData} />
		</Flex>
	);
};

interface LinkDrawerProps {
	userData: User;
	mode?: "editing" | "visiting";
}

export const LinkDrawer: React.FC<LinkDrawerProps> = ({
	userData,
	mode = "visiting",
}) => {
	return (
			<Stack my="auto" align="center">
				{mode === "visiting" && (
					<ButtonGroup>
						<Tooltip
							label={`Subscribe to receive notifications about link and profile changes from this creator`}
							placement={"top"}>
							<IconButton aria-label="Subscribe" />
						</Tooltip>
						<Tooltip
							label={`Favorite this creator`}
							placement={"top"}>
							<IconButton aria-label="Favorite" />
						</Tooltip>
						<Tooltip
							label={`Share this drawer`}
							placement={"top"}>
							<IconButton
								aria-label="Share"
								icon={<MdIosShare size={25} />}
								onClick={() => {
									const a = async () => {
										try {
											await navigator.share();
											alert("could share");
										} catch (e) {
											alert("could not share.");
										}
									};
									a();
								}}
							/>
						</Tooltip>
					</ButtonGroup>
				)}

				<Avatar name={userData!.name} src={userData!.image} />
				<Text>{userData.name ?? userData.email}</Text>
				<Text>
					I{"'"}m just a goofy goober, crazy sigma on the
					grindset.
				</Text>
				{/* Link List */}
				<List>
					<CustomLink url="https://github.com/chakra-ui/chakra-ui/issues/3257" />
				</List>
			</Stack>
	);
};

interface CustomLinkProps {
	url: string;
	inactive?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({ inactive, url }) => {
	return (
		<LinkBox
			as="li"
			w="100%"
			sx={{ pointerEvents: inactive ? "none" : undefined }}>
			<LinkOverlay href={!inactive ? url : ""}>
				<Flex align="center" gap={3}>
					<Icon />

					<Text>Name of the link</Text>
				</Flex>
			</LinkOverlay>
		</LinkBox>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const userData: User = {
		name: "Dylan Lorne",
		email: "desolator.cord@outlook.com",
		emailVerified: new Date(),
		id: "cc6aa0c625e83c214c954f99b3f1eb52df991ccd8ae4d94c575ba55e13f9325e",
		image: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/tbvbvipimh2camf5nb2q",
	};

	return {
		props: {
			userData,
		},
	};
};

export default userId;
