import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries";
import StartupCard from "./StartupCard";
import { Post } from "../types";

const UserStartups = async ({id}: {id: string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR, {id});
    return (
       <>
        {startups.length > 0 ? (
            startups.map((startup: Post) => (
                <StartupCard key={startup._id} post={startup} />
            ))
        ): (
            <p className="no-result">No results found</p>
        )}
       </>
    )
}

export default UserStartups;