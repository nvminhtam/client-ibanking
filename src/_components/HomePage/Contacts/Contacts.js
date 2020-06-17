import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

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
      toggleEdit;
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

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
          title: 'Tên người hưởng',
          dataIndex: 'name',
          key: 'name',
          editable: true,
      },
      {
        title: 'Tên gợi nhớ',
        dataIndex: 'reminiscent',
        key: 'reminiscent',
     
    
      },
      {
          title: 'Số tài khoản',
          dataIndex: 'accnumber',
          key: 'accnumber',
          editable: true,
      },
      {
          title: 'Ngân hàng',
          dataIndex: 'bank',
          key: 'bank',
          editable: true,
      },
      {
          title: 'Sửa',
          dataIndex: 'edit',
          key: 'edit',
          editable: true,
      },
      {
          title: 'Xóa',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, record) =>
    this.state.dataSource.length >= 1 ? (
      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
        <a>Delete</a>
      </Popconfirm>
    ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
   
  }
 handleDelete (key){
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };

  handleAdd () {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave ( row) {
    console.log(this.state);
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };
 

  render() {
    const { dataSource } = this.state;
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
          key: col.key,
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    accountOwner: state.users.accountOwner,
    accountBeneficiary: state.users.accountBeneficiary,
    listAccountBeneficiary: state.users.accountBeneficiarys
  };
}

const mapDispatchToProps = (dispatch) => ({
  getAccount: () => dispatch(userActions.getAccount()),
  getBeneficiaryAccount: (accNumber) => dispatch(userActions.getBeneficiaryAccount(accNumber)),
  getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
});

const connectedMyAccountPage = connect(mapStateToProps, mapDispatchToProps)(Contacts);
export { connectedMyAccountPage as Contacts }

