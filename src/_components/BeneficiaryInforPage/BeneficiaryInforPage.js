import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/user.actions';


const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

class BeneficiaryInforPage extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: 'name',
                dataIndex: 'beneficiary_name',
                width: '30%',
                editable: true,
            },
            {
                title: 'account number',
                dataIndex: 'beneficiary_account',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.listAccountBeneficiary.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            listAccountBeneficiary: [
                {
                    key: 0,
                    beneficiary_name: "a",
                    beneficiary_account: 0
                },
                {
                    key: 1,
                    beneficiary_name: "b",
                    beneficiary_account: 1
                }
            ],
            isloaded: false,
            count: 4,
            visible: false
        };

        this.handleSave = this.handleSave.bind(this)
    }



    showModal() {
        this.setState({
            visible: true,
        });
    };

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        const { getListBeneficiaryAccount } = this.props
        getListBeneficiaryAccount();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.listAccountBeneficiary && nextProps.listAccountBeneficiary !== prevState.listAccountBeneficiary && !prevState.isloaded
            ? {
                ...prevState,
                listAccountBeneficiary: nextProps.listAccountBeneficiary,
                isloaded: true
            }
            : {
                ...prevState
            }
    }
    handleDelete(key) {
        const listAccountBeneficiary = [...this.state.listAccountBeneficiary];
        let deletedRow = listAccountBeneficiary.filter(item => item.key === key)
        // deletedRow = { ...deletedRow, type: 2 }
        this.setState({
            listAccountBeneficiary: {
                ...listAccountBeneficiary.filter(item => item.key !== key)

            },
        });
    };

    handleSave(row) {
        const newRow = { ...row, type: 1 }
        const newData = [...this.state.listAccountBeneficiary];
        const index = newData.findIndex(item => newRow.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...newRow });
        this.setState({
            listAccountBeneficiary: newData,
        });
    };

    handleAdd() {
        this.setState({
            visible: true,
        });
        const { count, listAccountBeneficiary } = this.state;
        const newData = {
            key: count,
            beneficiary_name: `Edward King ${count}`,
            beneficiary_account: 32,
            type: 2
        };

        this.setState({
            listAccountBeneficiary: [...listAccountBeneficiary, newData],
            count: count + 1,
        });

    };

    render() {

        // const { listAccountBeneficiary } = this.props

        const { listAccountBeneficiary } = this.state;
        console.log(this.state);
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={() => this.handleAdd()}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a beneficiary
                        </Button>
                <div>
                    {/* <Button type="primary" onClick={this.handleAdd()}>
                        Open Modal
        </Button> */}
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={() => this.setState({ visible: false })}
                        onCancel={() => this.setState({ visible: false })}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={listAccountBeneficiary}
                    columns={columns}
                />
            </div>
        );
    }



}


function mapStateToProps(state) {
    return {
        listAccountBeneficiary: state.users.accountBeneficiarys
    };
}

const mapDispatchToProps = (dispatch) => ({
    getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
});


const connectedBeneficiaryInforPage = connect(mapStateToProps, mapDispatchToProps)(BeneficiaryInforPage);


export { connectedBeneficiaryInforPage as BeneficiaryInforPage }