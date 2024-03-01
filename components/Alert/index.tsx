interface AlertAppProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    msg?: string
}

export function AlertApp(props: AlertAppProps) {
    const { msg } = props

    return <div className="p-4 mb-4 text-sm rounded-lg bg-blue-50bg-gray-800 text-blue-400 border-blue-400 border" role="alert">
        <span className="font-medium">{msg}</span>
    </div>
}