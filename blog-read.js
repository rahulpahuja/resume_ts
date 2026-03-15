(function () {

    function createViewer() {

        let viewer = document.getElementById("cyberpunk-blog")

        if (viewer) return viewer

        viewer = document.createElement("div")
        viewer.id = "cyberpunk-blog"

        viewer.className = "fixed inset-0 z-[9999] grid-bg bg-black/95 overflow-y-auto p-8"

        viewer.innerHTML = `

<style>

#cyberpunk-blog code {
    background:#000;
    color:#00ff9c;
    padding:4px 6px;
    border-radius:4px;
    font-family:"JetBrains Mono", monospace;
}

#cyberpunk-blog pre {
    background:#020202;
    border:1px solid rgba(0,255,150,0.2);
    padding:20px;
    overflow:auto;
    border-radius:8px;
    box-shadow:0 0 20px rgba(0,255,150,0.08);
    position:relative;
}

/* Matrix scan line */

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

/* hologram flicker */

#cyberpunk-blog.flicker{
animation:holoFlicker 0.4s linear 1;
}

@keyframes holoFlicker{

0%{opacity:0.4}
40%{opacity:1}
50%{opacity:0.6}
70%{opacity:1}
100%{opacity:1}

}

</style>


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
font-light">
</article>

</div>

</div>
`

        document.body.appendChild(viewer)

        document.getElementById("blog-close").onclick = () => {

            viewer.style.display = "none"

            history.pushState("", document.title, window.location.pathname)

        }

        return viewer
    }



    function typeWriter(element) {

        const text = element.innerText

        element.innerText = ""

        let i = 0

        const speed = 20

        function type() {

            if (i < text.length) {

                element.innerText += text.charAt(i)

                i++

                setTimeout(type, speed)

            }

        }

        type()

    }



    function animateHeadings() {

        const headings = document.querySelectorAll("#blog-content h1,#blog-content h2,#blog-content h3")

        headings.forEach(h => typeWriter(h))

    }



    async function openBlog(url) {

        const viewer = createViewer()

        viewer.classList.add("flicker")

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

        setTimeout(() => {

            animateHeadings()

        }, 300)

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