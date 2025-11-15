"use client";

import { useCallback, useRef } from "react";
import { nanoid } from "nanoid";

export const useUuid = ( prefix?: string ) => {
	const idRef = useRef<string>(nanoid());
	const regenerate = useCallback(() => {
		idRef.current = nanoid();
		return idRef.current;
	}, []);
	return { uuid: idRef.current, regenerate };
};