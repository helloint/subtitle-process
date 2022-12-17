# ffmpeg使用心得

## 工具
这次用到了ffmpeg的字幕合成工具，目标是理解和优化ffmpeg的命令行使用。
```
ffmpeg -y -i src.mp4 -vf "subtitles=subtitle.srt" -c:v h264 -movflags faststart dist.mp4
```

## Test
```
time ffmpeg -t 300 -y -i src.mp4 -vf "subtitles=subtitle.srt" -c:v libx264 -b:v 2000k dist.mp4
time ffmpeg -t 300 -y -i src.mp4 -vf "subtitles=subtitle.srt" -c:v h264_videotoolbox -b:v 2000k dist2.mp4
```

## 参数说明
* `-y`		不经过确认，输出时直接覆盖同名文件。
* `-i`		指定输入文件
* `-c:v`	指定视频编码器
* `-vf`		处理字幕  
"subtitles=subtitle.srt"	https://ffmpeg.org/ffmpeg-all.html#subtitles-1
* `-lavfi`	等价于-filter_complex, 处理单一流的时候, 可以用-filter:v, alias: -vf, 所以我改成 -vf 了
* `-crf`	Constant Rate Factor, 0-51, the default quality (and rate control) setting.  H.264 默认23, 其实可以不设置.  
测试下来crf=25和qp=25差不多
* `-qp`		恒定qp适用于演讲视频, 背景不怎么动, 可以减少1/5的文件大小.
* `-movflags`	这样生成的文件头是在前面的，如果上传到http网站边下载边播放会比较快。

## 疑问点
* Mac上不支持-rc constqp, 用的是libx264 (h264自动匹配), 看下Windows上用的是什么codec, 按理说同样的codec, 参数是一样的  
猜测 -rc constqp -qp 25 是给 h264_nvenc 用的

* ffmpeg 哪些参数是codec private options, 哪些是generic global options?  
https://www.ffmpeg.org/ffmpeg-codecs.html

* 硬件解码性能测试
```
time ffmpeg -t 300 -y -i src.mp4 -c:v libx264 -b:v 2000k dist.mp4
```
319.59s user 4.21s system 670% cpu 48.280 total
```
time ffmpeg -t 300 -y -i src.mp4 -c:v h264_videotoolbox -b:v 2000k dist.mp4
```
37.36s user 1.16s system 101% cpu 37.944 total  
同码率下, 硬解快一些, 但不支持 -crf 恒定质量

* 把字幕单独加入而不是合入的尝试
```
ffmpeg -t 60 -y -i src.mp4 -i subtitle_60.srt -c:v h264 -c:s mov_text -metadata:s:s:0 language=eng-chs -disposition:s:0 default -qp 25 dist5.mp4
```
兼容性: 只有Safari支持, 而且默认启用的参数测试也没成功

---

## 参考文章
* [官方完整文档](https://ffmpeg.org/ffmpeg-all.html)

* [FFmpeg 视频处理入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)
中文科普
![image](ffmpeg-cmd.png)

* [Codes](https://www.ffmpeg.org/ffmpeg-codecs.html)

* [CRF Guide (Constant Rate Factor in x264, x265 and libvpx)](https://slhck.info/video/2017/02/24/crf-guide.html)  
  看来crf比qp高级, 能够根据画面运动速率动态调整画面质量

