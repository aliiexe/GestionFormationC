export default function CreateRole({handleChange, handleSubmit}) {
    return (
      <div>
          <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='name' className="label">Nom</label>
                <input type="text" id='name' name='name' onChange={handleChange} className="formInput" disabled/>
            </div>
            <div className="maindiv2">
                <div className="maindiv2">
                    <label htmlFor='nom' className="label">Guard name</label>
                    <input type="text" id='nom' name='guard_name' onChange={handleChange} className="formInput"/>
                </div>
            </div>
          </div>
              <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
      </div>
    )
  }