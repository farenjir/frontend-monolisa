import type { PropsWithChildren } from "react";
import { ConfigProvider, theme, type MappingAlgorithm } from "antd";

import { useLanguage } from "@/langs/useLanguage";
import { useTheme } from "@/hooks/useTheme";

import { AppContext } from "./index";

function ContextApi({ children }: PropsWithChildren) {
	// language
	const { direction, locale, ...langConfigs } = useLanguage();
	// theme
	const { themeAntMode, fontAntMode, selectedToken, themColorObject, ...themeConfigs } = useTheme(theme);
	// return
	return (
		<AppContext.Provider
			value={{
				// langs
				direction,
				locale,
				...langConfigs,
				selectedToken,
				...themeConfigs,
			}}
		>
			<ConfigProvider
				locale={locale}
				direction={direction}
				theme={{
					algorithm: [themeAntMode, ...fontAntMode] as unknown as MappingAlgorithm,
					token: themColorObject,
					// components: {
					// 	Carousel: {
					// 		colorBgContainer: themColorObject?.colorPrimary,
					// 		dotWidth: 8,
					// 		dotHeight: 8,
					// 	},
					// 	Timeline: {
					// 		itemPaddingBottom: 30,
					// 	},
					// },
				}}
			>
				{children}
			</ConfigProvider>
		</AppContext.Provider>
	);
}

export default ContextApi;
