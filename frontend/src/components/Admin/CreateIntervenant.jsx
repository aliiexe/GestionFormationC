export default function CreateIntervenant({intervenant, etablissement, handleChange, handleSubmit, situationsFamiliales,diplomes}) {
    return (
      <div>
          <div className="maindiv2">
              <label htmlFor='matricule' className="label">Matricule</label>
              <input type="text" id='matricule' name='matricule' onChange={handleChange} className="formInput"/>
          </div>
          <div className="maindiv2">
              <div className="maindiv2">
                  <label htmlFor='nom' className="label">Nom</label>
                  <input type="text" id='nom' name='nom' onChange={handleChange} className="formInput"/>
              </div>
          </div>
              <div className="maindiv2">
                  <label htmlFor='datenaissance' className="label">Date de naissance</label>
                  <input type="date" id='datenaissance' name='datenaissance' onChange={handleChange} className="formInput"/>
              </div>
          <div className="maindiv2-container">
              <div className="maindiv2">
                  <label htmlFor='type_intervenant' className="label">Type d&apos;intervenant</label>
                  <select id='type_intervenant' name='typeintervenant' onChange={handleChange} className="formInput">
                      <option disabled>Selectionnez un type</option>
                      <option value='interne'>Interne</option>
                      <option value='externe'>Externe</option>
                  </select>
              </div>
              <div className="maindiv2">
                  <label htmlFor='idEtablissement' className="label">Etablissement</label>
                  <select id='idEtablissement' name='etablissements_id' onChange={handleChange} className="formInput">
                      <option disabled>Selectionnez un etablissement</option>
                      <option ></option>
                      {etablissement.map((a) => {
                          return (<option key={a.id} value={a.id}>{a.nom_efp}</option>)
                      })}
                  </select>
              </div>
          </div>
              <button type="submit" onClick={handleSubmit} className="add-button">Ajouter</button>
      </div>
    )
  }
  