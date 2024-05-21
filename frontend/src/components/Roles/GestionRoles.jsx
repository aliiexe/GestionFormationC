import './Formateur.css'
import {useEffect, useRef, useState} from 'react'
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Toast} from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import CreateRole from './CreateRole';
import EditRole from './EditRole';
import { axiosclient } from '../../api/axiosClient'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
        


export default function Gestionroles() {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const toast = useRef(null);

    const [selectedRoles, setSelectedRoles] = useState(null);
    const [editRole, setEditRole] = useState(null);
    const [roles,setRoles] = useState([]);
    const [role,setRole] = useState({
        name: '',
        guard_name: ''
    });
    const [formValues, setFormValues] = useState(role);
    
    const handleChange = (e, isEdit = false) => {
        const value = e.target.type === 'radio' ? (e.target.checked ? e.target.value : '') : e.target.value;
        if (isEdit) {
            setEditRole({
                ...editRole,
                [e.target.name]: value,
            });
        } else {
            setRole({
                ...role,
                [e.target.name]: value,
            });
            setFormValues({
                ...formValues,
                [e.target.name]: value,
            });
        }
        console.log(isEdit ? editRole : role);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosclient.post('/role', role).then((a) => {
            setVisible(false)
            console.log(a)
            toast.current.show({
                severity: 'success',
                summary: 'Succès',
                detail: 'L&apos;role est inséré avecs succès'
            });
            getRoles()
        })
        console.log(response)
    }

    const handleDelete = () => {
        confirmDialog({
            message: 'Êtes-vous sûre de vouloir supprimer ce role ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                selectedRoles.map(async (a) => {
                    const response = await axiosclient.delete(`/role/${a.id}`).then((a) => {
                        console.log(a)
                        toast.current.show({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Le role est supprimé avec succès'
                        });
                        getRoles()
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
            getRoles();
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
              {selectedRoles && selectedRoles.length > 0 && (
                <Button className='btn1' icon="pi pi-times" onClick={handleDelete} severity="danger" aria-label="Cancel" />
              )}
              {selectedRoles && selectedRoles.length === 1 && (
                <Button className='btn2' icon="pi pi-pencil" onClick={() => { setEditRole(selectedRoles[0]); setEditVisible(true); }} severity="warning" aria-label="Notification" />
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

    const getRoles = () => {
        axiosclient.get('/role').then((a) => {
            setRoles(a.data)
            console.log(a.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        axiosclient.get('/sanctum/csrf-cookie')
        getRoles()
    }, []);

    const header = renderHeader();

    return (
        <>
            <div className="card flex justify-content-center">
                <Button className='btn' label="Ajouter un intervenant" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                <Dialog header="Ajout d'un intervenant" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}>
                    <CreateRole role={role} handleChange={handleChange} handleSubmit={handleSubmit}/>
                </Dialog>
                <Dialog header="Modifier un formateur" visible={editVisible} style={{width: '50vw'}} onHide={() => setEditVisible(false)}>
                    <EditRole setRole={setEditRole} role={editRole} handleChange={(e) => handleChange(e, true)} handleEdit={handleEdit} />
                </Dialog>
                <div className="container">
                  <DataTable 
                    value={roles}  
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
                    globalFilterFields={['name', 'guard_name']}
                    selectionMode="multiple"
                    selection={selectedRoles} 
                    onSelectionChange={e => setSelectedRoles(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="name" header="Name"></Column>
                    <Column sortable style={{ minWidth: '15rem' }} field="guard_name" header="Guard name"></Column>
                </DataTable>
                </div>
                <Toast ref={toast}/>
                <ConfirmDialog acceptLabel="Oui" rejectLabel="Non" />
            </div>
        </>

    )
}
