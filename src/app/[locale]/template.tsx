"use client";
import React, {useEffect} from "react";
import {setViewportHeight} from "@/utils";

export default function Template({children}: { children: React.ReactNode }) {
	useEffect(() => {
		return setViewportHeight();
	}, []);
	
	return <>{children}</>;
}