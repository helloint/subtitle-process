const config = {};
// macOS
config.jianyin = /*[USERNAME]*/'/Movies/JianyingPro/User Data/Projects/com.lveditor.draft/12月17日/';
// Windows
// config.jianyin = /*[USERNAME]*/'\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\10月10日\';
// 指定的替换词
config.replacement = {
    'endeavor': 'Endeavor',
    'endeavour': 'Endeavor',
    'town hall': 'Town Hall',
};
// 保留字
config.reserved = [
    'Endeavor',
    'Town Hall',
];

config.workdir = /*[USERNAME]*/'/Downloads/';
config.dataFile = 'data.json';
config.translation = 'translation.xlsx';
config.translated = 'translated.xlsx';
config.srt = 'subtitle.srt';

module.exports = config;
