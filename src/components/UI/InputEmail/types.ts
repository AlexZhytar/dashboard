import React from "react";

export interface InputMailProps {
	placeholder?: string;
	value: string;
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
	number?: boolean;
	name?: string;
}