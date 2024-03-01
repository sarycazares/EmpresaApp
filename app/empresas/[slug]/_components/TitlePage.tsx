'use client'
import client from '@/services/client'
import { Company, CompanyKey } from '@/utils/models/company'
import { paths } from '@/utils/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TitlePageSlug({ slug }: { slug: string }) {

    const [title, setTitle] = useState('')

    const getTitle = async () => {
        const item: Company = await client.localforage.useLocalForage.getItem({ key: CompanyKey, id: slug, propetyName: 'slug' })
        setTitle(item.name)
    }

    useEffect(() => {
        getTitle()
    }, [])


    return <Link href={`${paths.company.index}/${slug}`} className='text-white bg-slate-800 rounded-lg text-xl hover:bg-slate-800/50 p-5'>
        Empresa <span>{title}</span>
    </Link>


}