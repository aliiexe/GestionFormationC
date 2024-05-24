import { useEffect, useState } from "react";
import { axiosclient } from "../../api/axiosClient";
import { Space, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function Actions() {
    const [actions, setActions] = useState([]);

    const getActions = async () => {
        try {
            const response = await axiosclient.get('/action');
            setActions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching actions:", error);
        }
    };

    useEffect(() => {
        getActions();
    }, []);

    const approveAction = async (id) => {
        try {
            const response = await axiosclient.put(`/action/${id}`, { status: 1 });
            console.log(response);
            getActions();
        } catch (error) {
            console.error("Error approving action:", error);
        }
    };

    const desapproveAction = async (id) => {
        try {
            const response = await axiosclient.delete(`/action/${id}`);
            console.log(response);
            getActions();
        } catch (error) {
            console.error("Error disapproving action:", error);
        }
    };

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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a><CheckCircleOutlined onClick={() => approveAction(record.id)} /></a>
                    <a><CloseCircleOutlined onClick={() => desapproveAction(record.id)} /></a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={actions} rowKey="id" />
        </div>
    );
}