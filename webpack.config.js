const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/firebase.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'index.js'
    },
    watch: true,

}