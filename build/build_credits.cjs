const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')

/**
 * List of all dependencies as paths to their node_modules folders, separated by newline characters.
 */
const deps = execSync('npm ls --parseable=true --omit=dev --all', {pipe: 'inherit'}).toString()

/**
 * HTML file to write, located at the project folder /src/credits/index.html.
 */
const htmlFile = path.resolve(__dirname, '..', 'src', 'credits', 'index.html')
const htmlFileStream = fs.createWriteStream(htmlFile)

htmlFileStream.write(`
<!DOCTYPE html>
<html>

<% const pathToRoot = "../" %>
<% const pathToNodeModules = "../../" %>
<% const extraCSS = ["../index.css", "../App.css"] %>

<%- include("./partial/head.partial.html", {
  pathToRoot: pathToRoot, 
  pathToNodeModules: pathToNodeModules,
  extraCSS: extraCSS
}) %>

<body>
  <div class="root-container" >
    
    <%- include("./partial/navbar.partial.html") %>
    <%- include("./partial/noscript.partial.html") %>
    <div id="root"></div>

    <div class="accordion">
`)

let counter = 0
for (const dep of deps.split('\n')) {
	if (dep === '') {
		continue
	}

    htmlFileStream.write(`
    <div class="accordion-item">
    <h2 class="accordion-header">
    <button class="accordion-button collapsed font-monospace fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#id${counter}">
    ${dep.substring(dep.lastIndexOf('/') + 1)}
    </button>
    </h2>
    <div id="id${counter}" class="accordion-collapse collapse">
    <div class="accordion-body">
    <pre>`
    )

    if (fs.existsSync(path.resolve(dep, 'license')))
        htmlFileStream.write(`${fs.readFileSync(path.resolve(dep, 'license'))}`)
    else if (fs.existsSync(path.resolve(dep, 'LICENSE')))
        htmlFileStream.write(`${fs.readFileSync(path.resolve(dep, 'LICENSE'))}`)
    else if (fs.existsSync(path.resolve(dep, 'LICENSE.txt')))
        htmlFileStream.write(`${fs.readFileSync(path.resolve(dep, 'LICENSE.txt'))}`)
    else if (fs.existsSync(path.resolve(dep, 'LICENSE.md')))
        htmlFileStream.write(`${fs.readFileSync(path.resolve(dep, 'LICENSE.md'))}`)
    else if (dep === '/home/ns/unit-converter/node_modules/@types/warning') {
        htmlFileStream.write(`Copyright (c) Chi Vinh Le

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`)
    } else if (dep === '/home/ns/unit-converter/node_modules/@swc/helpers') {
        htmlFileStream.write(`Copyright (c) 강동윤

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`)
    } else {
        console.log(`License not found: ${dep}`)
    }

    htmlFileStream.write(`
    </pre>
    </div>
    </div>
    </div>`)

    counter++
}



htmlFileStream.write(`
</div>
</body>
</html>
`)
htmlFileStream.close()