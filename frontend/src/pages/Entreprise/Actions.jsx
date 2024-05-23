import { useState,useEffect } from "react"
import { axiosclient } from "../../api/axiosClient"
import { Button, Form, Input, Radio, Select, List, message } from 'antd';
const { TextArea } = Input;

export default function Actions() {
    const [etablissements, setEtablissements] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [intervenants, setIntervenants] = useState([]);
    const [themes, setThemes] = useState([]);
    const [dateDebutPrev, setDateDebutPrev] = useState('');
    const [dateFinPrev, setDateFinPrev] = useState('');
    const [nbParticipants, setNbParticipants] = useState('');

    const getEtablissements = async () => {
        const response = await axiosclient.get('/etablissements');
        setEtablissements(response.data);
    }

    const getEntreprises = async () => {
        const response = await axiosclient.get('/entreprise');
        setEntreprises(response.data);
    }

    const getIntervenants = async () => {
        const response = await axiosclient.get('/intervenant');
        setIntervenants(response.data);
    }

    const getThemes = async () => {
        const response = await axiosclient.get('/formation');
        setThemes(response.data);
    }

    const createAction= async (values) => {
        const formData = new FormData();
        formData.append('etablissements_id', values.etablissements_id);
        formData.append('entreprises_id', values.entreprises_id);
        formData.append('intervenants_id', values.intervenants_id);
        formData.append('themes_id', values.themes_id);
        formData.append('date_debut_prev', values.date_debut_prev);
        formData.append('date_fin_prev', values.date_fin_prev);
        formData.append('nbparticipants', values.nbparticipants);
        const response = await axiosclient.post('/action', formData).then((response) => {
            message.success('Action créée avec succès.');
            console.log(response);
        }).catch((error) => {
            message.error('Il y a eu une erreur.');
            console.error('There was an error submitting the form!', error);
        });
        console.log(response);
    }

    useEffect(() => {
        getEtablissements();
        getEntreprises();
        getIntervenants();
        getThemes();
    }, []);
  return (
    <div>
        <Form
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 14,
            }}
            layout="horizontal"
            style={{maxWidth: 600}}
        >
            <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid green", marginBottom: "40px" }}>Demander une formation</h3>
            <Form.Item label="Entreprise" name="entreprises_id" rules={[{ required: true, message: "Veuillez sélectionner un établissement" }]}>
                <Select placeholder="Sélectionner une entreprise">
                    {entreprises.map((entreprise) => (
                        <Select.Option key={entreprise.id} value={entreprise.id}>
                            {entreprise.nom}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Etablissement" name="etablissements_id" rules={[{ required: true, message: "Veuillez sélectionner un établissement" }]}>
                <Select placeholder="Sélectionner un établissement">
                    {etablissements.map((etablissement) => (
                        <Select.Option key={etablissement.id} value={etablissement.id}>
                            {etablissement.nom_efp}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Intervenant" name="intervenants_id" rules={[{ required: true, message: "Veuillez sélectionner un intervenant" }]}>
                <Select placeholder="Sélectionner un intervenant">
                    {intervenants.map((intervenant) => (
                        <Select.Option key={intervenant.id} value={intervenant.id}>
                            {intervenant.nom}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Theme" name="themes_id" rules={[{ required: true, message: "Veuillez sélectionner un theme" }]}>
                <Select placeholder="Sélectionner un theme">
                    {themes.map((theme) => (
                        <Select.Option key={theme.id} value={theme.id}>
                            {theme.intitule_theme}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Date de début prévue" name="date_debut_prev" rules={[{ required: true, message: "Veuillez entrer la date de début prévue" }]}>
                <Input type="date" />
            </Form.Item>
            <Form.Item label="Date de fin prévue" name="date_fin_prev" rules={[{ required: true, message: "Veuillez entrer la date de fin prévue" }]}>
                <Input type="date" />
            </Form.Item>
            <Form.Item label="Nombre de participants" name="nbparticipants" rules={[{ required: true, message: "Veuillez entrer le nombre de participants" }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit" onClick={createAction}>
                    Envoyer
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
