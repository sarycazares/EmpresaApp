'use client'
import { LoaderApp } from '@/components/Loader'
import PickCompanyForm from './PickCompanyForm'
import { useEffect, useState } from 'react'
import { Company, CompanyKey } from '@/utils/models/company'
import client from '@/services/client'

export default function CompanyListCheck({ userId }: { userId: number }) {

    const [list, setList] = useState<Company[] | null>(null)
    const [isLoader, setIsLoader] = useState(true)

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

        <div className="mx-auto flex flex-col gap-6 w-full ">
            {isLoader ? (<LoaderApp />) : (
                <div className="w-full flex flex-col gap-6 ">
                    {list && list.map((company, index) => (
                        <PickCompanyForm key={index} userId={userId} company={company} />
                    ))}
                </div>
            )}

        </div>
    )
}