import { paths } from '@/utils/paths'
import Link from 'next/link'

export default function Header() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex flex-row gap-6 justify-start items-center rtl:justify-end">
                        <Link href={paths.home} className="flex px-3 items-center text-xl font-semibold sm:text-2xl ">
                            Empresas App
                        </Link>
                        <div className="flex flex-row gap-4 items-center">
                            <Link href={paths.company.index} className="hover:bg-slate-500/50 p-2 rounded-md">
                                Empresas
                            </Link>
                            <Link href={paths.departament.index} className='hover:bg-slate-500/50 p-2 rounded-md'>
                                Departamentos
                            </Link>
                            <Link href={paths.user.index} className='hover:bg-slate-500/50 p-2 rounded-md'>
                                Usuarios
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}


