'use client'
import { LoaderApp } from '@/components/Loader'
import TableApp from '@/components/Table'
import client from '@/services/client'
import { Company, CompanyKey } from '@/utils/models/company'
import { paths } from '@/utils/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function ListCompany() {

    const [isLoader, setIsLoader] = useState(true)

    const [list, setList] = useState<Company[] | null>(null)

    const getListCompany = async () => {
        setIsLoader(true)
        try {
            const newlist: Company[] = await client.localforage.useLocalForage.get({ key: CompanyKey })
            setList(newlist)
        } catch (err: any) {
            setList(null)
            console.log('hubo un error al traer las empresas')
        } finally {
            setIsLoader(false)
        }
    }

    useEffect(() => {
        getListCompany()
    }, [])


    return (
        <div className="mx-auto flex flex-col gap-6 ">
            {isLoader ? (<LoaderApp />) : (
                <TableApp
                    tableHeaders={['id', 'Nombre', 'Slug', 'descripcion', '']}
                >
                    {list && list.map((company, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                            <td className="px-6 py-4">{company.id}</td>
                            <td className="px-6 py-4">{company.name}</td>
                            <td className="px-6 py-4">{company.slug}</td>
                            <td className="px-6 py-4">{company.description}</td>
                            <td className="px-6 py-4">
                                <Link
                                    href={`${paths.company.index}/${company.slug}`}
                                    className='hover:bg-slate-500/50 p-2 rounded-md text-white'>
                                    ir a empresa
                                </Link>
                            </td>
                        </tr>
                    ))}
                </TableApp>
            )}

        </div>
    )
}


