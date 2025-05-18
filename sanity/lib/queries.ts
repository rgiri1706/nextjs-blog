import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || discription match $search || author->name match $search] {
    _id,
    title,
    slug,
    _createdAt,
    author -> { _id, name, image, bio } ,
    views, 
    discription,
    category, 
    image
}`)

export const SEARCH_QUERY = defineQuery(`*[_type == "startup" && _id == $id ][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> { _id, name, image, bio } ,
    views, 
    discription,
    category, 
    image,
    pitch
}`)

export const AUTHOR_BY_GITHUB_QUERY = defineQuery(`*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)

export const STARTUPS_BY_AUTHOR = defineQuery(`*[_type == "startup" && author._ref == $id] {
    _id,
    title,
    slug,
    _createdAt,
    author -> { _id, name, image, bio } ,
    views, 
    discription,
    category, 
    image
}`)