import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { Post } from "../types";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query;
  const params = {search: query || null};

  const {data: posts} =  await sanityFetch({query: STARTUPS_QUERY, params});

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
           Submit Your Ideas, Vote on Pitches and get noticed
        </p>
        <SearchForm query={query}/>
    </section>
    <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "Trending Pitches"}
        </p>
        <ul className="mt-7 card_grid">
            {posts.length > 0 ? posts.map((post: Post) => (
               <StartupCard key={post._id} post={post} />
            )) : (
                <p className="no-result">No results found</p>
            )}
        </ul>
    </section>
    <SanityLive />
    </>
    
  );
}
