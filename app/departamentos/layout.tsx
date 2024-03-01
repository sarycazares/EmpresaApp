import SideBar, { SideBarItem } from '@/components/SideBar'
import { paths } from '@/utils/paths'

const elements: SideBarItem[] = [
    {
        key: 'titlePage',
        item: <SideBarItem label='Departamentos' type='title' />
    },
    {
        key: 'title',
        item: <SideBarItem label='Lista' type='link' link={paths.departament.index} />
    },
    {
        key: 'create',
        item: <SideBarItem label='Crear departamento' type='link' link={paths.departament.create} />
    },
]

export default function DepartamentsLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className=''>
            <div className='flex flex-row gap-4 bg-[#151a28] h-full overflow-y-auto'>
                <SideBar items={elements} />
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div >
    )
}
