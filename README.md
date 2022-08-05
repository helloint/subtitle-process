# 给英语视频添加双语字幕的一个解决方案
## How To Use
### 准备
0. 环境配置：  
  * 安装【[Node.js/npm环境](https://nodejs.org/zh-cn/)】  
  * 安装【[剪映桌面端](https://lv.ulikecam.com/)】  
  * 安装【[FFmpeg](http://ffmpeg.org/download.html)】
   
1. 使用【剪映】生成字幕文件  
  在【剪映】里导入原视频，使用剪映自带功能，自动生成英语字幕(菜单/文本/识别字幕)，然后退出剪映。  
  剪映的文件路径：  
   Win: `${Users}\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft`  
   Mac: `${Users}/Movies/JianyingPro/User Data/Projects/com.lveditor.draft`  
  确保`bin/config.js`里的`config.jianyin`正确指向了剪映项目目录，程序会自动读取数据文件：`draft_info.json`
   
2. 生成待翻译文件`translation.txt`①  
  执行[extract](#extract)命令获取待翻译文件 `translation.txt`，路径在配置`config.translation`里，默认是"下载"目录。
   
3. 获取翻译后的文件`translated.txt`②  
  用 Google Translate 对文字进行翻译。  
  （1）创建空Excel文件，把`translation.txt`里的内容复制进去，保存。  
  （2）上传到 [Google Translate](https://translate.google.cn/)，把翻译后的Excel下载下来，把内容复制到 `translated.txt`。  
  确保文件目录和`config.translated`的一致，默认是"下载"目录。
   
4. 生成字幕文件`subtitle.srt`③  
  执行[srt](#srt)命令，生成 `subtitle.srt`，路径在配置`config.translation`里，默认是"下载"目录。

5. 使用`FFmpeg`合成字幕，压缩视频。`src.mp4`是源文件，`dist.mp4`是生成后的文件。命令行：  
```
ffmpeg -y -i src.mp4 -lavfi "subtitles=subtitle.srt" -c:v h264 -qp 25 dist.mp4
```

## 命令说明
### extract
npm环境`npm run extract`, 或者Node环境, `node extract.js`, 字幕文件会提取到 `translation.txt`
### srt
npm环境`npm run srt`, 或者Node环境, `node srt.js`, 生成`srt`字幕文件  
