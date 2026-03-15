(function () {

    function createViewer() {

        let viewer = document.getElementById("cyberpunk-blog")

        if (viewer) return viewer

        viewer = document.createElement("div")
        viewer.id = "cyberpunk-blog"

        viewer.className = "fixed inset-0 z-[9999] grid-bg bg-black/95 overflow-y-auto p-8"

        viewer.innerHTML = `
        <div class="max-w-4xl mx-auto">

            <div class="glass border border-purple-500/40 p-6 mb-8 flex items-center justify-between">

                <div>
                    <p class="text-purple-400 font-mono text-[10px] tracking-widest uppercase">
                        Transmission Log
                    </p>
                    <h1 id="blog-title"
                        class="text-3xl font-black tracking-tight text-white">
                    </h1>
                </div>

                <button id="blog-close"
                    class="px-4 py-2 border border-purple-500/40 text-purple-300
                    font-mono text-xs uppercase tracking-widest hover:bg-purple-500/20">
                    Exit
                </button>

            </div>

            <div class="glass border border-purple-500/20 p-10">

                <article id="blog-content"
                    class="prose prose-invert max-w-none
                    prose-headings:text-purple-300
                    prose-a:text-cyan-400
                    prose-strong:text-white
                    prose-code:text-pink-400
                    font-light">
                </article>

            </div>

        </div>
        `

        document.body.appendChild(viewer)

        document.getElementById("blog-close").onclick = () => {

            viewer.style.display = "none"

            history.pushState(
                "",
                document.title,
                window.location.pathname
            )

        }

        return viewer
    }


    async function openBlog(url) {

        const viewer = createViewer()

        const res = await fetch(url)

        const markdown = await res.text()

        const clean = markdown
            .replace(/title:.*\n/, "")
            .replace(/tag:.*\n/, "")
            .replace(/description:.*\n/, "")

        const html = marked.parse(clean)

        const title =
            markdown.match(/title:\s*(.*)/)?.[1] || "Transmission"

        document.getElementById("blog-title").innerText = title

        document.getElementById("blog-content").innerHTML = html

        viewer.style.display = "block"

        window.scrollTo(0, 0)
    }



    function interceptClicks() {

        document.addEventListener("click", function (e) {

            const link = e.target.closest("a")

            if (!link) return

            if (!link.href.includes("/blogs/")) return

            if (!link.href.endsWith(".md")) return

            e.preventDefault()

            openBlog(link.href)

        })

    }

    window.addEventListener("DOMContentLoaded", interceptClicks)

})()