'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface InputTextProps {
    value?: string
    title: string
}

const InputText = forwardRef(function InputText(props: InputTextProps, ref) {
    const { title, value = '' } = props
    const [text, setText] = useState(value)

    const handleChange = (text: string) => {
        setText(text)
    }

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return text
            },
        }
    }, [text])

    return (
        <div className="">
            <div className="block mb-2 text-sm font-medium text-white">{title}</div>
            <input
                value={text}
                onChange={(e) => handleChange(e.currentTarget.value)}
                type="text"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
            />
        </div>
    )
})

export default InputText