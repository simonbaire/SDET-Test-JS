const fs = require('fs-extra');

const makeDir = require('make-dir');
const outputDir = './testoutput/';
fs.emptyDir(outputDir);
const targetResultJson = `${outputDir}/report.json`;
const commonOptions = `--format json:${targetResultJson} --format summary --require-module ts-node/register --require tests/step_definitions/*.ts --fail-fast`;
const common = `${commonOptions}`;

makeDir(outputDir);

module.exports = {
    'default': common
};
