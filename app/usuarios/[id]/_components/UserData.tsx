'use client'
import { LoaderApp } from '@/components/Loader'
import TableApp from '@/components/Table'
import client from '@/services/client'
import { Company, CompanyKey } from '@/utils/models/company'
import { Departament, DepartamentKey } from '@/utils/models/departament'
import { User, UserKey } from '@/utils/models/user'
import { UserOnCompanyKey } from '@/utils/models/usersOnCompany'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function UserData({ id }: { id: number }) {

    const [isLoader, setIsLoader] = useState(true)

    const [user, setUser] = useState<User | null>(null)
    const [departaments, setDepartaments] = useState<Departament[] | null>(null)

    const getListUser = async () => {
        setIsLoader(true)
        try {

            const newDepartamentList: Departament[] = await client.localforage.useLocalForage.get({ key: DepartamentKey })
            setDepartaments(newDepartamentList)

            const newUser: User = await client.localforage.useLocalForage.getItem({ key: UserKey, id: id, propetyName: 'id' })
            setUser(newUser)

        } catch (err: any) {
            setUser(null)
            console.log('hubo un error al traer los datos del usuario')
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
                    tableHeaders={['id', 'Nombre', 'Departamento']}
                >
                    {user && (
                        <tr className={'bg-gray-800'}>
                            <td className="px-6 py-4">{user.id}</td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{getName(departaments as Departament[], user.departamentId)}</td>

                        </tr>
                    )}
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
