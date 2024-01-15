const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')
const process = require('process')

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

<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <%- include(\`\${env.VITE_ROOT_PATH}/partial/icons.partial.html\`) %>

        <link rel="stylesheet" href="../App.css" type="text/css">
        <link rel="stylesheet" href="../index.css" type="text/css">
    
        <title>Credits - Unit Converter</title>
    </head>

<body>
  <div class="root-container" >
    
    <%- include(\`\${env.VITE_ROOT_PATH}/partial/navbar.partial.html\`) %>
    <%- include(\`\${env.VITE_ROOT_PATH}/partial/noscript.partial.html\`) %>
    <div id="root"></div>

    <p>The following dependencies have been used to build this application. Their licenses are included below
    for your reference. (Development dependencies have not been included in this list.)</p>

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
    else if (dep === `${os.homedir()}/unit-converter/node_modules/undici-types`) {
        htmlFileStream.write(`MIT License

Copyright (c) Matteo Collina and Undici contributors

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
        process.exit(1)
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
<script type="module" src="../bootstrap_imports.tsx"></script>
</body>
</html>
`)
htmlFileStream.close()