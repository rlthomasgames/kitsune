const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

/*============================================*/
/*  MUST ADD ENTRY HERE FOR EACH NEW MODULE   */
/*============================================*/
const moduleEntries = {
    index: {
        import: './index.ts'
    },
    helloWorldExtension: {
        import: ['./extensions/HelloWorldExtension.ts', 'hwrld']
    },
    pixiFrameworkExtension: {
        import: ['./extensions/PixiFrameworkExtension.ts', 'pixi.js']
    }
};
module.exports = {
    mode: 'development',
    entry: moduleEntries,
    devtool: 'inline-source-map',
    watch: false,
    devServer: {
        static: './dist',
    },
    externalsPresets: { node: false }, // in order to ignore built-in extensions like path, fs, etc.
    externals: [], // in order to ignore all extensions in node_modules folder
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
                    return '../../kitsune-wrapper/dist/extensions/[name].bundle.js';
            }
        },
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    context: path.resolve(__dirname, './src/')
};
const packageMinified = () => {
    const entries = Object.keys(moduleEntries);
    const includedMinified = ['index.js'];
    entries.forEach((name) => {
        if (String(moduleEntries[name].import).includes('extensions/')) {
            includedMinified.push(`../../kitsune-wrapper/dist/extensions/${name}.bundle.js`);
        }
    });
    const terserOptions = { include: includedMinified };
    module.exports.optimization.minimizer.push(new TerserPlugin(terserOptions));
};
packageMinified();
