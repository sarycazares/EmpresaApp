import TitlePageUserId from './_components/TitlePageUserId'


export default async function UserLayout({ children, params }: {
    children: React.ReactNode;
    params: { id: string }
}) {

    return (
        <TitlePageUserId id={Number(params.id)}>
            {children}
        </TitlePageUserId>
    )
}