'use client'
import { LoaderApp } from '@/components/Loader'
import TableApp from '@/components/Table'
import client from '@/services/client'
import { Company, CompanyKey } from '@/utils/models/company'
import { Departament, DepartamentKey } from '@/utils/models/departament'
import { User, UserKey } from '@/utils/models/user'
import { UserOnCompanyKey } from '@/utils/models/usersOnCompany'
import { useEffect, useState } from 'react'


export default function ListUsersCompany({ slug }: { slug: string }) {

    const [isLoader, setIsLoader] = useState(true)

    const [list, setList] = useState<User[] | null>(null)
    const [departaments, setDepartaments] = useState<Departament[] | null>(null)
    const [company, setCompany] = useState<Company | null>(null)

    const getListUser = async () => {
        setIsLoader(true)
        try {
            const companyItem: Company = await client.localforage.useLocalForage.getItem({ key: CompanyKey, id: slug, propetyName: 'slug' })
            setCompany(companyItem)

            const newDepartamentList: Departament[] = await client.localforage.useLocalForage.get({ key: DepartamentKey })
            setDepartaments(newDepartamentList)

            const newUserlist: User[] = await client.localforage.useLocalForage.get({ key: UserKey })
            const newUserOnCompanylist: UserOnCompanyKey[] = await client.localforage.useLocalForage.get({ key: UserOnCompanyKey })

            const userIds: number[] = newUserOnCompanylist
                .filter(userOnCompany => userOnCompany.companyId === companyItem.id)
                .map(userOnCompany => userOnCompany.userId)

            const usersFilter: User[] = newUserlist.filter(user => userIds.includes(user.id))

            setList(usersFilter)

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
                            <td className="px-6 py-4">{company?.name}</td>
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

