'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface InputTextProps {
    value?: string
    title: string
    rows?: number
}


const InputTextTarea = forwardRef(function InputText(props: InputTextProps, ref) {
    const { title, value = '', rows = 4 } = props
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
            <textarea
                value={text}
                id="message"
                rows={rows}
                onChange={(e) => handleChange(e.currentTarget.value)}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    )
})

export default InputTextTarea