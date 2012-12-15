var
  config = require('getconfig'),
  cradle = require('cradle');
cradle.setup(config.cradle.setup);
var
  dbc = new(cradle.Connection),
  db = dbc.database(config.cradle.name),
  helpers = require('./app/helpers')({ config: config }),
  models = require('./app/models')({ db: db, helpers: helpers });

db.exists(function (err, exists) {
  if (err) {
    console.log('error', err);
  } else if (exists) {
    runSeed(db);
  } else {
    console.log('Creating database...');
    db.create();
    runSeed(db);
  }
});

runSeed = function(db) {

  // Users
  console.log('Creating myself as a user...');
  var user = new models.User;
  var now = Date.now()
  user.provider = 'twitter';
  user.providerId = config.twitter.adminId;
  user.name = 'Douglas Waltman II';
  user.image = 'http://a0.twimg.com/profile_images/1392046265/image_reasonably_small.jpg';
  user.url = "http://twitter.com/dougwaltman";
  user.description = "Site admin. Superhero.";
  user.created_at = now;
  user.updated_at = now;
  var uId = 'user-twitter-' + user.providerId;
  db.save(uId, user);

  // Articles and comments
  for(_a = 1; _a <= 3; _a++) {
    (function(_a) {
      setTimeout(function(){

        aId = 'test-article-' + _a;
        console.log('Creating ' + aId + '...');
        now = Date.now();

        article = new models.Article;
        article.user = uId;
        article.status = 'published';
        article.title = 'Test Article #' + _a;
        article.body = 'Hello world. This is a test article stored in CouchDB.';
        article.created_at = now;
        article.updated_at = now;
        db.save(aId, article);

        // Comments
        for(_c = 1; _c <= 3; _c++) {
          cId = 'comment-' + now + '-' + helpers.getRandString(16);
          console.log('Creating ' + cId + '...');

          comment = new models.Comment;
          comment.rel = aId;
          comment.user = uId;
          comment.user_cache = user;
          comment.status = 'published';
          comment.body = 'Hello world. This is a test comment #' + _c + '.';
          comment.created_at = now;
          comment.updated_at = now;
          db.save(cId, comment);
        }

      }, 200);
    })(_a);
  }
  console.log('...done');
}
