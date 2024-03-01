
export default function TableHeader({ title }: { title: string }) {
    return (
        <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
            {title}
        </th>
    )
}
