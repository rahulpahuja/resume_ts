(function () {

    const OWNER = "rahulpahuja"
    const REPO = "resume_ts"

    async function loadBlogs() {

        try {

            const res = await fetch(
                `https://api.github.com/repos/${OWNER}/${REPO}/contents/blogs`
            )

            const files = await res.json()

            const blogs = await Promise.all(

                files
                    .filter(f => f.name.endsWith(".md"))
                    .map(async file => {

                        const raw = await fetch(file.download_url)
                        const text = await raw.text()

                        const title = text.match(/title:\s*(.*)/)?.[1] || file.name
                        const tag = text.match(/tag:\s*(.*)/)?.[1] || "blog"
                        const desc = text.match(/description:\s*(.*)/)?.[1] || ""
                        const slug = file.name.replace(".md", "")

                        return {
                            title,
                            tag,
                            desc,
                            link: `/blog/${slug}`
                        }

                    })

            )

            return blogs.sort((a, b) => b.title.localeCompare(a.title))

        } catch (e) {

            console.warn("Blog loading failed:", e)

            return []

        }

    }

    async function injectBlogs() {

        const blogs = await loadBlogs()

        window.BLOGS = blogs

        window.dispatchEvent(
            new CustomEvent("blogsLoaded", { detail: blogs })
        )

    }

    window.addEventListener("DOMContentLoaded", injectBlogs)

})()
