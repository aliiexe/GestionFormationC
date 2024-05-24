import { useEffect, useState } from "react";
import { axiosclient } from "../../api/axiosClient";
import { Space, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import * as jwt_decode from 'jwt-decode';

export default function MesActions() {
    const [actions, setActions] = useState([]);

    const getActions = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwt_decode(token);
            const userId = decoded.id;
    
            const response = await axiosclient.get(`/action/user/${userId}`);
            setActions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching actions:", error);
        }
    };

    useEffect(() => {
        getActions();
    }, []);

    const columns = [
        {
            title: 'Entreprise',
            dataIndex: 'entreprises',
            key: 'entreprise',
            render: (entreprises) => <a>{entreprises?.nom}</a>,
        },
        {
            title: 'Thème',
            dataIndex: 'themes',
            key: 'theme',
            render: (themes) => <a>{themes?.intitule_theme}</a>,
        },
        {
            title: 'Intervenant',
            dataIndex: 'intervenants',
            key: 'intervenant',
            render: (intervenants) => <a>{intervenants?.nom}</a>,
        },
        {
            title: 'Établissement',
            dataIndex: 'etablissements',
            key: 'etablissement',
            render: (etablissements) => <a>{etablissements?.nom_efp}</a>,
        }
    ];

    return (
        <div>
            <Table columns={columns} dataSource={actions} rowKey="id" />
        </div>
    );
}