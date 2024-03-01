'use client'
import { LoaderApp } from '@/components/Loader'
import client from '@/services/client'
import { Company } from '@/utils/models/company'
import { UserOnCompany, UserOnCompanyKey } from '@/utils/models/usersOnCompany'
import { useEffect, useState } from 'react'

export default function PickCompanyForm({ userId, company }: { userId: number, company: Company }) {

    const [isLoader, setIsLoader] = useState(false)
    const [check, setCheck] = useState(false)
    const [id, setId] = useState<number | null>(null)

    const getData = async () => {
        setIsLoader(true)

        const usersOnCompany: UserOnCompany[] = await client.localforage.useLocalForage.get({ key: UserOnCompanyKey })
        const item = usersOnCompany.find(user => user.userId === userId && user.companyId === company.id)

        if (item) {
            setId(item.id)
            setCheck(true)
        } else {
            setId(null)
            setCheck(false)
        }

        setIsLoader(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleChange = async (values: boolean) => {
        setIsLoader(true)
        try {
            if (values) {
                const newUserOnCompany = { userId: userId, companyId: company.id }
                await client.localforage.useLocalForage.set({ key: UserOnCompanyKey, item: newUserOnCompany })
            } else {
                if (id) {
                    await client.localforage.useLocalForage.remove({ key: UserOnCompanyKey, id: id })
                }
            }
            setCheck(values)

        } catch (err: any) {
            setCheck(false)
        } finally {
            setIsLoader(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 ">
            {isLoader ? (<LoaderApp />) : (
                <div className="flex flex-row gap-5 justify-between items-center">
                    <div className="block text-md font-medium text-white">{company.name}</div>
                    <input
                        className="relative float-left h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-white checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-black checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-black checked:focus:after:bg-transparent "
                        type="checkbox"
                        checked={check}
                        onChange={(e) => {
                            handleChange(e.target.checked)
                        }}
                    />
                </div>
            )}
        </div>
    )
}