// file content format:
// 1
// 00:00:18,580 --> 00:00:23,347
// 很久以前在遙遠的銀河系...
//
// 2
// 00:00:26,164 --> 00:00:31,124
// 星際大戰
// "target_timerange": {
// 	"duration": 2333333,
// 			"start": 7433333
// },
//

// draft_content_merged.json -> subtitle.srt
const fs = require('fs');
const jyData = JSON.parse(fs.readFileSync('draft_content_merged.json', 'utf8'));
const srtFile = 'subtitle.srt';

let srtData = [];
var texts = jyData.materials.texts;
var tracks = {};
for (var i = 0; i < jyData.tracks.length; i++) {
	if (jyData.tracks[i].type === 'text') {
		for (var j = 0; j < jyData.tracks[i].segments.length; j++) {
			// Sample Data:
			// "target_timerange": {
			// 	"duration": 24933333,
			// 	"start": 0
			// },
			// format: 00:00:18,580 --> 00:00:23,347
			var timestamp = [
				formatTime(jyData.tracks[i].segments[j].target_timerange.start),
				' --> ',
				formatTime(jyData.tracks[i].segments[j].target_timerange.start + jyData.tracks[i].segments[j].target_timerange.duration)
			].join('');

			tracks[jyData.tracks[i].segments[j].material_id] = timestamp;
		}
	}
}
for (var i = 0; i < texts.length; i++) {
	srtData[srtData.length] = i + 1;
	srtData[srtData.length] = tracks[texts[i].id];
	srtData[srtData.length] = texts[i].content;
	srtData[srtData.length] = '';
}
srtData[srtData.length] = '';

fs.writeFileSync(srtFile, srtData.join('\n'), 'utf8');

// 80500000 -> 00:01:20,500
function formatTime(time) {
	var h = Math.floor(time / 3600000000);
	var m = Math.floor((time - h * 3600000000) / 60000000);
	var s = Math.floor((time - h * 3600000000 - m * 60000000) / 1000000);
	var ms = Math.floor((time - h * 3600000000 - m * 60000000 - s * 1000000) / 1000);
	var ret = [
		[
			fillZero(h + '', 2),
			fillZero(m + '', 2),
			fillZero(s + '', 2),
		].join(':'),
		fillZero(ms + '', 3),
	].join(',');

	return ret;
}

// '2', 3 -> '002'
function fillZero(str, length) {
	if (str.length >= length) return str;

	while (str.length < length) {
		str = '0' + str;
	}

	return str;
}