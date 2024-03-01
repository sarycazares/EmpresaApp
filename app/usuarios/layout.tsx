import SideBar, { SideBarItem } from '@/components/SideBar'
import { paths } from '@/utils/paths'


export default function UsersLayout({ children, params }: {
    children: React.ReactNode;
    params: { slug: string }
}) {

    const elements: SideBarItem[] = [
        {
            key: 'titlePage',
            item: <SideBarItem label='Usuarios' type='title' />
        },
        {
            key: 'title',
            item: <SideBarItem label='Lista' type='link' link={`${paths.user.index}`} />
        },
        {
            key: 'title',
            item: <SideBarItem label='Crear usuario' type='link' link={`${paths.user.create}`} />
        },
    ]

    return (
        <div className=''>
            <div className='flex flex-row gap-4 h-full overflow-y-auto'>
                <SideBar items={elements} />
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div >
    )
}
