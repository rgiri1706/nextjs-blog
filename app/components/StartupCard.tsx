import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const StartupCard = ({post}: any ) => {
    const { _createdAt, _id, author: { _id: authorId, name, image: authorImage  }, description, image, title, category } = post
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">{formatDate(_createdAt)}</p>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${authorId}`}>
                        <p className="text-16-medium line-clamp-1">
                            {name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-2 mt-2">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${authorId}`}>
                    <Image src={authorImage} alt="User" width={48} height={48} className="rounded-full" />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">
                    {description}
                </p>
                <img src={image} alt={title} className="startup-card_img" />
            </Link>
            <div className="flex-between mt-5 gap-3">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">
                        {category}
                    </p>
                </Link>
                <button className="startup-card_btn">
                    <Link href={`/startup/${_id}`}>
                        Read More
                    </Link>
                </button>
            </div>
        </li>
    )
}

export default StartupCard;