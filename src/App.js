
import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom';


function App() {

  const [articles, setArtciles] = useState ([])
  const [editArticle, setEditArtcile] = useState (null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])

   // When the user login it directly takes to the articles page
   let history = useHistory()


  useEffect(() => {
    fetch('https://myblogdjangobackendma.herokuapp.com/blog/', {
      'method': 'GET',
      headers : {
        'content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    // set the articles to the response that we have 
    .then(resp => setArtciles(resp))
    // if there is an error I want to catch it
    .catch(error => console.log(error))
  }, [])



  // if token is not my token then remove it. FOR LOGOUT
  useEffect(() => {
    if(!token['mytoken']) {
        history.push('/')
    }
    // doing the function above based on token, mentioned below.
}, [token])

  const editBtn = (article) => {
    setEditArtcile(article)
  }


  // update an article after clicking the updated button without having to refresh the page. 
  const updatedInformation =(article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      }
      else {
        return myarticle;
      }
    })
    setArtciles(new_article)
  }


  // Inserting artilce form
  const articleForm = () => {
    setEditArtcile({title:'', description: ''})
  }

  const insertedInformation = (article) => {
    // getting all the articles and append the new article into it
    const new_article = [...articles, article]
    setArtciles(new_article)
  }


  // DELETE BUTTON
  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false
      }
      return true;
    })
    setArtciles(new_articles)
  }


  // LOGOUT BUTTON
  const logoutBtn = () => {
    removeToken(['mytoken'])
  }



  return (
    <div className="App">
      <div className="row">
        <div className = "col">
          <h2>Welcome to My Blog</h2>
        </div>


        {/* INSERT ARTICLE */}
        <div classname = "col">
          <button onClick = {articleForm} className= "btn btn-primary"> Insert New Artilce</button>
        </div>

        {/* LOG OUT */}
        <div classname = "col">
          <button onClick = {logoutBtn} className= "btn btn-primary"> Logout</button>
        </div>
      </div>
      <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn}/>

      {/* by default the artilce is null. if we have article return the function bellow and if not, return null */}
      {editArticle ? 
      <Form 
      article = {editArticle} updatedInformation = {updatedInformation} 
      insertedInformation = {insertedInformation}
      /> 
      : null }
    </div>
  );
}

export default App;
