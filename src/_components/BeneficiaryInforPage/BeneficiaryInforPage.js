import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                            <a className="text-danger"><DeleteOutlined /> Delete  </a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            listAccountBeneficiary: [],
            isloaded: false,
            count: 0,
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
        // const { getListBeneficiaryAccount } = this.props
        // getListBeneficiaryAccount();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        return nextProps.users.accountBeneficiarys && nextProps.users.accountBeneficiarys !== prevState.listAccountBeneficiary && !prevState.isloaded
            ? {
                ...prevState,
                listAccountBeneficiary: nextProps.users.accountBeneficiarys,
                isloaded: true,
                count: nextProps.users.accountBeneficiarys.length + 1
            }
            : {
                ...prevState
            }
    }
    handleDelete(row) {
        console.log(row);
        const newRow = { ...row, type: "del" }
        const newData = [...this.state.listAccountBeneficiary];
        const index = newData.findIndex(item => newRow.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...newRow });
        this.setState({
            listAccountBeneficiary: newData,
        });
    };

    handleSave(row) {
        const newRow = { ...row, type: "update" }
        const newData = [...this.state.listAccountBeneficiary];
        const index = newData.findIndex(item => newRow.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...newRow });
        this.setState({
            listAccountBeneficiary: newData,
        });
    };


    render() {
        console.log(this.props.users)

        const { listAccountBeneficiary } = this.state;
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

        const onFinish = values => {
            const { addBeneficiary } = this.props
            addBeneficiary({
                beneficiary_account: values.accountnumber,
                name: values.remindname || ''
            })

            if (!this.props.error === undefined) {
                const { count, listAccountBeneficiary } = this.state;
                const newData = {
                    key: count,
                    beneficiary_name: values.remindname || "Click here to change name",
                    beneficiary_account: values.accountnumber,
                    type: "add"
                };

                this.setState({
                    listAccountBeneficiary: [...listAccountBeneficiary, newData],
                    count: count + 1,
                    visible: false
                });
            }
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        console.log(this.props.users)

        return (
            <div>
                <Button
                    onClick={() => this.setState({ visible: true })}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a beneficiary
                        </Button>
                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={() => this.setState({ visible: false })}
                        onCancel={() => this.setState({ visible: false })}
                    >
                        {this.props.addError && <div className="text-danger">{this.props.addError}</div>}
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="remindname"
                            // rules={[{ required: true, message: 'Please input beneficiary name!' }]}
                            >
                                <Input placeholder="Remind Name" />
                            </Form.Item>

                            <Form.Item
                                name="accountnumber"
                                rules={[{ required: true, message: 'Please input beneficiary account number!' }]}
                            >
                                <Input placeholder="beneficiary account number" />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Submit
        </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={listAccountBeneficiary.filter(item => item.type !== "del")}
                    columns={columns}
                />
                <Button type="primary" className="float-right" onClick={() => this.props.updateListBeneficiaryInfo(this.state.listAccountBeneficiary)}>Save Changes</Button>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        // listAccountBeneficiary: state.users.accountBeneficiarys,
        beneficiaryAccount: state.users.beneficiaryAccount,
        // success: state.users.success,
        // error: state.users.error,
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => ({
    addBeneficiary: (beneficiaryInfo) => dispatch(userActions.addBeneficiary(beneficiaryInfo)),
    updateListBeneficiaryInfo: (listInfor) => dispatch(userActions.updateListBeneficiaryInfo(listInfor))
});


const connectedBeneficiaryInforPage = connect(mapStateToProps, mapDispatchToProps)(BeneficiaryInforPage);


export { connectedBeneficiaryInforPage as BeneficiaryInforPage }