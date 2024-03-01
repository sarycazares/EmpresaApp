import SideBar, { SideBarItem } from '@/components/SideBar'
import { paths } from '@/utils/paths'

const elements: SideBarItem[] = [
    {
        key: 'titlePage',
        item: <SideBarItem label='Empresas' type='title' />
    },
    {
        key: 'title',
        item: <SideBarItem label='Lista' type='link' link={paths.company.index} />
    },
    {
        key: 'create',
        item: <SideBarItem label='Crear empresa' type='link' link={paths.company.create} />
    },
]

export default function CompanyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-row gap-4 h-full overflow-y-auto'>
            <SideBar items={elements} />
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}


