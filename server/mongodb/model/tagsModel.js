const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TagsSchema = new Schema({

    taglist: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model('devPostTagsList', TagsSchema);
