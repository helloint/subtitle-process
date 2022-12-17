const os = require('os');
const homedir = os.homedir();
const config = require('./config.js');

var spawn = require('child_process').spawn;

// or you can run `which ffmpeg` to get path
var cmd = 'ffmpeg';

if (os.platform() === 'win32') {
    // win
    var args = ['-y', '-i', homedir + config.workdir + 'src.mp4', '-lavfi', 'subtitles=' + homedir + config.workdir + 'subtitle.srt', '-c:v', 'h264', '-rc', 'constqp', '-qp', '25', homedir + config.workdir + 'dist.mp4'];
} else {
    // arm64
    var args = ['-y', '-i', homedir + config.workdir + 'src.mp4', '-lavfi', 'subtitles=' + homedir + config.workdir + 'subtitle.srt', '-c:v', 'h264', '-qp', '25', homedir + config.workdir + 'dist.mp4'];
}

var proc = spawn(cmd, args);

proc.stdout.on('data', function(data) {
    console.log(data);
});

proc.stderr.setEncoding("utf8");
proc.stderr.on('data', function(data) {
    console.log(data);
});

proc.on('close', function() {
    console.log('finished');
});
