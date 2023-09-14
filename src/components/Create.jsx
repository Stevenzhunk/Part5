import React, { useState } from 'react'

const Create = ({title, author, url, onSumitCreate, setTitle, setAuthor, setUrl,logvisibility,handleVisibleTrue,handleVisibleFalse }) => {
    const hideWhenVisible = { display: logvisibility ? 'none' : '' }
    const showWhenVisible = { display: logvisibility ? '' : 'none' }
  return (
    <div>
      <div style={hideWhenVisible}><h1>Create a new Blog</h1>
      <button onClick={handleVisibleTrue}>New Note</button></div>
      
      <div style={showWhenVisible} >
        <form onSubmit={onSumitCreate}>
          <div>
            title
          <input 
          type="text" 
          name="title" 
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
          </div>
          <div>
          author
          <input 
          type="text" 
          name="author" 
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          />
          </div>
          <div>
            url
          <input 
          type="text" 
          name="url" 
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          />
          </div>
        <button type="sumit">Create Blog</button>
        <button onClick={handleVisibleFalse}>cancel</button>
        </form>
      </div>
      <br/>
      <br/>
    </div>
  )
}

export default Create