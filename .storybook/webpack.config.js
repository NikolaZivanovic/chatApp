const path = require('path');
const postcssGlobalImport = require('postcss-global-import');
const autoprefixer = require('autoprefixer');

module.exports = (baseConfig, env, defaultConfig) => {
    // Extend defaultConfig as you need.

    // For example, add typescript loader:
    defaultConfig.module.rules.push(
        {
            test: /(\.css|\.scss|\.sass)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer,
                            postcssGlobalImport,
                        ],
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [ path.resolve(__dirname, '../src/styles/variables/**/*') ]
                    },
                },
            ]
        }
    );

    defaultConfig.resolve.alias = Object.assign({}, defaultConfig.resolve.alias, {
      config$: path.resolve(__dirname, '../src/config/config.json'),
      ajax$: path.resolve(__dirname, 'src/util/ajax.js'),
      Config: path.resolve(__dirname, '../src/config'),
      Util: path.resolve(__dirname, '../src/util'),
      Images: path.resolve(__dirname, '../src/assets/images'),
      Fonts: path.resolve(__dirname, '../src/assets/fonts'),
      Common: path.resolve(__dirname, '../src/components/Common'),
    });

    return defaultConfig;
};
