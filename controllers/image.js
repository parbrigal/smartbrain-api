const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey : 'a9bd0855db73499593090a2801c5abab'
})

const handleAPICall = (req,res) =>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => response.status(400).json('unable to retrieve image'));
}


const handleImage =  (req,res,knex) => {
  const { id } = req.body;
  knex('users').where('id','=',id).increment('entries',1).returning('entries')
  .then(entries => {
    res.json(entries[0])
    }).catch(err => res.status(400).json('unable to update'))
}

module.exports = {
  handleImage : handleImage,
  handleAPICall : handleAPICall
};
