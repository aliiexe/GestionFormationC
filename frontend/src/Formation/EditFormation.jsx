export default function EditRole({handleChange, handleEdit, role}) {
  return (
    <div>
          <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='name' className="label">name</label>
                <input type="text" id='name' value={role?.name} name='name' onChange={handleChange} className="formInput" disabled/>
            </div>
            <div className="maindiv2">
                <div className="maindiv2">
                    <label htmlFor='nom' className="label">Nom</label>
                    <input type="text" id='nom' value={role?.nom} name='nom' onChange={handleChange} className="formInput"/>
                </div>
            </div>
            </div>
          <button type="submit" onClick={handleEdit} className="add-button">Ajouter</button>
      </div>
  )
}
