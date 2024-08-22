const config = {};
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
config.srcSrt = 'src.srt';
config.distSrt = 'subtitle.srt';
config.translation = 'translation.xlsx';
config.translated = 'translated.xlsx';

module.exports = config;
