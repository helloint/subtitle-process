const fs = require('fs');
const os = require('os');
const xlsx = require('node-xlsx');
const config = require('./config.js');

const homedir = os.homedir();
let dataFilePath = homedir + config.jianyin + 'draft_info.json';
if (!fs.existsSync(dataFilePath)) {
	// try old filename;
	dataFilePath = homedir + config.jianyin + 'draft_content.json';

	if (!fs.existsSync(dataFilePath)) {
		console.log("file doesn't exist");
		process.exit(1);
	}
}
console.log(`file imported. path=${dataFilePath}`);
const originData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
const data = {texts: [], tracks: []};
originData.materials.texts.forEach(text => {
	data.texts.push(processContent(text.content));
});
originData.tracks.forEach((track, i) => {
	if (track.type === 'text') {
		track.segments.forEach((segment, j) => {
			/*
			Data Sample:
				"target_timerange": {
					"duration": 24933333,
					"start": 0
				},
			Format:
				00:00:18,580 --> 00:00:23,347
			 */
			data.tracks.push([
				formatTime(segment.target_timerange.start),
				' --> ',
				formatTime(segment.target_timerange.start + segment.target_timerange.duration)
			].join(''));
		});
	}
});

const translation = [];
data.texts.forEach(text => {
	translation.push([processTranslation(text)]);
});

fs.writeFileSync(config.dataFile, JSON.stringify(data), 'utf8');
console.log(`data.json generated.`);
// fs.writeFileSync(homedir + config.workdir + config.translation, translation.join(os.EOL), 'utf8');
// console.log(`translation.txt generated. total ${translation.length} lines.`);
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

// (80500000) -> '00:01:20,500'
function formatTime(time) {
	var h = Math.floor(time / 3600000000);
	var m = Math.floor((time - h * 3600000000) / 60000000);
	var s = Math.floor((time - h * 3600000000 - m * 60000000) / 1000000);
	var ms = Math.floor((time - h * 3600000000 - m * 60000000 - s * 1000000) / 1000);
	return [
		[
			fillZero(h + '', 2),
			fillZero(m + '', 2),
			fillZero(s + '', 2),
		].join(':'),
		fillZero(ms + '', 3),
	].join(',');
}

// ('2', 3) -> '002'
function fillZero(str, length) {
	if (str.length >= length) return str;

	while (str.length < length) {
		str = '0' + str;
	}

	return str;
}
