import CreateFormDepartaments from './_components/CreateForm'

export default function CreateDepartments() {
    return (
        <div className="max-w-sm mx-auto flex flex-col gap-6 ">
            <h1 className="text-lg font-semibold"> Crear departamentos</h1>
            <CreateFormDepartaments />
        </div>
    )
}