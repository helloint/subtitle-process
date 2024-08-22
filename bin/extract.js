const fs = require('fs');
const os = require('os');
const xlsx = require('node-xlsx');
const config = require('./config.js');

const homedir = os.homedir();

let srtFilePath = homedir + config.workdir + config.srcSrt;
const srtContent = fs.readFileSync(srtFilePath, 'utf8').split('\n');

const translation = [];
srtContent.forEach((text, i) => {
	i % 4 === 2 && translation.push([processTranslation(processContent(text))], ['']);
});

var excelBuffer = xlsx.build([{name: 'translation', data: translation}]);
fs.writeFileSync(homedir + config.workdir + config.translation, excelBuffer, 'utf8');
console.log(`translation.xlsx generated. total ${translation.length} lines.`);

function processContent(content) {
	let ret = content;
	const regex = /<[^<>]+>/g;
	ret = ret.replace(regex ,"");

	Object.entries(config.replacement).forEach(([a, b]) => {
		const regex = new RegExp(a, 'g');
		ret = ret.replace(regex, b);
	});

	return ret;
}

function processTranslation(content) {
	let ret = content;
	config.reserved.forEach(key => {
		const regex = new RegExp(key, 'g');
		ret = ret.replace(regex ,`<span translate="no">${key}</span>`);
	});

	return ret;
}
