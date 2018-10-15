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

    // delete many recs.
    //db.collection('Todos').deleteMany({text: 'Fix deck'}).then((result)=>{
    //   console.log(result); 
    //});
 
    // delete one.
    //db.collection('Todos').deleteOne({text: 'do study'}).then((result)=>{
    //    console.log(result); 
    // });
    // find one and delete that.
    //db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
     //   console.log(result); 
     //});

     //db.collection('Users').deleteMany({name: 'simar'});
     db.collection('Users').findOneAndDelete({_id: new ObjectID("5bc51529e116b597dec24000")}).then ((results)=> {
         console.log(JSON.stringify(results, undefined, 2));
     });
    //db.close();
    });




    /*const db = client.db('TodoApp');
    // instead of cursor (pointer), we want array(which returns a promise)
    
      db.collection('Todos').find( ).count().then ((count) => {
            console.log(`Todos count: ${count}`);
            }, (err) =>{
                console.log('Unable to fetch todos', err);

            });
    //db.close();
    });*/

    // find specific
    //db.collection('Todos').find({completed: false}).toArray().then ((docs) => {
   /* db.collection('Todos').find(
        {
            _id: new ObjectID('5bc3702085b4d110fc3f0cdf')
          }).toArray().then ((docs) => {
              //console.log('Todos');
              console.log(JSON.stringify(docs, undefined, 2));
              }, (err) =>{
                  console.log('Unable to fetch todos', err);
  
              });*/
