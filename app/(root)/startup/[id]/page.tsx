import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { SEARCH_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import markdown from "markdown-it";

const md = markdown();


const Page = async ({params}: { params: Promise<{ id: string }>}) => {
    const id = (await params).id;
    const post = await client.fetch(SEARCH_QUERY, {id});
    if(!post) {
        return (
            <div>Startup not found</div>
        )
    }

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag m-3">
                    {formatDate(post?._createdAt)}
                </p>
                <h1 className="heading">
                    {post?.title}
                </h1>
                <p className="sub-heading !max-w-5xl">
                    {post?.discription}
                </p>
            </section>
             <section className="section_container">
                <img src={post?.image} alt="" className="w-full h-auto rounded-xl" />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post?.author?._id}`} className="flex items-center gap-2 mb-3">
                            <Image src={post?.author?.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />
                            <p className="text-16-medium">{post?.author?.name}</p>
                            <div >
                              <p className="text-20-medium"> {post?.author.name}</p>  
                            </div>
                        </Link>
                        <p className="category-tag">
                            {post?.category}
                        </p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{__html: parsedContent}} />
                    ): (
                        <p className="no-result">No results found</p>
                    )}
                </div>
                <hr className="divider" />
             </section>
        </>
    )
}

export default Page;