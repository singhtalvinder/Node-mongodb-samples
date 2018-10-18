var mongoose = require('mongoose');

// create mongoose model.
var Todo  = mongoose.model('Todo', {
    text : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt:  {
        type: Number,
        default: null

    }
});

// export model.

module.exports = {Todo};
/*
// create a entry document(record) to the model.
var newTodo = new Todo({
    text: 'Talk to CC',
    completed: false,
    completedAt: 12446
});

newTodo.save().then((doc) =>{
    console.log('Saved todo:');
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save todo', e);
})
*/