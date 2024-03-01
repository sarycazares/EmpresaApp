'use client'
import { LoaderApp } from '@/components/Loader'
import TableApp from '@/components/Table'
import client from '@/services/client'
import { Company, CompanyKey } from '@/utils/models/company'
import { Departament, DepartamentKey } from '@/utils/models/departament'
import { User, UserKey } from '@/utils/models/user'
import { paths } from '@/utils/paths'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function ListUsers() {

    const [isLoader, setIsLoader] = useState(true)

    const [list, setList] = useState<User[] | null>(null)
    const [departaments, setDepartaments] = useState<Departament[] | null>(null)
    const [company, setCompany] = useState<Company[] | null>(null)

    const getListUser = async () => {
        setIsLoader(true)
        try {
            const companysItem: Company[] = await client.localforage.useLocalForage.get({ key: CompanyKey })
            setCompany(companysItem)

            const newDepartamentList: Departament[] = await client.localforage.useLocalForage.get({ key: DepartamentKey })
            setDepartaments(newDepartamentList)

            const newUserlist: User[] = await client.localforage.useLocalForage.get({ key: UserKey })

            setList(newUserlist)

        } catch (err: any) {
            setList(null)
            console.log('hubo un error al traer las empresas')
        } finally {
            setIsLoader(false)
        }
    }

    useEffect(() => {
        getListUser()
    }, [])


    return (
        <div className="mx-auto flex flex-col gap-6 ">
            {isLoader ? (<LoaderApp />) : (
                <TableApp
                    tableHeaders={['id', 'Nombre', 'Departamento', 'Compañia']}
                >
                    {list && list.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                            <td className="px-6 py-4">{user.id}</td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{getName(departaments as Departament[], user.departamentId)}</td>
                            <td className="px-6 py-4">
                                <Link
                                    href={`${paths.user.index}/${user.id}`}
                                    className='hover:bg-slate-500/50 p-2 rounded-md text-white'>
                                    elegir usuario
                                </Link>
                            </td>
                        </tr>
                    ))}
                </TableApp>
            )}

        </div>
    )
}

function getName(array: any[], id: number) {
    const item = array.find((item) => {
        return item.id == id
    })

    return item ? item.name : ''
}

