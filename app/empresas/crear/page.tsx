import CreateFormCompany from './_components/CreateForm'

export default function CreateCompany() {
    return (
        <div className="max-w-sm mx-auto flex flex-col gap-6 ">
            <h1 className="text-lg font-semibold"> Crear empresas</h1>
            <CreateFormCompany />
        </div>
    )
}