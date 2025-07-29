import { useEffect } from "react";

import { useGetConditionsForNetworks } from "@/app/[locale]/panel/applications/networks/components/shared/index.hooks";
import { AppRoutes } from "@/constants/routes";
import {
	type BRSmartFilterCombinator,
	RedirectToSmartFilter,
	StringOperators,
} from "@behinrahkar/br-smart-cpl-filter";
import type { ECElementEvent, EChartsType } from "echarts";

declare module "echarts" {
	interface ECElementEvent {
		data: { name: string };
	}
}

type Props = {
	pathname: keyof typeof AppRoutes;
	condition: { label: string };
	operator?: StringOperators;
	nextOperator?: BRSmartFilterCombinator;
	chart?: EChartsType;
	clickOnCentered?: boolean;
};

export const handleOnClickCentered = (
	params: ECElementEvent,
	callback: VoidFunction,
	chart?: EChartsType,
) => {
	if (params?.event) {
		const { event } = params;
		const { offsetX, offsetY } = event;
		const { width, height } = chart?.getDom().getBoundingClientRect() || {
			width: 0,
			height: 0,
		};
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = 50;
		const distance = Math.sqrt((offsetX - centerX) ** 2 + (offsetY - centerY) ** 2);
		if (distance <= radius) {
			callback();
		}
	}
};

export default function useRedirectOnChart({
	chart,
	pathname,
	condition,
	operator,
	nextOperator,
	clickOnCentered,
}: Props) {
	const { getConditions } = useGetConditionsForNetworks();

	const handleOnClick = (value: string) => {
		const conditions = [Object.assign({}, condition, { value })];
		const base64Conditions = getConditions(conditions, {
			operator: operator || StringOperators["="],
			nextOperator,
		});
		window.localStorage.setItem(RedirectToSmartFilter.Normalize, base64Conditions);
		window.open(`${AppRoutes[pathname]}`, "_blank");
	};

	const handleChartClick = (params: ECElementEvent) => {
		const name = params?.data?.name || params?.name;
		if (name) {
			if (clickOnCentered) {
				return handleOnClickCentered(params, () => handleOnClick(name), chart);
			}
			handleOnClick(name);
		}
	};

	useEffect(() => {
		chart?.on?.("click", handleChartClick);
		return () => {
			chart?.off?.("click", handleChartClick);
		};
	}, [chart]);
}
