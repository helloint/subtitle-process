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
const config = require('./config.js');

const homedir = require('os').homedir();
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const regex = /<[^<>]+>/g;
const translated = fs.readFileSync(homedir + config.translated, 'utf8').replace(regex ,"").split(os.EOL);
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

fs.writeFileSync(homedir + config.srt, srtData.join(os.EOL), 'utf8');
console.log(`srt generated. path=${homedir + config.srt}`);
