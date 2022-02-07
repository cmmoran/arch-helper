import alt1chain from "@alt1/webpack";
import * as path from "path";

const srcdir = path.resolve(__dirname, "./src/");
const outdir = path.resolve(__dirname, "./dist/");

//wrapper around webpack-chain, most stuff you'll need are direct properties,
//more finetuning can be done at config.chain
//the wrapper gives decent webpack defaults for everything alt1/typescript/react related
const config = new alt1chain(srcdir, {ugly: false});

//exposes all root level exports as UMD (as named package "testpackege" or "TEST" in global scope)
config.makeUmd("testpackage", "TEST");

//the name and location of our entry file (the name is used for output and can contain a relative path)
config.entry("index", "./index.tsx");

// config.production(false, true, false);

//where to put all the stuff
config.output(outdir);

// console.log(JSON.stringify(config.toConfig(), null, 2));

module.exports = {
  ...config.toConfig()
};

/*
module.exports = {
  context: '/Users/user/Development/mine/alt1minimal/src',
  target: 'web',
  node: false,
  mode: 'development',
  devtool: false,
  output: {
    globalObject: "(typeof self!='undefined'?self:this)",
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'umd',
    library: {root: 'TEST', commonjs: 'testpackage', amd: 'testpackage'},
    chunkLoadingGlobal: 'testpackage',
    path: '/Users/user/Development/mine/alt1minimal/dist'
  },
  resolve: {
    extensions: [
      '.wasm', '.tsx',
      '.ts', '.mjs',
      '.jsx', '.js',
      '.json'
    ]
  },
  resolveLoader: {extensions: ['.js', '.json', '.ts']},
  module: {
    parser: {
      javascript: {
        commonjsMagicComments: true
      }
    },
    rules: [
      { use: [
          {
            "loader": "ts-loader",
            "options": {
              "compilerOptions": {
                "moduleResolution": "Node",
                "outDir": "./dist",
                "allowJs": true,
                "target": "es2018",
                "module": "esnext"
              },
              "appendTsSuffixTo": [
                {}
              ],
              "allowTsInNodeModules": false
            }
          }
        ]
      }, [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  optimization: {
    moduleIds: 'named',
    minimize: false,
    minimizer: [{
      options: {
        test: {},
        extractComments: true,
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            ascii_only: true,
            max_line_len: 250
          }
        }
      }
    }]
  },
  entry: {
    index: ['/Users/user/Development/mine/alt1minimal/src/index.ts']
  }
}


module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  // Other options...
};

module.exports = {
  "context": "/Users/user/Development/mine/alt1minimal/src",
  "target": "web",
  "node": false,
  "mode": "development",
  "devtool": false,
  "output": {
    "globalObject": "(typeof self!='undefined'?self:this)",
    "filename": "[name].bundle.js",
    "chunkFilename": "[name].bundle.js",
    "libraryTarget": "umd",
    "library": {
      "root": "TEST",
      "commonjs": "testpackage",
      "amd": "testpackage"
    },
    "chunkLoadingGlobal": "testpackage",
    "path": "/Users/user/Development/mine/alt1minimal/dist"
  },
  "resolve": {
    "extensions": [
      ".wasm",
      ".tsx",
      ".ts",
      ".mjs",
      ".jsx",
      ".js",
      ".json"
    ]
  },
  "resolveLoader": {
    "extensions": [
      ".js",
      ".json",
      ".ts"
    ]
  },
  "module": {
    "parser": {
      "javascript": {
        "commonjsMagicComments": true
      }
    },
    "rules": [
      {
        "test": {},
        "use": [
          {
            "loader": "ts-loader",
            "options": {
              "compilerOptions": {
                "moduleResolution": "Node",
                "outDir": "./dist",
                "allowJs": true,
                "target": "es2018",
                "module": "esnext"
              },
              "appendTsSuffixTo": [
                {}
              ],
              "allowTsInNodeModules": false
            }
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "style-loader"
          },
          {
            "loader": "css-loader"
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "style-loader"
          },
          {
            "loader": "css-loader"
          },
          {
            "loader": "sass-loader"
          }
        ]
      },
      {
        "oneOf": [
          {
            "test": {},
            "use": [
              {
                "loader": "@alt1/imagedata-loader"
              }
            ]
          },
          {
            "test": {},
            "use": [
              {
                "loader": "url-loader",
                "options": {
                  "limit": 8192,
                  "esModule": false,
                  "name": "[path][name].[ext]"
                }
              }
            ]
          }
        ]
      },
      {
        "test": {},
        "type": "javascript/auto",
        "use": [
          {
            "loader": "json-loader"
          }
        ]
      },
      {
        "test": {},
        "oneOf": [
          {
            "use": [
              {
                "loader": "@alt1/font-loader"
              }
            ]
          }
        ]
      },
      {
        "test": {},
        "use": [
          {
            "loader": "file-loader",
            "options": {
              "name": "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  "optimization": {
    "moduleIds": "named",
    "minimize": false,
    "minimizer": [
      {
        "options": {
          "test": {},
          "extractComments": true,
          "cache": true,
          "parallel": true,
          "terserOptions": {
            "output": {
              "ascii_only": true,
              "max_line_len": 250
            }
          }
        }
      }
    ]
  },
  "entry": {
    "index": [
      "/Users/user/Development/mine/alt1minimal/src/index.ts"
    ]
  }
}
*/
