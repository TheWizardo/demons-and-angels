import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://demonsandangels.co.il",
            lastModified: new Date("2026-03-10"),
        },
        {
            url: "https://demonsandangels.co.il/contact",
            lastModified: new Date("2026-02-25"),
        },
        {
            url: "https://demonsandangels.co.il/about",
            lastModified: new Date("2026-02-25"),
        },
        {
            url: "https://demonsandangels.co.il/store",
            lastModified: new Date("2026-02-25"),
        },
        // {
        //     url: "https://demonsandangels.co.il/login",
        //     lastModified: new Date("2026-02-25"),
        // },
    ]
}