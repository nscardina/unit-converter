const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')

const deps = execSync('npm ls --parseable=true --omit=dev --all', {pipe: 'inherit'}).toString()

const htmlFile = path.resolve(__dirname, '..', 'src', 'credits', 'index.html')
const htmlFileStream = fs.createWriteStream(htmlFile)

htmlFileStream.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" type="text/css" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="../index.css" />
  <link rel="stylesheet" type="text/css" href="../App.css" />
  
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
  <link rel="shortcut icon" href="/icons/favicon.ico" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unit Converter</title>
</head>
<body>
<body>
  <div class="root-container" >
    <nav class="navbar d-flex flex-row">
      <div class="d-flex flex-row  container-fluid">
        <a class="navbar-text nav-link" href="/unit-converter/">
          <object data="/unit-converter/logo.svg" type="image/svg+xml" width="48pt" height="48pt"></object>
        </a>
        <a class="navbar-text nav-link fs-4 mx-2" href="/unit-converter/">
          Unit Converter
        </a>

        <a class="navbar-text nav-link ms-auto" href="/unit-converter/docs/">
          <i class="bi-question-circle"></i>
        </a>

        <div class="dropdown">
          <button class="btn dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown">
            <span class="navbar-toggler-icon"></span>

          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-item">
              <a href="/unit-converter/docs/" class="text-reset text-decoration-none">
			  	<i class="bi bi-file-earmark-text"></i>&nbsp;Documentation
			  </a>
            </li>
            <li class="dropdown-item">
              <a href="/unit-converter/credits/" class="text-reset text-decoration-none">
			  	<i class="bi bi-people-fill"></i>&nbsp;Credits
			  </a>
            </li>
          </ul>
        </div>


      </div>
    </nav>
    <noscript class="d-block container ms-auto me-auto">
      <h1 class="text-center">Javascript is not enabled.</h1>
      <p class="text-center">The Unit Converter needs JavaScript to work.</p>
    </noscript>
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

    // htmlFileStream.write(`<h2>${dep.substring(dep.lastIndexOf('/') + 1)}</h2>`)
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
<script src="../../node_modules/bootstrap/dist/js/bootstrap.bundle.js" type="module"></script>
</body>
</html>
`)
htmlFileStream.close()