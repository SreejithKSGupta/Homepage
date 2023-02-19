const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/js/firebase.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'index.js'
    },
    watch: true,

}