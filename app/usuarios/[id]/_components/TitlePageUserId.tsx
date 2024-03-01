'use client'
import SideBar, { SideBarItem } from '@/components/SideBar'
import client from '@/services/client'
import { User, UserKey } from '@/utils/models/user'
import { paths } from '@/utils/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TitlePageUserId({ id, children }: { id: number, children: React.ReactNode }) {

    const [title, setTitle] = useState('')

    const getTitle = async () => {
        const item: User = await client.localforage.useLocalForage.getItem({ key: UserKey, id: Number(id), propetyName: 'id' })
        setTitle(item.name)
    }

    useEffect(() => {
        getTitle()
    }, [])

    const elements: SideBarItem[] = [
        {
            key: 'titlePage',
            item: <SideBarItem label='Usuario' type='title' />
        },
        {
            key: 'title',
            item: <SideBarItem label='Data' type='link' link={`/usuarios/${id}`} />
        },
        {
            key: 'empresa',
            item: <SideBarItem label='Elegir empresa' type='link' link={`/usuarios/${id}/empresa`} />
        },
    ]



    return <div className='flex flex-col gap-4 h-full overflow-y-auto'>
        <Link href={`${paths.user.index}/${id}`} className='text-white bg-slate-800 rounded-lg text-xl hover:bg-slate-800/50 p-5'>
            Usuario <span>{title}</span>
        </Link>
        <div className='flex flex-row gap-4 h-full overflow-y-auto'>
            <SideBar items={elements} />
            <div className='w-full'>
                {children}
            </div>
        </div>
    </div>

}