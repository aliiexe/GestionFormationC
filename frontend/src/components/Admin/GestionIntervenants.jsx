import './Formateur.css'
import {useEffect, useRef, useState} from 'react'
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import CreateIntervenant from './CreateIntervenant';
import EditIntervenant from './EditIntervenant';
import { axiosclient } from '../../api/axiosClient'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
        


export default function GestionIntervenants() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const diplomes = [
        { name: "" },
        { name: "Baccalauréat Général" },
        { name: "Baccalauréat Technique" },
        { name: "Baccalauréat Professionnel" },
        { name: "Diplôme de Technicien (DT)" },
        { name: "Diplôme de Technicien Spécialisé (DTS)" },
        { name: "Diplôme Universitaire de Technologie (DUT)" },
        { name: "Brevet de Technicien Supérieur (BTS)" },
        { name: "Diplôme d'Études Universitaires Générales (DEUG)" },
        { name: "Diplôme de Licence (Licence Fondamentale)" },
        { name: "Licence Professionnelle" },
        { name: "Master" },
        { name: "Master Spécialisé" },
        { name: "Diplôme d'Ingénieur d'État" },
    ];

    const toast = useRef(null);

    const [selectedIntervenants, setSelectedIntervenants] = useState(null);
    const [editIntervenant, setEditIntervenant] = useState(null);
    const [etablissement,setEtablissement] = useState([]);
    const [intervenants,setIntervenants] = useState([]);
    const [intervenant,setIntervenant] = useState({
        matricule: '',
        nom: '',
        datenaissance: '',
        typeintervenant: '',
        etablissements_id: '',
        user_id: 1,
    });
    const [formValues, setFormValues] = useState(intervenant);
    
    const handleChange = (e, isEdit = false) => {
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditIntervenant({
                ...editIntervenant,
                [e.target.name]: value,
            });
        } else {
            setIntervenant({
                ...intervenant,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
        console.log(isEdit ? editIntervenant : intervenant);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosclient.post('/intervenant', intervenant).then((a) => {
            setVisible(false)
            console.log(a)
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'L&apos;intervenant est inséré avecs succès'
            });
            getIntervenants()
        })
        console.log(response)
    }

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer ce formateur ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedIntervenants.map(async (a) => {
                    const response = await axiosclient.delete(`/intervenant/${a.id}`).then((a) => {
                        console.log(a)
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'L&apos;intervenant est supprimé avec succès'
                        });
                        getIntervenants()
                    })
                    console.log(response)
                })
            },
            reject: () => {
                return;
            }
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const response = await axiosclient.put(`/intervenant/${editIntervenant.id}`, editIntervenant).then((a) => {
            setEditVisible(false);
            console.log(a);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'L&apos;intervenant  est modifié avec succès'
            });
            getIntervenants();
        });
        console.log(response);
    };

    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
    return (
        <div className='header'>
            <Button type="button" className='vider' icon="pi pi-filter-slash" label="Vider" outlined onClick={clearFilter} />
            <div style={{ display:'flex',gap:'12px'}}>
            <div style={{ display:'flex',gap:'10px'}}>
              {selectedIntervenants && selectedIntervenants.length > 0 && (
                <Button className='btn1' icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
              )}
              {selectedIntervenants && selectedIntervenants.length === 1 && (
                <Button className='btn2' icon="pi pi-pencil" onClick={() => { setEditIntervenant(selectedIntervenants[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
              )}
            </div>
            <IconField iconPosition="left">
                <InputText className='search' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche" />
            </IconField>
            </div>
        </div>
    );
};

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      setGlobalFilterValue(value);
  };

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const getIntervenants = () => {
        axiosclient.get('/intervenant').then((a) => {
            setIntervenants(a.data)
            console.log(a.data)
            setLoading(false)
        })
    }

    const getEtablissements = () => {
        axiosclient.get('/etablissement').then((a) => {
            setEtablissement(a.data)
            console.log(a.data)
        })
    }

    useEffect(() => {
        axiosclient.get('/sanctum/csrf-cookie')
        getIntervenants()
        getEtablissements() 
    }, []);

    const header = renderHeader();

    return (
        <>
            <div className="card flex justify-content-center">
                <Button className='btn' label="Ajouter un intervenant" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                <Dialog header="Ajout d'un intervenant" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <CreateIntervenant intervenant={intervenant} handleChange={handleChange} etablissement={etablissement} handleSubmit={handleSubmit} diplomes={diplomes}/>
                </Dialog>
                <Dialog header="Modifier un intervenant" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
                    <EditIntervenant setIntervenant={setEditIntervenant} intervenant={editIntervenant} etablissement={etablissement} handleChange={(e) => handleChange(e, true)} handleEdit={handleEdit} diplomes={diplomes} />
                </Dialog>
                <div className="container">
                  <DataTable 
                    value={intervenants}  
                    paginator rows={10} 
                    dataKey="id" 
                    scrollable scrollHeight="64vh" 
                    sortMode="multiple" 
                    tableStyle={{ minWidth: '50rem' }} 
                    className='formateursTable'
                    emptyMessage="Pas de formateurs trouvées."
                    header={header}
                    loading={loading}
                    globalFilter={globalFilterValue}
                    globalFilterFields={['nom', 'datenaissance', 'matricule', 'typeintervenant', 'etablissement_id']}
                    selectionMode="multiple"
                    selection={selectedIntervenants} 
                    onSelectionChange={e => setSelectedIntervenants(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="matricule" header="Matricule"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="nom" header="Nom"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="datenaissance" header="Date Naissance"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="typeintervenant" header="Type Intervenant"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="etablissements_id" header="Etablissement"></Column>
                </DataTable>
                </div>
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>

    )
}
