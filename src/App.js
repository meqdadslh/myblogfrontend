
import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';


function App() {

  const [articles, setArtciles] = useState ([])
  const [editArticle, setEditArtcile] = useState ()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/blog/articles/', {
      'method': 'GET',
      headers : {
        'content-Type':'application/json',
        'Authorization':'Token 79b95aeebc9dc0494727ed8ab01bc14636e3fadf'
      }
    })
    .then(resp => resp.json())
    // set the articles to the response that we have 
    .then(resp => setArtciles(resp))
    // if there is an error I want to catch it
    .catch(error => console.log(error))
  }, [])


  const editBtn = (article) => {
    setEditArtcile(article)

  }

  return (
    <div className="App">
      <ArticleList articles = {articles}/>
      <Form/>
    </div>
  );
}

export default App;
