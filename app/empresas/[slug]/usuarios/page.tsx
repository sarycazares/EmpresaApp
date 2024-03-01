import ListUsersCompany from './_components/ListUsersCompany'

export default function UsersCompany({ params }: { params: { slug: string } }) {
    return (
        <div className='w-full'>
            <ListUsersCompany slug={params.slug} />
        </div>
    )
}