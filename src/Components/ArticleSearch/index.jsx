import React from 'react';


const ArticleSearch = () => {
    /*const context = React.useContext(ArticleContext);*/

    return (
        <form>
      <label>Enter the article name:
        <input className='w-80 h-6 px-2'
          type="text" 
          placeholder='Enter the title of the article'
        />
      </label>
    </form>
    )
}

export default ArticleSearch;