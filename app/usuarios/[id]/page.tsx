import UserData from './_components/UserData'

export default function User({ params }: { params: { id: string } }) {
    return (
        <div className='w-full'>
            <UserData id={Number(params.id)} />
        </div>
    )
}