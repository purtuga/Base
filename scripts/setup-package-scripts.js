#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const cwd = process.cwd();
// const promisify = require("util").promisify;
// const writeFile = promisify(fs.writeFile);

const promisify = require("../utils/promisify");
const writeFile = promisify(fs.writeFile);

const readline = require('readline');
const packageJsonFile = path.join(cwd, "package.json");
const packageJson = require(packageJsonFile);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`

This will replace your existing package.json script section. 

Continue? Y|n  `, answer => {
    answer = String(answer).trim().toLowerCase();
    if (answer === "y" || !answer) {
        packageJson.scripts = Object.assign(packageJson.scripts || {}, {
            "serve": "webpack-dev-server --config node_modules/@purtuga/project-base/configs/webpack.config.js --progress --hot --color --entry ./my.dev/index.js",
            "serve:test": "webpack-dev-server --config node_modules/@purtuga/project-base/configs/webpack.config.js --entry ./test/index.js --output-path ./my.dev --output-filename test.bundle.js --open-page test",

            "build": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js",
            "build:ie": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.legacy.non-minified --entry ./my.dev/index.js --output-path ./my.dev --output-filename ie-test-bundle.js",

            "build:prod": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.minified --env.build=prod.non-minified",
            "build:prod:min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.minified",
            "build:prod:non-min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --evn.build=prod.non-minified",

            "build:prod:legacy": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.legacy.minified --env.build=prod.legacy.non-minified",
            "build:prod:legacy:min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.legacy.minified",
            "build:prod:legacy:non-min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.legacy.non-minified",

            "build:prod:esm": "webpack --config node_modules/@purtuga/project-base/configs/webpack.prod.esm.js --env.build=prod.esm.minified --env.build=prod.esm.non-minified",
            "build:prod:esm:min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.esm.minified",
            "build:prod:esm:non-min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.esm.non-minified",

            "build:prod:wc": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.minified --env.build=prod.wc.non-minified",
            "build:prod:wc:min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.minified",
            "build:prod:wc:non-min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.non-minified",

            "build:prod:wc:legacy": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.legacy.minified --env.build=prod.wc.legacy.non-minified",
            "build:prod:wc:legacy:min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.legacy.minified",
            "build:prod:wc:legacy:non-min": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.wc.legacy.non-minified",

            "build:apiDocs": "jsdoc -c node_modules/@purtuga/project-base/configs/jsdoc.conf.json",
            "build:test": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --entry ./test/index.js --output-path ./my.dev --output-filename test.bundle.js",

            "dist": "webpack --config node_modules/@purtuga/project-base/configs/webpack.config.js --env.build=prod.minified --env.build=prod.legacy.minified --env.build=prod.esm.minified",

            "setup:dev": "node node_modules/@purtuga/project-base/scripts/create-dev",

            "lint": "eslint -c ./node_modules/@purtuga/project-base/configs/eslint.config.js src/**/*.js",
            "lint:fix": "eslint -c ./node_modules/@purtuga/project-base/configs/eslint.config.js --fix src/**/*.js",

            "version": "npm run dist&&git add dist/*"
        });

        writeFile(packageJsonFile, JSON.stringify(packageJson, null, 4)).then(() => {
            console.log(`
    Done!
    Review package.json for change made.
`);
            process.exit(0);
        });
    }
    else {
        console.log(`
Aborted. Nothing done!
`);
        process.exit(0);
    }
});





