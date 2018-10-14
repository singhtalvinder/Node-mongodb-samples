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
    // instead of cursor (pointer), we want array(which returns a promise)
    //db.collection('Users').find().toArray().then ((docs) => {
        db.collection('Users').find({name: 'Bill'}).toArray().then ((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));    
        //console.log(`Todos count: ${docs}`);
            }, (err) =>{
                console.log('Unable to fetch todos', err);

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
// find all 
/*db.collection('Todos').find().toArray().then ((docs) => {

    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
    }, (err) =>{
        console.log('Unable to fetch todos', err);

    });
*/