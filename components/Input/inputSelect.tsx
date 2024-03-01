'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface OptionsInputSelect {
    value: any,
    label: string
}

interface InputSelectProps {
    value?: string
    title: string
    options: OptionsInputSelect[]
}

const InputSelect = forwardRef(function InputText(props: InputSelectProps, ref) {
    const { title, value = '', options } = props

    const optionsList = options.length != 0 ? options[0].value : ''
    const valueSelect = value.length != 0 ? value : optionsList
    const [select, setSelect] = useState(valueSelect)

    const handleChange = (text: string) => {
        console.log(text)
        setSelect(text)
    }

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return select
            },
        }
    }, [select])

    return (
        <div className="">
            <div className="block mb-2 text-sm font-medium text-white">{title}</div>
            <select
                value={select}
                onChange={(e) => handleChange(e.currentTarget.value)}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    )
})

export default InputSelect