const fs = require('fs');
const contentData = JSON.parse(fs.readFileSync('draft_content.json', 'utf8'));
const translations = fs.readFileSync('translated.txt', 'utf8').split('\r\n');
var texts = contentData.materials.texts;
for (var i = 0; i < texts.length; i++) {
	texts[i].content += '\n' + translations[i];
}
fs.writeFileSync('draft_content_merged.json', JSON.stringify(contentData), 'utf8');