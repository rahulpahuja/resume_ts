(function () {

    const BLOG_PREFIX = "/blog/"

    /* -----------------------------
       Create Cyberpunk Blog Viewer
    ----------------------------- */

    function createViewer() {

        let viewer = document.getElementById("cyberpunk-blog")
        if (viewer) return viewer

        viewer = document.createElement("div")
        viewer.id = "cyberpunk-blog"

        viewer.className =
            "fixed inset-0 z-[9999] grid-bg bg-black/95 overflow-y-auto p-8 hidden"

        viewer.innerHTML = `
<style>

/* ---------- Code Styling ---------- */

#cyberpunk-blog code{
    background:#000;
    color:#00ff9c;
    padding:4px 6px;
    border-radius:4px;
    font-family:"JetBrains Mono",monospace;
}

#cyberpunk-blog pre{
    background:#020202;
    border:1px solid rgba(0,255,150,0.2);
    padding:20px;
    overflow:auto;
    border-radius:8px;
    box-shadow:0 0 20px rgba(0,255,150,0.08);
    position:relative;
}

/* Matrix Scanline */

#cyberpunk-blog pre::after{
content:"";
position:absolute;
left:0;
width:100%;
height:2px;
background:#00ff9c;
box-shadow:0 0 10px #00ff9c;
animation:matrixScan 4s linear infinite;
}

@keyframes matrixScan{
0%{top:0}
100%{top:100%}
}

/* Hologram Flicker */

#cyberpunk-blog.flicker{
animation:holoFlicker .4s linear;
}

@keyframes holoFlicker{
0%{opacity:.3}
40%{opacity:1}
50%{opacity:.6}
70%{opacity:1}
100%{opacity:1}
}

/* Knowledge base feel */

#blog-content h1,
#blog-content h2,
#blog-content h3{
border-left:3px solid #9333ea;
padding-left:10px;
}

</style>

<div class="max-w-4xl mx-auto">

<header class="glass border border-purple-500/40 p-6 mb-8 flex justify-between">

<div>

<p class="text-purple-400 font-mono text-[10px] tracking-widest uppercase">
Transmission Log
</p>

<h1 id="blog-title"
class="text-3xl font-black tracking-tight text-white"></h1>

</div>

<button id="blog-close"
class="px-4 py-2 border border-purple-500/40 text-purple-300
font-mono text-xs uppercase tracking-widest hover:bg-purple-500/20">

Exit

</button>

</header>

<section class="glass border border-purple-500/20 p-10">

<article id="blog-content"
class="prose prose-invert max-w-none
prose-headings:text-purple-300
prose-a:text-cyan-400
prose-strong:text-white font-light">
</article>

</section>

</div>
`

        document.body.appendChild(viewer)

        document.getElementById("blog-close").onclick = () => {

            viewer.classList.add("hidden")
            history.pushState({}, "", "/")

        }

        return viewer
    }


    /* -----------------------------
       Terminal Heading Animation
    ----------------------------- */

    function typeWriter(el) {

        const text = el.innerText
        el.innerText = ""

        let i = 0

        function type() {

            if (i < text.length) {

                el.innerText += text.charAt(i)
                i++

                setTimeout(type, 18)

            }

        }

        type()
    }


    function animateHeadings() {

        document
            .querySelectorAll("#blog-content h1,#blog-content h2,#blog-content h3")
            .forEach(typeWriter)

    }


    /* -----------------------------
       Load Blog (Lazy)
    ----------------------------- */

    async function loadBlog(slug) {

        const viewer = createViewer()
        viewer.classList.remove("hidden")
        viewer.classList.add("flicker")

        const url =
            `https://raw.githubusercontent.com/rahulpahuja/resume_ts/main/blogs/${slug}.md`

        const res = await fetch(url)
        const markdown = await res.text()

        const clean = markdown
            .replace(/title:.*\n/, "")
            .replace(/tag:.*\n/, "")
            .replace(/description:.*\n/, "")

        const html = marked.parse(clean)

        const title =
            markdown.match(/title:\s*(.*)/)?.[1] || slug

        document.getElementById("blog-title").innerText = title
        document.getElementById("blog-content").innerHTML = html

        setTimeout(animateHeadings, 300)

        window.scrollTo(0, 0)
    }


    /* -----------------------------
       Click Interceptor
    ----------------------------- */

    function interceptClicks() {

        document.addEventListener("click", (e) => {

            const link = e.target.closest("a")
            if (!link) return

            if (!link.href.includes("/blogs/")) return

            e.preventDefault()

            const slug =
                link.href.split("/").pop().replace(".md", "")

            history.pushState({}, "", BLOG_PREFIX + slug)

            loadBlog(slug)

        })
    }


    /* -----------------------------
       Handle Direct SEO URLs
    ----------------------------- */

    function handleRoute() {

        const path = window.location.pathname

        if (!path.startsWith(BLOG_PREFIX)) return

        const slug = path.replace(BLOG_PREFIX, "")

        if (slug) loadBlog(slug)

    }


    /* -----------------------------
       Init
    ----------------------------- */

    window.addEventListener("DOMContentLoaded", () => {

        interceptClicks()
        handleRoute()

    })

    window.addEventListener("popstate", handleRoute)

})()