/*
file content format:
1
00:00:18,580 --> 00:00:23,347
很久以前在遙遠的銀河系...

2
00:00:26,164 --> 00:00:31,124
星際大戰
"target_timerange": {
	"duration": 2333333,
			"start": 7433333
},

draft_content_merged.json -> subtitle.srt
 */
const fs = require('fs');
const os = require('os');
const xlsx = require('node-xlsx');
const config = require('./config.js');

const homedir = require('os').homedir();
const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'));
const excelBuffer = xlsx.parse(homedir + config.workdir + config.translated);
const translated = [];
excelBuffer[0].data.forEach(array => {
	translated.push(array[0]);
});
console.log(`translated file imported. total ${translated.length} lines.`);

const srtData = [];
data.texts.forEach((text, i) => {
	srtData.push(i + 1);
	srtData.push(data.tracks[i]);
	srtData.push(text);
	srtData.push(translated[i]);
	srtData.push('');
});
srtData[srtData.length] = '';

fs.writeFileSync(homedir + config.workdir + config.srt, srtData.join(os.EOL), 'utf8');
console.log(`srt generated. path=${homedir + config.workdir + config.srt}`);
