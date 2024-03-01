import SideBar, { SideBarItem } from '@/components/SideBar'
import { paths } from '@/utils/paths'


export default function Page({ params }: { params: { slug: string } }) {

    const elements: SideBarItem[] = [
        {
            key: 'users',
            item: <SideBarItem label='Usuarios' type='link' link={`${paths.company.index}/${params.slug}/usuarios`} />
        },
    ]

    return <div className='flex flex-row gap-4 h-full overflow-y-auto'>
        <div className='flex flex-row gap-4 h-full overflow-y-auto'>
            <SideBar items={elements} />
            <div className='w-full'>
                ¡Bienvenido a esta empresa!
            </div>
        </div>

    </div>
}