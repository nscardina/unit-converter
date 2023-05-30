const Json: (path: URL) => Promise<any> = 
(path: URL) => fetch(path)
        .catch(reason => { throw new Error(reason) })
        .then(value => value.text())
        .catch(reason => { throw new Error(reason) })
        .then(value => JSON.parse(value))

export default { Json }