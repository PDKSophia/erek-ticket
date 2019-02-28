const path = require('path')

const config = {
  projectName: 'erek-ticket',
  date: '2019-2-18',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@service': path.resolve(__dirname, '..', 'src/service'),
    '@redux': path.resolve(__dirname, '..', 'src/redux'),
    '@store': path.resolve(__dirname, '..', 'src/store')
  },
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
    },
    typescript: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        baseUrl: '.',
        declaration: false,
        experimentalDecorators: true,
        jsx: 'preserve',
        jsxFactory: 'Nerv.createElement',
        module: 'commonjs',
        moduleResolution: 'node',
        noImplicitAny: false,
        noUnusedLocals: true,
        outDir: './dist/',
        preserveConstEnums: true,
        removeComments: false,
        rootDir: '.',
        sourceMap: true,
        strictNullChecks: true,
        target: 'es6'
      },
      include: ['src/**/*'],
      exclude: ['node_modules'],
      compileOnSave: false
    }
  },
  defineConstants: {},
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
