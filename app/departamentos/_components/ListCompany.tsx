'use client'
import { LoaderApp } from '@/components/Loader'
import TableApp from '@/components/Table'
import client from '@/services/client'
import { Departament, DepartamentKey } from '@/utils/models/departament'
import { useEffect, useState } from 'react'


export default function ListDepartament() {

    const [isLoader, setIsLoader] = useState(true)

    const [list, setList] = useState<Departament[] | null>(null)

    const getListDepartament = async () => {
        setIsLoader(true)
        try {
            const newlist: Departament[] = await client.localforage.useLocalForage.get({ key: DepartamentKey })
            setList(newlist)
        } catch (err: any) {
            setList(null)
            console.log('hubo un error al traer las empresas')
        } finally {
            setIsLoader(false)
        }
    }

    useEffect(() => {
        getListDepartament()
    }, [])


    return (
        <div className="mx-auto flex flex-col gap-6 ">
            {isLoader ? (<LoaderApp />) : (
                <TableApp
                    tableHeaders={['id', 'Nombre', 'descripcion']}
                >
                    {list && list.map((company, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                            <td className="px-6 py-4">{company.id}</td>
                            <td className="px-6 py-4">{company.name}</td>
                            <td className="px-6 py-4">{company.description}</td>
                        </tr>
                    ))}
                </TableApp>
            )}

        </div>
    )
}
