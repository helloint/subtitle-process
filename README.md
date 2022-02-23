# 给英语视频添加双语字幕的一个解决方案
## How To Use
### 准备
0. 环境配置：  
  * 安装【Node/npm环境】  
  * 安装【剪映[桌面端](https://lv.ulikecam.com/)】  
  * 安装【[FFmpeg](http://ffmpeg.org/download.html)】
   
1. 使用剪映获取字幕文件 `draft_content.json`①  
  在剪映里导入原视频，使用剪映自带功能，自动生成英语字幕(菜单/文本/识别字幕)，然后退出剪映。  
  把剪映草稿的配置文件`draft_content.json`复制到当前目录。文件路径：  
   Win: `${Users}\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft`  
   Mac: `${Users}/Movies/JianyingPro/User Data/Projects/com.lveditor.draft`
   
2. 生成待翻译文件`translation.txt`②  
  执行[导出](#导出-extract)命令获取待翻译文件 `translation.txt`
   
3. 获取翻译后的文件`translated.txt`③  
  用 Google Translation 翻译 `translation.txt`，得到 `translated.txt`。注意比对行数，确保内容不要错位。  
  Note: 现在的版本已经不支持txt了,需要人工把txt转成Excel表格，再把翻译后的Excel转回txt。
   
4. 生成合并后的文件`draft_content_imported.json`④  
  执行[合并](#合并-merge)命令，合并成 `draft_content_imported.json`。
   
5. 生成字幕文件`subtitle.srt`⑤  
  执行[生成字幕文件](#生成字幕文件-srt)命令，生成 `subtitle.srt`。

6. 使用`FFmpeg`合成字幕，同时压缩视频。命令行：  
```
ffmpeg -y -i src.mp4 -lavfi "subtitles=subtitle.srt" -c:v h264 -rc constqp -qp 25 dist.mp4
```

## 命令说明
### 导出 (Extract)
npm环境`npm run extract`, 或者Node环境, `node extract.js`, 字幕文件会提取到 `translation.txt`
### 合并 (Merge)
npm环境`npm run merge`, 或者Node环境, `node merge.js`, 翻译文件 `translated.txt` 会被追加到已有的英文字幕后(换行显示)
### 生成字幕文件 (Srt)
npm环境`npm run srt`, 或者Node环境, `node srt.js`, 导出`srt`字幕文件  
