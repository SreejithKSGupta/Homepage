const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/js/firebase.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'main.js'
    },
    watch: true,

}