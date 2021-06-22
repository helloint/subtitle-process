# 给英语视频添加双语字幕的一个解决方案
## 命令说明
### 导出(Extract)
npm环境`npm run extract`, 或者node环境, `node extract.js`, 字幕文件会提取到 translation.txt
### 导入(Merge)
npm环境`npm run merge`, 或者node环境, `node merge.js`, 翻译文件 translated.txt 会被追加到已有的英文字幕后(换行显示)

## How To Use
### 准备
1. 安装node/npm环境
2. 安装剪映桌面端
3. 在剪映里导入英语视频, 通过剪映自动生成英语字幕. 退出剪映.
4. 把剪映草稿的配置文件draft_content.json复制到当前目录, 【导出】翻译文件 translation.txt
5. 用 Google Translation 翻译 translation.txt, 得到 translated.txt. 注意比对行数, 确保不要错位.
6. 【导入】 合并成 draft_content_imported.json, 覆盖剪映源文件。
7. 重新打开剪映, 配置字幕样式, 包括但不限于: (1) 选择合适的字体, 使字幕产生阴影. (2) 适当调大行间距.
8. 导出视频. 这部比较吃GPU.

## TODO
更好的方案应该是基于剪映的字幕和Google翻译, 生成srt双语字幕文件, 然后用ffmpeg压缩