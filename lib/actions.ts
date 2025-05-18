"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { PrevState } from "@/app/types";

export const createPitch = async (state: PrevState, form: FormData, pitch: string) => {
    const session = await auth();
    if(!session) {
        return parseServerActionResponse({...state, error: "You must be logged in to pitch", status: "ERROR"});
    }
    const {title, description, category, link} = Object.fromEntries( Array.from(form).filter(([key])=> key !== pitch));
    const slug = slugify(title as string, {lower: true, strict: true});
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug
            },
            pitch,
            author: {
                _type: "reference",
                _ref: session?.id
            }
        }
        const result = await writeClient.create({
            _type: 'startup',
            ...startup
        })
        return parseServerActionResponse({...state, data: result, status: "SUCCESS"})
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({...state, error: JSON.stringify(error), status: "ERROR"})
    }
};