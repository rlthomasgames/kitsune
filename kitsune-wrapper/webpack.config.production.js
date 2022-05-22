const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

/*============================================*/
/*  MUST ADD ENTRY HERE FOR EACH NEW MODULE   */
/*============================================*/
const moduleEntries = {
    index: {
        import: './src/index.ts',
        dependOn: ['lodash']
    },
    lodash: 'lodash',
    inversify: 'inversify',
    kwl: 'kitsune-wrapper-library'
};
module.exports = {
    mode: 'development',
    entry: moduleEntries,
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
        static: './dist',
    },
    externalsPresets: { node: false }, // in order to ignore built-in modules like path, fs, etc.
    externals: [], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'assets/logo.png', to: 'assets/logo.png' },
                { from: 'config/wrapper.json', to: 'config/wrapper.json' },
            ],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        })
    ],
    output: {
        clean: true,
        publicPath: '',
        filename: (pathData) => {
            switch (pathData.chunk.name) {
                case 'index':
                    return 'index.js';
                    break;
                default:
                    return 'modules/[name].js';
            }
        },
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
const packageMinified = () => {
    const entries = Object.keys(moduleEntries);
    const includedMinified = ['wrapper.js'];
    entries.forEach((name) => {
        if (String(moduleEntries[name].import).includes('/modules/')) {
            includedMinified.push(`modules/${name}.js`);
        }
    });
    const terserOptions = { include: includedMinified };
    module.exports.optimization.minimizer.push(new TerserPlugin(terserOptions));
};
packageMinified();
