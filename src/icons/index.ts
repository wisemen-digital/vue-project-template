import * as iconCollection from '@/icons/iconCollection'

function convertIconName(iconName: string): Icon {
	const name = iconName.replace('Icon', '')
	return (name.charAt(0).toLowerCase() + name.slice(1)) as Icon
}

export const iconNames = Object.keys(iconCollection).map(convertIconName)

export const iconComponents = Object.keys(iconCollection).reduce(
	(acc, key) => {
		const iconComponent = iconCollection[key as keyof typeof iconCollection]
		return {
			...acc,
			[convertIconName(key)]: iconComponent,
		}
	},
	{} as Record<Icon, (typeof iconCollection)[keyof typeof iconCollection]>
)

export type WithoutIconSuffix<TFullIconName extends string> = TFullIconName extends `${infer IconName}Icon`
	? IconName
	: never
export type Icon = WithoutIconSuffix<Uncapitalize<keyof typeof iconCollection>>

export const icons = iconComponents
