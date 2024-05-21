export default function CreateFormation({formation,handleChange, handleSubmit}) {
    return (
      <div>
          <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='intitule_theme' className="label">Libelle</label>
                <input type="text" id='intitule_theme' name='intitule_theme' onChange={handleChange} className="formInput" disabled/>
            </div>
            <div className="maindiv2">
                <div className="maindiv2">
                    <label htmlFor='duree_formation' className="label">Durée formation</label>
                    <input type="text" id='duree_formation' name='duree_formation' onChange={handleChange} className="formInput"/>
                </div>
            </div>
          </div>
          <div className="maindiv2-container">
            <div className="maindiv2">
                <label htmlFor='status' className="label">Status</label>
                <input type="text" id='status' name='status' onChange={handleChange} className="formInput" disabled/>
            </div>
            <div className="maindiv2">
                  <label htmlFor='idEtablissement' className="label">Etablissement</label>
                  <select id='idEtablissement' name='etablissements_id' onChange={handleChange} className="formInput">
                      <option disabled>Selectionnez un etablissement</option>
                      <option ></option>
                      {formation.map((a) => {
                          return (<option key={a.id} value={a.id}>{a.nom_efp}</option>)
                      })}
                  </select>
              </div>
          </div>
              <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
      </div>
    )
  }