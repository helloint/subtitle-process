const fs = require('fs');
const contentData = JSON.parse(fs.readFileSync('draft_content.json', 'utf8'));
var texts = contentData.materials.texts;
var translation = "";
for (var i = 0; i < texts.length; i++) {
	translation += texts[i].content + '\r\n';
}
fs.writeFileSync('translation.txt', translation, 'utf8');