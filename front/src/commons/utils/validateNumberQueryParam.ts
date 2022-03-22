export const validateNumberQueryParam = (value: string | null, defaultValue: number): number => {
	return (value !== null && typeof value !== 'undefined') ? (!Number.isNaN(Number(value)) ? (Number(value) !== 0 ? Math.abs(Number(value)) : defaultValue) : defaultValue) : defaultValue;
};