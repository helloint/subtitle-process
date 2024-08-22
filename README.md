# 给英语视频添加双语字幕的一个解决方案
## How To Use
### 准备
0. 环境配置：  
  * 安装【[Node.js/npm环境](https://nodejs.org/zh-cn/)】  
  * 安装【[剪映桌面端](https://lv.ulikecam.com/)】  
  * 安装【[FFmpeg](http://ffmpeg.org/download.html)】

1. 把原视频命名为`src.mp4`
  如果不修改文件名，也可以修改最后的ffmpeg命令。

2. 使用【剪映】生成字幕文件  
  在【剪映】里导入原视频，使用剪映自带功能，自动生成英语字幕(菜单/文本/识别字幕)，然后导出字幕文件，命名为`src.srt`。  
  最新版本的剪映已经把字幕识别功能改为每月限免使用5次，可能不久的将来就要另寻他路了。剪映也已经能够直接对识别的字幕文件进行翻译，但这是VIP功能，使用后需成为VIP才能导出。
   
3. 生成待翻译文件`translation.xlsx`①  
  执行[extract](#extract)命令获取待翻译文件 `translation.xlsx`，路径在配置`config.translation`里，默认是"下载"目录。
   
4. 获取翻译后的文件`translated.xlsx`②  
  用 Google Translate 对文字进行翻译。  
  打开 [Google Translate](https://translate.google.cn/)，上传`translated.xlsx`，把翻译后的Excel下载下来，重命名为 `translated.xlsx`。  
  确保文件目录和`config.translated`的一致，默认是"下载"目录。
   
5. 生成字幕文件`subtitle.srt`③  
  执行[srt](#srt)命令，生成 `subtitle.srt`，路径在配置`config.translation`里，默认是"下载"目录。

6. 使用`FFmpeg`合成字幕，压缩视频。`src.mp4`是源文件，`dist.mp4`是生成后的文件。
  执行[ffmpeg](#ffmpeg)命令，生成 `dist.mp4`
  对应的命令行：  
```
ffmpeg -y -i src.mp4 -lavfi "subtitles=subtitle.srt" -c:v h264 -qp 25 dist.mp4
```

## 命令说明
### extract
npm环境`npm run extract`(或者Node环境`node extract.js`), 字幕文件会提取到待翻译文件`translation.xlsx`。  
### srt
npm环境`npm run srt`(或者Node环境`node srt.js`), 生成字幕文件`subtitle.srt`。  
### ffmpeg
npm环境`npm run ffmpeg`(或者Node环境`node ffmpeg.js`), 生成合成字幕后的视频文件`dist.mp4`。  
注：之所以选择内嵌字幕，是因为这样的格式兼容性好，可以在大多数浏览器内直接播放。
