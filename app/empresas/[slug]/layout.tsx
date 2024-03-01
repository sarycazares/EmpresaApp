import TitlePageSlug from './_components/TitlePage'

export default async function SlugLayout({ children, params }: {
    children: React.ReactNode;
    params: { slug: string }
}) {

    return (
        <div className='flex flex-col gap-4 h-full overflow-y-auto'>
            <TitlePageSlug slug={params.slug} />
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}