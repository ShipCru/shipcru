export const blockDbName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`${tableName}_blocks_${alias}`;

export const groupDbName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`${tableName}_${alias}`;

export const selectDbName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`${tableName}_${alias}`;

export const selectEnumName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`enum_${tableName}_${alias}`;
