let yaml = require('js-yaml');
let fs   = require('fs');

try {
  let doc = yaml.load(
    fs.readFileSync('./bee.yml', 'utf8')
  );
  // console.log(doc);
  fs.writeFileSync(
    './dist/bee.yml',
    // yaml.dump(doc),
    doc,
    'utf8'
  );
} catch (e) {
  console.log(e);
}
