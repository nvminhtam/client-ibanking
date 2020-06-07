import React, { useState } from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    Row,
    Col,
    Button,
    AutoComplete,
    InputNumber
} from 'antd'

const { TextArea } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const TransferInfo = ({ value = {} }) => {
    const [form] = Form.useForm();
    const [number, setNumber] = useState(1);
    const [charge, setCharge] = useState(1);

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }

    const onChangeRadio = e => {
        console.log("a " + charge);

        setCharge(e.target.value)
        console.log(charge);
    }

    const triggerChange = changedValue => {
        console.log("changedValue");
        console.log(changedValue);
        if (onChange) {
            onChange({
                number,
                ...changedValue,
            });
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 100,
                }}
            >
                <Option value="VND">VND</Option>
                <Option value="USA">$</Option>
            </Select>
        </Form.Item>
    );

    const onChange = value => {
        console.log('changed', value);
        // setValue(1)

    }

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const onNumberChange = e => {
        const newNumber = parseInt(e.target.value || 0, 10);

        if (Number.isNaN(number)) {
            console.log(newNumber);
            return;
        }

        if (!('number' in value)) {
            setNumber(newNumber);
        }

        triggerChange({
            number: newNumber,
        });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: 'VND',
            }}
            scrollToFirstError
        >



            <Form.Item label="Account Number" className="border-bottom border-light p-3"
            //    name="accountNumber"
            // rules={[
            //     {
            //         required: true,
            //         message: 'Please input your phone number!',
            //     },
            // ]}
            >
                <Input
                    type="text"
                    value={value.number || number}
                    onChange={onNumberChange}
                />
            </Form.Item>
            <Form.Item label="Beneficiary" className="border-bottom border-light p-3">
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Form.Item>

            {/* <Form.Item label="Money">
                    <InputNumber
                        defaultValue={1000}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={onChange}
                    />
                </Form.Item> */}

            <Form.Item className="border-bottom border-light p-3"
                name="paymentAmount"
                label="Payment amount"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Payment amount!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item label="Your note" className="border-bottom border-light p-3">
                <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
            </Form.Item>

            {/* <Form.Item label="Reciever">
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item> */}

            <Form.Item onChange={onChangeRadio} label="Charges *" className="border-bottom border-light p-3">
                <Radio.Group value={charge}>
                    <Radio style={radioStyle} value={1}>
                        All charges to my account
        </Radio>
                    <Radio style={radioStyle} value={2}>
                        All charges to beneficiary's account
        </Radio>
                </Radio.Group>
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
        </Button>
            </Form.Item>
        </Form>
    );
};

export { TransferInfo }

