const fs = require('fs');
const os = require('os');
const xlsx = require('node-xlsx');
const config = require('./config.js');

const homedir = require('os').homedir();

const translationExcelBuffer = xlsx.parse(homedir + config.workdir + config.translation);
const translation = [];
translationExcelBuffer[0].data.forEach(array => {
	array[0] && translation.push(array[0]);
});

const translatedExcelBuffer = xlsx.parse(homedir + config.workdir + config.translated);
const translated = [];
translatedExcelBuffer[0].data.forEach(array => {
	array[0] && translated.push(array[0]);
});

const srtData = [];
let srtFilePath = homedir + config.workdir + config.srcSrt;
const srtContent = fs.readFileSync(srtFilePath, 'utf8').split('\n\n');
srtContent.forEach((content, i) => {
	const contentLines = content.split('\n');
	contentLines[0] && srtData.push(contentLines[0], contentLines[1], translated[i], translation[i], '');
});

fs.writeFileSync(homedir + config.workdir + config.distSrt, srtData.join(os.EOL), 'utf8');
console.log(`srt generated. path=${homedir + config.workdir + config.distSrt}`);
