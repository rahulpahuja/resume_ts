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

        viewer.className = "fixed inset-0 z-[9999] hidden"
        viewer.style.cssText = "background:rgba(0,0,0,0.95);overflow:hidden;"

        viewer.innerHTML = `

<style>

#cyberpunk-blog .grid-bg{
background-image:radial-gradient(circle at 1px 1px,rgba(0,242,255,.06) 1px,transparent 1px);
background-size:40px 40px;
}

#matrix-bg{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
z-index:1;
opacity:.25;
pointer-events:none;
}

#neural-bg{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
z-index:2;
pointer-events:none;
}

#reading-progress{
position:absolute;
top:0;
left:0;
height:3px;
width:0%;
background:#00f2ff;
box-shadow:0 0 12px #00f2ff;
z-index:10;
}

#blog-scroll{
position:relative;
z-index:3;
height:100%;
overflow-y:auto;
}

/* readability fix */

#blog-content{
line-height:1.7;
word-spacing:.05em;
letter-spacing:.01em;
}

#blog-content code{
background:#000;
color:#00ff9c;
padding:4px 6px;
border-radius:4px;
font-family:"JetBrains Mono",monospace;
}

#blog-content pre{
background:#020202;
border:1px solid rgba(0,255,150,.2);
padding:20px;
border-radius:8px;
overflow:auto;
white-space:pre-wrap;
word-break:break-word;
}

/* section highlight */

#blog-content section.active{
border-left:3px solid #00f2ff;
padding-left:12px;
}

</style>

<canvas id="matrix-bg"></canvas>
<canvas id="neural-bg"></canvas>
<div id="reading-progress"></div>

<div id="blog-scroll">
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
       Matrix Rain (NEW)
    ------------------------- */

    function matrixRain() {

        const canvas = document.getElementById("matrix-bg")
        const ctx = canvas.getContext("2d")

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const letters = "यंत्र • रक्षा • बुद्धि • शक्ति • डेटा • नेटवर्क • सुरक्षा • कोड • हैक • सिस्टम • कृत्रिम • तंत्रिका".split(" ")
        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops = [...Array(columns)].fill(1)

        function draw() {

            ctx.fillStyle = "rgba(0,0,0,0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = "#00ff9c"
            ctx.font = fontSize + "px monospace"

            drops.forEach((y, i) => {

                const text = letters[Math.floor(Math.random() * letters.length)]
                ctx.fillText(text, i * fontSize, y * fontSize)

                if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0

                drops[i]++

            })

        }

        setInterval(draw, 33)

    }

    /* -------------------------
       Neural Background
    ------------------------- */

    function neuralBackground() {

        const canvas = document.getElementById("neural-bg")
        const ctx = canvas.getContext("2d")

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const nodes = [...Array(60)].map(() => ({
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
        const scrollEl = document.getElementById("blog-scroll")

        scrollEl.addEventListener("scroll", () => {

            const scrolled = scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight)

            bar.style.width = scrolled * 100 + "%"

        })

    }

    /* -------------------------
       Typing Paragraphs (NEW)
    ------------------------- */

    function typeParagraphs() {

        document.querySelectorAll("#blog-content p").forEach(p => {

            const text = p.innerText
            p.innerText = ""

            let i = 0

            function type() {

                if (i < text.length) {

                    p.innerText += text.charAt(i)
                    i++

                    setTimeout(type, 8)

                }

            }

            type()

        })

    }

    /* -------------------------
       Scroll Highlights (NEW)
    ------------------------- */

    function activateSections() {

        const sections = document.querySelectorAll("#blog-content h2")

        const observer = new IntersectionObserver(entries => {

            entries.forEach(e => {

                if (e.isIntersecting) {

                    sections.forEach(s => s.classList.remove("active"))
                    e.target.classList.add("active")

                }

            })

        }, { threshold: .4 })

        sections.forEach(s => observer.observe(s))

    }

    /* -------------------------
       Summary Generator
    ------------------------- */

    function generateSummary(text) {

        const sentences = text.split(". ")
        return sentences.slice(0, 3).join(". ") + "."

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

        try {

            const { getHighlighter } = await import("https://esm.sh/shiki@0.14.7")

            const highlighter = await getHighlighter({ theme: "nord", langs: ["javascript", "typescript", "bash", "python"] })

            document.querySelectorAll("pre code").forEach(block => {

                const lang = block.className.replace("language-", "") || "javascript"
                const html = highlighter.codeToHtml(block.innerText, { lang: highlighter.getLoadedLanguages().includes(lang) ? lang : "javascript" })
                block.parentElement.outerHTML = html

            })

        } catch (e) {

            console.warn("Syntax highlight unavailable:", e)

        }

    }

    /* -------------------------
       Load Blog
    ------------------------- */

    async function openBlog(slug) {

        const viewer = createViewer()

        viewer.classList.remove("hidden")

        const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${BLOG_DIR}/${slug}.md`

        try {
            const res = await fetch(url)
            
            if (!res.ok) {
                console.error(`Blog not found: ${slug}`)
                return
            }

            const md = await res.text()

            const clean = md
                .replace(/title:.*\n/, "")
                .replace(/tag:.*\n/, "")
                .replace(/description:.*\n/, "")

            const html = marked.parse(clean, { gfm: true, breaks: true })

            document.getElementById("blog-title").innerText =
                md.match(/title:\s*(.*)/)?.[1] || slug

            document.getElementById("blog-content").innerHTML = html

            /* FIX spacing bug */

            const text = clean
                .replace(/[#>*`]/g, "")
                .replace(/\n+/g, " ")
                .replace(/\s+/g, " ")
                .trim()

            renderSummary(generateSummary(text))

            renderVoice(text)

            highlight()

            matrixRain()
            neuralBackground()

            progressHUD()

            typeParagraphs()
            activateSections()

            document.getElementById("blog-scroll").scrollTo(0, 0)

        } catch (e) {
            console.error(`Error loading blog ${slug}:`, e)
            viewer.classList.add("hidden")
        }

    }

    /* -------------------------
       Click interceptor
    ------------------------- */

    function interceptClicks() {

        document.addEventListener("click", e => {

            const link = e.target.closest("a")

            if (!link) return
            
            const href = link.href || ""
            
            // Check if link is a blog link (/blog/slug format)
            if (!href.includes("/blog/")) return

            e.preventDefault()

            const slug = href.split("/blog/").pop()

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

        const slug = path.replace(BLOG_PREFIX, "").split("?")[0] // Remove query params

        if (slug) {
            openBlog(slug)
        }

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
