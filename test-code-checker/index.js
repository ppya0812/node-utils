module.exports = function (content, map, meta) {
    const strArr = content.split('\n')
    const testCodeArr = []
    let testZone = false
    let counter = 0
    let scriptIndex = 0
    strArr.map((line, index) => {
        if (/<script>/.test(line)) {
            scriptIndex = index
        }
        if (/^\s*\/\/ test\s*/.test(line)) {
            testZone = true
            testCodeArr.push({
                line,
                index
            })
            return
        }
        if (testZone) {
            counter++
            if (counter === 11) {
                counter = 0
                testZone = false
                return
            }
            testCodeArr.push({
                line,
                index
            })
        }
    })
if (testCodeArr.length) {
    let warning = '发现测试代码标识!!!是不是有不该上传的代码?这里展示标识下面的10行代码:\n'
    testCodeArr.map(item => {
        warning += `line ${item.index + 1}\t\t ${item.line} \n`
    })
    let consoleWarn = `console.warn(${JSON.stringify(warning).replace(new RegExp('/', 'g'), '\\/')});`
    if (!scriptIndex) {
        strArr.push(consoleWarn)
    } else {
        strArr[scriptIndex] = `<script>${consoleWarn}`
    }
    content = strArr.join('\n')
}
    
    this.async()(null, content, map, meta)
}
