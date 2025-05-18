import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar = async () => {
    const session = await auth();
    return (
        <header className="px-4 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={144} height={30} />
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut({redirectTo: '/'}); 
                            }}>
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                               <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image as string} alt="avatar"/>
                                    <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                               </Avatar>
                            </Link>
                        </>
                    ) : (
                        <button onClick={async () => {
                            "use server";
                            await signIn('github')
                        }}>Login</button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;