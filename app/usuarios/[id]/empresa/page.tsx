import CompanyListCheck from './_component/CompanyListCheck'

export default function CompanyUser({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-sm mx-auto flex flex-col gap-6 ">
            <h1 className="text-lg font-semibold"> Elegir empresa</h1>
            <CompanyListCheck userId={Number(params.id)} />
        </div>
    )
}