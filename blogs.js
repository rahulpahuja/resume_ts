(function () {

    const OWNER = "rahulpahuja"
    const REPO = "resume_ts"
    const BLOG_DIR = "blogs"

    async function getFileDate(path) {

        try {

            const res = await fetch(
                `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${path}&page=1&per_page=1`
            )

            const data = await res.json()

            if (!data || !data.length) return null

            return data[0].commit.author.date

        } catch (e) {

            return null

        }

    }

    function formatDate(date) {

        if (!date) return "Unknown"

        const d = new Date(date)

        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })

    }

    async function loadBlogs() {

        try {

            const res = await fetch(
                `https://api.github.com/repos/${OWNER}/${REPO}/contents/${BLOG_DIR}`
            )

            const files = await res.json()

            const blogs = await Promise.all(

                files
                    .filter(f => f.name.endsWith(".md"))
                    .map(async file => {

                        const raw = await fetch(file.download_url)
                        const text = await raw.text()

                        const title =
                            text.match(/title:\s*(.*)/)?.[1]?.trim() || file.name

                        const tag =
                            text.match(/tag:\s*(.*)/)?.[1]?.trim() || "blog"

                        const desc =
                            text.match(/description:\s*(.*)/)?.[1]?.trim() || ""

                        const dateRaw = await getFileDate(file.path)

                        const date = formatDate(dateRaw)

                        const filename = file.name

                        const slug = file.name.replace(".md", "")

                        return {
                            title,
                            tag,
                            desc,
                            filename,
                            date,
                            dateRaw,
                            link: `/blog/${slug}`,
                            raw: file.download_url
                        }

                    })

            )

            blogs.sort((a, b) => new Date(b.dateRaw) - new Date(a.dateRaw))

            return blogs

        } catch (e) {

            console.warn("Blog loading failed")

            return []

        }

    }

    async function injectBlogs() {

        const blogs = await loadBlogs()

        if (!blogs.length) return

        window.BLOGS = blogs

        window.dispatchEvent(
            new CustomEvent("blogsLoaded", { detail: blogs })
        )

        console.table(
            blogs.map(b => ({
                Title: b.title,
                Tag: b.tag,
                File: b.filename,
                Date: b.date,
                Link: b.link
            }))
        )

    }

    window.addEventListener("DOMContentLoaded", injectBlogs)

})()