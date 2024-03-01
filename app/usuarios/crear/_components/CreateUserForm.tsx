'use client'
import { AlertApp } from '@/components/Alert'
import InputSelect, { OptionsInputSelect } from '@/components/Input/inputSelect'
import InputText from '@/components/Input/inputText'
import { LoaderApp } from '@/components/Loader'
import client from '@/services/client'
import { Departament, DepartamentKey } from '@/utils/models/departament'
import { UserKey } from '@/utils/models/user'
import { paths } from '@/utils/paths'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const defaultDepartament = [
    {
        value: 0,
        label: 'Sin asignar'
    }
]


export default function CreateUserForm({ slug }: { slug: string }) {

    const [isLoader, setIsLoader] = useState(false)
    const [msg, setMsg] = useState('')

    const nameRef = useRef<any>(null)
    const departamentRef = useRef<any>(null)
    const router = useRouter()

    const [departaments, setDepartaments] = useState<OptionsInputSelect[]>([])

    const getData = async () => {
        setIsLoader(true)
        // const companyItem: Company = await client.localforage.useLocalForage.getItem({ key: CompanyKey, id: slug, propetyName: 'slug' })
        // setCompany(companyItem)

        const departaments = await client.localforage.useLocalForage.get({ key: DepartamentKey })
        const departamentList = convertDepartamentToOptions(departaments)

        setDepartaments(departamentList)
        setIsLoader(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async () => {
        setIsLoader(true)
        setMsg('')

        const name = nameRef.current
        const departament = departamentRef.current

        try {
            const newUser = { name: name.getValue(), departamentId: departament.getValue() }
            await client.localforage.useLocalForage.set({ key: UserKey, item: newUser })

            // const newUserOnCompany = { userId: idUser, companyId: company?.id }

            // console.log(idUser, newUserOnCompany)
            // await client.localforage.useLocalForage.set({ key: UserOnCompanyKey, item: newUserOnCompany })

            router.push(paths.user.index)
        } catch (err: any) {
            setMsg('Hubo un error :c')
        } finally {
            setIsLoader(false)
        }
    }

    return (
        <div>
            {isLoader ? (
                <LoaderApp />
            ) : (
                <div className="flex flex-col gap-6 ">
                    {msg && (
                        <AlertApp msg={msg} />
                    )}
                    <InputText
                        ref={nameRef}
                        title='Nombre'
                    />
                    <InputSelect
                        ref={departamentRef}
                        title='Departamento'
                        options={departaments.length != 0 ? departaments : defaultDepartament}
                    />
                    <button type='button'
                        onClick={handleSubmit}
                        disabled={isLoader}
                        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                        Crear
                    </button>
                </div>
            )}
        </div>

    )
}

function convertDepartamentToOptions(departaments: Departament[]): OptionsInputSelect[] {

    console.log(departaments)
    return departaments.map(item => ({
        value: item.id,
        label: item.name
    }))
}