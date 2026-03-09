export const blockDbName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`${tableName}_blocks_${alias}`;

export const groupDbName =
	(alias: string) =>
	({ tableName }: { tableName?: string }) =>
		`${tableName}_${alias}`;
