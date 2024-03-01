import TableHeader from './TableHeader'
import TableItem from './TableItems'

export type TableItem = {
    item: any[]
}

export type TableAppProps = {
    tableHeaders: string[]
    children: any
}


export default function TableApp(props: TableAppProps) {
    const { tableHeaders, children } = props
    return (
        <div className="flex w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        {tableHeaders && tableHeaders.map((item, index) => (
                            <TableHeader title={item} key={index} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}