const path = require('path');
module.exports = {
    stories: ['../src/**/*.stories.js'],
    // stories: ['../src/**/*.stories.js'],
    webpackFinal: async (config, { configType }) => {
        const lessRule = config.module.rules.find((rule) =>
            rule.test.test('.less'),
        );
        if (lessRule) {
            lessRule.test = /\.(css|less)$/;
            lessRule.use = [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                    },
                },
            ];
            lessRule.include = path.resolve(__dirname, '../');
        }
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                'sass-loader',
            ],
            include: path.resolve(__dirname, '../'),
        });
        config.module.rules.push({
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: 'fonts/[hash].[ext]',
                limit: 10000,
            },
        });
        console.dir(config, { depth: null });
        return config;
    },
    addons: [
        {
            name: '@storybook/preset-create-react-app',
            options: {
                craOverrides: {
                    fileLoaderExcludes: ['less'],
                },
            },
        },
        // '@storybook/preset-ant-design',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        // '@storybook/addon-storysource',
        '@storybook/addon-knobs',
    ],
};
