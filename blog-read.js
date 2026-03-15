(function () {

    const OWNER = "rahulpahuja"
    const REPO = "resume_ts"
    const BLOG_DIR = "blogs"
    const BLOG_PREFIX = "/blog/"

    let blogIndex = []

    /* -------------------------
       Create Viewer
    ------------------------- */

    function createViewer() {

        let viewer = document.getElementById("cyberpunk-blog")

        if (viewer) return viewer

        viewer = document.createElement("div")

        viewer.id = "cyberpunk-blog"

        viewer.className = "fixed inset-0 z-[9999] hidden bg-black/95 overflow-y-auto"

        viewer.innerHTML = `

<style>

/* grid */

.grid-bg{
background-image:radial-gradient(circle at 1px 1px,rgba(0,242,255,.06) 1px,transparent 1px);
background-size:40px 40px;
}

/* neural bg */

#neural-bg{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
z-index:-1;
}

/* progress */

#reading-progress{
position:fixed;
top:0;
left:0;
height:3px;
width:0%;
background:#00f2ff;
box-shadow:0 0 12px #00f2ff;
z-index:10000;
}

/* code */

#cyberpunk-blog code{
background:#000;
color:#00ff9c;
padding:4px 6px;
border-radius:4px;
font-family:"JetBrains Mono",monospace;
}

#cyberpunk-blog pre{
background:#020202;
border:1px solid rgba(0,255,150,.2);
padding:20px;
border-radius:8px;
overflow:auto;
}

/* headings */

#blog-content h1,#blog-content h2,#blog-content h3{
border-left:3px solid #9333ea;
padding-left:10px;
}

</style>

<div id="reading-progress"></div>

<canvas id="neural-bg"></canvas>

<div class="grid-bg p-10 max-w-4xl mx-auto">

<header class="glass border border-purple-500/40 p-6 mb-8 flex justify-between">

<div>

<p class="text-purple-400 font-mono text-[10px] uppercase tracking-widest">
Transmission Log
</p>

<h1 id="blog-title" class="text-3xl font-black text-white"></h1>

</div>

<button id="blog-close"
class="border border-purple-500/40 px-4 py-2 text-purple-300 font-mono text-xs uppercase">
Exit
</button>

</header>

<div id="ai-summary"></div>

<div id="voice-controls"></div>

<article id="blog-content"
class="prose prose-invert max-w-none"></article>

</div>
`

        document.body.appendChild(viewer)

        document.getElementById("blog-close").onclick = () => {
            viewer.classList.add("hidden")
            history.pushState({}, "", "/")
        }

        return viewer

    }

    /* -------------------------
       Neural Background
    ------------------------- */

    function neuralBackground() {

        const canvas = document.getElementById("neural-bg")
        const ctx = canvas.getContext("2d")

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const nodes = [...Array(70)].map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - .5) * .4,
            vy: (Math.random() - .5) * .4
        }))

        function draw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            nodes.forEach(n => {

                n.x += n.vx
                n.y += n.vy

                if (n.x < 0 || n.x > canvas.width) n.vx *= -1
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1

                ctx.fillStyle = "#00f2ff"
                ctx.fillRect(n.x, n.y, 2, 2)

                nodes.forEach(m => {

                    const dx = n.x - m.x
                    const dy = n.y - m.y
                    const d = Math.sqrt(dx * dx + dy * dy)

                    if (d < 120) {

                        ctx.strokeStyle = "rgba(0,242,255,.1)"
                        ctx.beginPath()
                        ctx.moveTo(n.x, n.y)
                        ctx.lineTo(m.x, m.y)
                        ctx.stroke()

                    }

                })

            })

            requestAnimationFrame(draw)

        }

        draw()

    }

    /* -------------------------
       Progress HUD
    ------------------------- */

    function progressHUD() {

        const bar = document.getElementById("reading-progress")

        window.addEventListener("scroll", () => {

            const h = document.documentElement

            const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight)

            bar.style.width = scrolled * 100 + "%"

        })

    }

    /* -------------------------
       Heading animation
    ------------------------- */

    function typeWriter(el) {

        const text = el.innerText
        el.innerText = ""

        let i = 0

        function type() {

            if (i < text.length) {

                el.innerText += text.charAt(i)
                i++

                setTimeout(type, 15)

            }

        }

        type()

    }

    function animateHeadings() {

        document.querySelectorAll("#blog-content h1,#blog-content h2")
            .forEach(typeWriter)

    }

    /* -------------------------
       Summary Generator
    ------------------------- */

    function generateSummary(text) {

        const sentences = text.split(". ")

        const summary = sentences.slice(0, 3).join(". ") + "."

        return summary

    }

    function renderSummary(summary) {

        const box = document.getElementById("ai-summary")

        box.innerHTML = `

<div class="glass border border-yellow-500/30 p-6 mb-6">

<p class="text-yellow-400 font-mono text-xs uppercase mb-2">
AI Summary
</p>

<p class="text-gray-300 text-sm leading-relaxed">
${summary}
</p>

</div>
`

    }

    /* -------------------------
       Voice narration
    ------------------------- */

    function renderVoice(text) {

        const el = document.getElementById("voice-controls")

        el.innerHTML = `

<div class="glass border border-cyan-500/30 p-4 mb-6 flex gap-4">

<span class="text-cyan-400 font-mono text-xs uppercase">
AI Narration
</span>

<button id="voice-play"
class="px-3 py-1 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
Play
</button>

<button id="voice-stop"
class="px-3 py-1 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
Stop
</button>

</div>
`

        let speech

        document.getElementById("voice-play").onclick = () => {

            speech = new SpeechSynthesisUtterance(text)

            speech.rate = .95
            speech.pitch = 1.1

            speechSynthesis.speak(speech)

        }

        document.getElementById("voice-stop").onclick = () => {
            speechSynthesis.cancel()
        }

    }

    /* -------------------------
       Syntax highlight
    ------------------------- */

    async function highlight() {

        const { getHighlighter } = await import("https://unpkg.com/shiki@1.0.0/dist/index.mjs")

        const highlighter = await getHighlighter({ theme: "nord" })

        document.querySelectorAll("pre code").forEach(block => {

            const html = highlighter.codeToHtml(block.innerText, { lang: "javascript" })

            block.parentElement.outerHTML = html

        })

    }

    /* -------------------------
       Load Blog
    ------------------------- */

    async function openBlog(slug) {

        const viewer = createViewer()

        viewer.classList.remove("hidden")

        const url =
            `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${BLOG_DIR}/${slug}.md`

        const res = await fetch(url)

        const md = await res.text()

        const clean = md
            .replace(/title:.*\n/, "")
            .replace(/tag:.*\n/, "")
            .replace(/description:.*\n/, "")

        const html = marked.parse(clean)

        document.getElementById("blog-title").innerText =
            md.match(/title:\s*(.*)/)?.[1] || slug

        document.getElementById("blog-content").innerHTML = html

        const text = document.getElementById("blog-content").innerText

        renderSummary(generateSummary(text))

        renderVoice(text)

        highlight()

        animateHeadings()

        neuralBackground()

        progressHUD()

        window.scrollTo(0, 0)

    }

    /* -------------------------
       Click interceptor
    ------------------------- */

    function interceptClicks() {

        document.addEventListener("click", e => {

            const link = e.target.closest("a")

            if (!link) return

            if (!link.href.includes("/blogs/")) return

            e.preventDefault()

            const slug = link.href.split("/").pop().replace(".md", "")

            history.pushState({}, "", BLOG_PREFIX + slug)

            openBlog(slug)

        })

    }

    /* -------------------------
       Routing
    ------------------------- */

    function handleRoute() {

        const path = location.pathname

        if (!path.startsWith(BLOG_PREFIX)) return

        const slug = path.replace(BLOG_PREFIX, "")

        openBlog(slug)

    }

    /* -------------------------
       RSS Generator
    ------------------------- */

    function generateRSS() {

        if (!blogIndex.length) return

        const items = blogIndex.map(b => `

<item>
<title>${b.title}</title>
<link>/blog/${b.slug}</link>
</item>

`).join("")

        const rss = `
<rss version="2.0">
<channel>
<title>Rahul Pahuja Blog</title>
${items}
</channel>
</rss>
`

        console.log("RSS feed generated")

    }

    /* -------------------------
       Init
    ------------------------- */

    window.addEventListener("DOMContentLoaded", () => {

        interceptClicks()

        handleRoute()

    })

    window.addEventListener("popstate", handleRoute)

})()