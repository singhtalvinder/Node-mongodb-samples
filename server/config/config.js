// From heroku for getting node dev env.
var env = process.env.NODE_DEV || 'development';

console.log(' Current Env settings are--->', env);

// config app based on env.
if(env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} else if(env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapptest';
}