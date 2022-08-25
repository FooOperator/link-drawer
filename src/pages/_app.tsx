// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider, useSession } from "next-auth/react";
import {
	ChakraProvider,
	Container,
	Heading,
	Spinner,
	Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactElement) => ReactNode;
	protected?: boolean;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);
	const layout = getLayout(<Component {...pageProps} />);

	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				{Component.protected ? <Auth>{layout}</Auth> : layout}
			</ChakraProvider>
		</SessionProvider>
	);
};

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const isUser = !!session?.user;
	useEffect(() => {
		if (status === "loading") return;
		if (!isUser) router.push("/401");
	}, [isUser, status, router]);

	if (isUser) {
		return children;
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <AwaitingFetch />;
};

const AwaitingFetch = () => (
	<Stack h="100vh" align="center">
		<Stack my="auto" align="center" spacing={30}>
			<Heading size="4xl">Loading</Heading>
			<Spinner speed={"1.4s"} h={235} w={235} />
		</Stack>
	</Stack>
);

const getBaseUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	}
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
