import Link from 'next/link'

export type SideBarItem = {
    key: string
    item: any
}

export type SideBarProps = {
    items: SideBarItem[]
}

export default function SideBar(props: SideBarProps) {
    const { items } = props
    return (
        <div className="h-full flex flex-col gap-4 px-3 py-4 overflow-y-auto bg-gray-800 w-[200px] rounded-lg">
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="w-full">
                        {item.item}
                    </li>
                ))}
            </ul>
        </div>
    )
}


interface SideBarItemProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    type?: 'link' | 'button' | 'title'
    link?: string
    icon?: JSX.Element
    label: string
}

const itemclass = 'text-white font-light text-md flex w-full justify-start items-center p-2 rounded-lg text-white hover:bg-gray-700'

export function SideBarItem(props: SideBarItemProps) {
    const { link, icon, label, type = 'title', ...buttonProps } = props

    let typeItem
    if (link) {
        typeItem = 'link'
    } else {
        typeItem = type
    }

    if (typeItem === 'link') {
        return (
            <Link href={link as string} className={itemclass}>
                {icon}
                {label}
            </Link>
        )
    }

    if (typeItem === 'button') {
        return <button type='button' className={itemclass} {...buttonProps}>
            {icon}
            {label}
        </button>
    }

    if (typeItem === 'title') {
        return (
            <h2 className="flex w-full items-center p-2 rounded-lg text-white font-medium">
                {icon}
                {label}
            </h2>
        )
    }
}