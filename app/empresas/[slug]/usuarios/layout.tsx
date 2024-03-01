import SideBar, { SideBarItem } from '@/components/SideBar'
import { paths } from '@/utils/paths'


export default function UsersCompanyLayout({ children, params }: {
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
            item: <SideBarItem label='Lista' type='link' link={`${paths.company.index}/${params.slug}/usuarios`} />
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
