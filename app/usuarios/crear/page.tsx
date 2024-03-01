import CreateUserForm from './_components/CreateUserForm'

export default function CreateUsers({ params }: { params: { slug: string } }) {
    return (
        <div className="max-w-sm mx-auto flex flex-col gap-6 ">
            <h1 className="text-lg font-semibold"> Crear usuario</h1>
            <CreateUserForm slug={params.slug} />
        </div>
    )
}