import re

with open("index.html", "r") as f:
    content = f.read()

# Remove motion script
content = re.sub(r'<script src="https://unpkg\.com/framer-motion[^>]+></script>', '', content)

# Remove motion variable
content = re.sub(r'const { motion } = [^;]+;', '', content)
content = re.sub(r'const motion = [^;]+;', '', content)

# Remove variants definitions
content = re.sub(r'const sectionVariants = {[^}]+};\n\n', '', content, flags=re.DOTALL)
content = re.sub(r'const itemVariants = {[^}]+};\n\n', '', content, flags=re.DOTALL)

# Revert motion tags
content = re.sub(r'<motion\.([a-zA-Z0-9]+)\b', r'<\1', content)
content = re.sub(r'</motion\.([a-zA-Z0-9]+)>', r'</\1>', content)

# Remove variants and other framer-motion props
content = re.sub(r'\s*variants=\{[^}]+\}', '', content)
content = re.sub(r'\s*initial="[^"]+"', '', content)
content = re.sub(r'\s*whileInView="[^"]+"', '', content)
content = re.sub(r'\s*viewport=\{[^}]+\}', '', content)

# Now, add smooth scrolling using tailwind and IntersectionObserver
# Specifically, we want to animate `.section-animate` elements
content = content.replace('className="section ', 'className="section section-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out ')

# Update the observer
old_observer = """                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) setActive(entry.target.id);
                    });
                }, { threshold: 0.4 });"""

new_observer = """                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActive(entry.target.id);
                            entry.target.classList.remove('opacity-0', 'translate-y-10');
                            entry.target.classList.add('opacity-100', 'translate-y-0');
                        }
                    });
                }, { threshold: 0.3 });"""

content = content.replace(old_observer, new_observer)

with open("index.html", "w") as f:
    f.write(content)

print("Fixed")
