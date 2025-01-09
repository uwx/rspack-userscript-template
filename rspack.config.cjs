// @ts-check

const { name, version, description, author } = require('./package.json');

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: `${name}.user.js`,
        iife: true,
        asyncChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                    },
                },
                type: 'javascript/auto',
            },
        ],
    },
    plugins: [
        require('./rspack-userscript-plugin.cjs')({
            name,
            header: {
                name: name,
                version: version,
                author: author.name,
                description: description,
                include: [
                    'https://example.com/*'
                ],
                grant: [
                    'none',
                ],
            }
        })
    ],
    optimization: {
        minimize: false,
    },
    devtool: 'inline-source-map',
};