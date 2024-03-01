'use client'
import { AlertApp } from '@/components/Alert'
import InputText from '@/components/Input/inputText'
import InputTextTarea from '@/components/Input/inputTextTarea'
import { CompanyKey } from '@/utils/models/company'
import client from '@/services/client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function CreateFormCompany() {

    const [isLoader, setIsLoader] = useState(false)
    const [msg, setMsg] = useState('')

    const nameRef = useRef<any>(null)
    const slugRef = useRef<any>(null)
    const descriptionRef = useRef<any>(null)
    const router = useRouter()

    const handleSubmit = async () => {
        setIsLoader(true)
        setMsg('')

        const name = nameRef.current
        const slug = slugRef.current
        const description = descriptionRef.current

        const newCompany = { name: name.getValue(), slug: slug.getValue(), description: description.getValue() }

        try {
            await client.localforage.useLocalForage.set({ key: CompanyKey, item: newCompany })
            router.push('/empresas')
        } catch (err: any) {
            setMsg('Hubo un error :c')
        } finally {
            setIsLoader(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 ">
            {msg && (
                <AlertApp msg={msg} />
            )}
            <InputText
                ref={nameRef}
                title='Nombre'
            />
            <InputText
                ref={slugRef}
                title='Slug'
            />
            <InputTextTarea
                ref={descriptionRef}
                title='Descripción'
            />
            <button type='button'
                onClick={handleSubmit}
                disabled={isLoader}
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
                Crear
            </button>
        </div>
    )
}
