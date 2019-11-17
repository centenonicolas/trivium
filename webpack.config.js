const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['react', 'es2015'],
            plugins: ['transform-class-properties']
        }
    }
};

const rules = [{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/react',
                    ["@babel/env", {
                        "targets": {
                            'browsers': ['Chrome >=59']
                        },
                        "modules":false,
                        "loose":true
                    }]
                ],
                plugins: [
                    'babel-plugin-transform-class-properties', "react-hot-loader/babel",
                    ["import", {libraryName: "antd", style: "css"}],
                    "@babel/proposal-object-rest-spread"
                ]
            }
        }
    },{
    test: /\.(css)$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader'],
},
    {
        test: /\.(jpe?g|png|gif|svg|ttf|woff2?)$/i,
        use: [
            {
                loader: 'file-loader'
            },
        ],
    }];

const serverConfig = {
    mode: 'development',
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: {
        'controller.tsx': path.resolve(__dirname, 'src/server/controller.tsx')
    },
    module: {
        rules: rules
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]'
    }
};

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'index.js': path.resolve(__dirname, 'src/client/index.js')
    },
    module: {
        rules: rules
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name]'
    }
};

module.exports = [serverConfig, clientConfig];
