//const MongoClient = require('mongodb').MongoClient;

// use destructuring ...
const {MongoClient, ObjectID} = require('mongodb');
// allows to add new object ids.


MongoClient.connect('mongodb://localhost:27017/TodoApp',
//    {useNewUrlParser: true},    
    (err, client)=>{
    if(err) {
        return console.log('Unable to connect to the Mongodb server');
    }
    console.log('connected to Mongodb server');
    const db = client.db('TodoApp');

    // update the name of a rec.
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bc37f56184e2c135081fbc5')
    }, {
            $set: { name: 'Bill coy'
            },
            $inc: { 
                age: -30
            }
        },
         {
        returnOriginal: false
        }).then((result) => {console.log(result);
    });

    // find one and update that back.
    //db.collection('Todos').findOneAndUpdate({
    //    _id: new ObjectID('5bc51457e116b597dec23fdf')
    //}, {
    //        $set: { completed: true
    //        }
    //    },
    //     {
    //    returnOriginal: false
    //    }).then((result) => {console.log(result);
    //});
       
    //db.close();
    });




