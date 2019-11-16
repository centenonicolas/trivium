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
}

const serverConfig = {
    mode: 'development',
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: {
        'index.js': path.resolve(__dirname, 'src/server/controller.js')
    },
    module: {
        rules: [js]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]'
    }
}

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'index.js': path.resolve(__dirname, 'src/public/index.js')
    },
    module: {
        rules: [js]
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name]'
    }
}
