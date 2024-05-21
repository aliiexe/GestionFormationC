import './Formateur.css'
import {useEffect, useRef, useState} from 'react'
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import CreateFormation from './CreateFormation';
import EditFormation from './EditFormation';
import { axiosclient } from '../api/axiosClient';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
        


export default function GestionFormations() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const toast = useRef(null);

    const [selectedFormations, setSelectedFormations] = useState(null);
    const [editRole, setEditRole] = useState(null);
    const [formations,setFormations] = useState([]);
    const [formation,setFormation] = useState({
        intitule: '',
        duree_theme: '',
        status: '',
        domaine_id: '',
    });
    const [formValues, setFormValues] = useState(formation);
    
    const handleChange = (e, isEdit = false) => {
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditRole({
                ...editRole,
                [e.target.name]: value,
            });
        } else {
            setFormation({
                ...formation,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
        console.log(isEdit ? editRole : formation);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosclient.post('/formation', formation).then((a) => {
            setVisible(false)
            console.log(a)
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'La formation est insérée avecs succès'
            });
            getFormations()
        })
        console.log(response)
    }

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer cette formation ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedFormations.map(async (a) => {
                    const response = await axiosclient.delete(`/role/${a.id}`).then((a) => {
                        console.log(a)
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Le role est supprimé avec succès'
                        });
                        getFormations()
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
        const response = await axiosclient.put(`/role/${editRole.id}`, editRole).then((a) => {
            setEditVisible(false);
            console.log(a);
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le role  est modifié avec succès'
            });
            getFormations();
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
              {selectedFormations && selectedFormations.length > 0 && (
                <Button className='btn1' icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
              )}
              {selectedFormations && selectedFormations.length === 1 && (
                <Button className='btn2' icon="pi pi-pencil" onClick={() => { setEditRole(selectedFormations[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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

    const getFormations = () => {
        axiosclient.get('/role').then((a) => {
            setFormations(a.data)
            console.log(a.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        axiosclient.get('/sanctum/csrf-cookie')
        getFormations()
    }, []);

    const header = renderHeader();

    return (
        <>
            <div className="card flex justify-content-center">
                <Button className='btn' label="Ajouter une formation" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                <Dialog header="Ajout d'un intervenant" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <CreateFormation formation={formation} handleChange={handleChange} handleSubmit={handleSubmit}/>
                </Dialog>
                <Dialog header="Modifier un formateur" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
                    {/* <EditFormation formation={formation} setRole={setEditRole} role={editRole} handleChange={(e) => handleChange(e, true)} handleEdit={handleEdit} /> */}
                </Dialog>
                <div className="container">
                  <DataTable 
                    value={formations}  
                    paginator rows={10} 
                    dataKey="id" 
                    scrollable scrollHeight="64vh" 
                    sortMode="multiple" 
                    tableStyle={{ minWidth: '50rem' }} 
                    className='formateursTable'
                    emptyMessage="Pas de formations trouvées."
                    header={header}
                    loading={loading}
                    globalFilter={globalFilterValue}
                    globalFilterFields={['intitule_theme', 'guard_name']}
                    selectionMode="multiple"
                    selection={selectedFormations} 
                    onSelectionChange={e => setSelectedFormations(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="intitule_theme" header="Libelle"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="duree_formation" header="Durée formation"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="status" header="Status"></Column>
                </DataTable>
                </div>
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>

    )
}
