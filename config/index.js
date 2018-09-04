// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var  url="http://localhost:8080"
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9608,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

        '/register': {
            target: url+"/user/register",
            changeOrigin:true,
            pathRewrite: {
                '^/register': '/'
            }
        },
        '/queryChargeStrategy': {
          target: url+"/chargeStrategy/queryChargeStrategy",
          changeOrigin:true,
          pathRewrite: {
              '^/queryChargeStrategy': '/'
          }
      },
      '/login': {
            target: url+"/user/login",
            changeOrigin:true,
            pathRewrite: {
                '^/login': '/'
            }
        },
        '/modifyPassword': {
            target: url+"/user/modifyPassword",
            changeOrigin:true,
            pathRewrite: {
                '^/modifyPassword': '/'
            }
        },
        '/queryPlace': {
            target: url+"/place/queryPlace",
            changeOrigin:true,
            pathRewrite: {
                '^/queryPlace': '/'
            }
        },
        '/queryParkByContent': {
            target: url+"/park/queryParkByContent",
            changeOrigin:true,
            pathRewrite: {
                '^/queryParkByContent': '/'
            }
        },
         '/queryParkNearby': {
            target: url+"/park/queryParkNearby",
            changeOrigin:true,
            pathRewrite: {
                '^/queryParkNearby': '/'
            }
        },
        '/queryPark': {
            target: url+"/park/queryPark",
            changeOrigin:true,
            pathRewrite: {
                '^/queryPark': '/'
            }
        },
        '/queryCar': {
            target: url+"/car/queryCar",
            changeOrigin:true,
            pathRewrite: {
                '^/queryCar': '/'
            }
        },
        '/addCar': {
            target: url+"/car/addCar",
            changeOrigin:true,
            pathRewrite: {
                '^/addCar': '/'
            }
        },
        '/editCar': {
            target: url+"/car/editCar",
            changeOrigin:true,
            pathRewrite: {
                '^/editCar': '/'
            }
        },
        '/deleteCar': {
            target: url+"/car/deleteCar",
            changeOrigin:true,
            pathRewrite: {
                '^/deleteCar': '/'
            }
        },
        '/queryBill': {
            target: url+"/bill/queryBill",
            changeOrigin:true,
            pathRewrite: {
                '^/queryBill': '/'
            }
        },
        '/commentaryByUser': {
            target: url+"/commentary/commentaryByUser",
            changeOrigin:true,
            pathRewrite: {
                '^/commentaryByUser': '/'
            }
        },
        '/recharge': {
            target: url+"/wallet/recharge",
            changeOrigin:true,
            pathRewrite: {
                '^/recharge': '/'
            }
        },
        '/queryWallet': {
            target: url+"/wallet/queryWallet",
            changeOrigin:true,
            pathRewrite: {
                '^/queryWallet': '/'
            }
        },
        '/reservePlace': {
            target: url+"/place/reservePlace",
            changeOrigin:true,
            pathRewrite: {
                '^/reservePlace': '/'
            }
        },
        '/myReservation': {
            target: url+"/place/myReservation",
            changeOrigin:true,
            pathRewrite: {
                '^/myReservation': '/'
            }
        },
        '/cancelReserve': {
            target: url+"/place/cancelReserve",
            changeOrigin:true,
            pathRewrite: {
                '^/cancelReserve': '/'
            }
        },
        '/parkStatus': {
            target: url+"/place/parkStatus",
            changeOrigin:true,
            pathRewrite: {
                '^/parkStatus': '/'
            }
        },
        '/parkPlace': {
            target: url+"/place/parkPlace",
            changeOrigin:true,
            pathRewrite: {
                '^/parkPlace': '/'
            }
        },
         '/ordinaryPark': {
            target: url+"/place/ordinaryPark",
            changeOrigin:true,
            pathRewrite: {
                '^/ordinaryPark': '/'
            }
        },
        '/queryCoupon': {
            target: url+"/coupon/queryCoupon",
            changeOrigin:true,
            pathRewrite: {
                '^/queryCoupon': '/'
            }
        },
        '/sysmsgs': {
            target: url+"/chat/sysmsgs",
            changeOrigin:true,
            pathRewrite: {
                '^/sysmsgs': '/'
            }
        },
        '/addCharge': {
            target: url+"/charge/addCharge",
            changeOrigin:true,
            pathRewrite: {
                '^/addCharge': '/'
            }
        },
        '/addCommentary': {
            target: url+"/commentary/addCommentary",
            changeOrigin:true,
            pathRewrite: {
                '^/addCommentary': '/'
            }
        },
        '/modifyUserInfo': {
            target: url+"/user/modifyUserInfo",
            changeOrigin:true,
            pathRewrite: {
                '^/modifyUserInfo': '/'
            }
        },
        '/queryCharge': {
            target: url+"/charge/queryCharge",
            changeOrigin:true,
            pathRewrite: {
                '^/queryCharge': '/'
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
