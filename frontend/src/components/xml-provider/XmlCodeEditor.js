import React, { useEffect, useState } from "react";
import { Space, Select, Card, Col, Form, Input, Row, Button } from 'antd';
import { connect } from "react-redux";
import XMLViewer from 'react-xml-viewer'
import { xmlTemplateActions } from "store/actions/xml.template.actions";
import { searchType } from "constants/xml.constants";

const XmlCodeEditor = (props) => {
    const [state, setState] = useState({ xmlProps: {} });

    useEffect(() => {
        setState({ ...state, xmlProps: props.xmlProps });
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [props.xmlProps.key]);

    const findByAttributeName = (childNodes, attrName) => {
        for (var i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];
            if (node.nodeType !== 3 && node.getAttribute("name") === attrName) {
                return node;
            }
        }
    }

    const onFinish = (values) => {
        const { xmlProps } = state;
        const xmlDoc = new DOMParser().parseFromString("<main>" + xmlProps.code + "</main>", "application/xml");
        var childNodes = xmlDoc.childNodes[0].childNodes;
        Object.keys(values).forEach(key => {
            const item = values[key];
            const node = findByAttributeName(childNodes, key);
            node.setAttribute(item.type, item.value);
        });
        xmlProps.code = xmlDoc.childNodes[0].innerHTML;
        setState({ ...state });
    }

    const getFields = (xmlProps) => {
        const formFields = xmlProps.properties?.map(item => {
            return (
                <Form.Item key={item.name} label={item.name}>
                    <Space.Compact>
                        <Form.Item name={[item.name, 'type']}>
                            <Select style={{ width: '120px', }} placeholder="Select Type">
                                {Object.keys(searchType).map(key => <Select.Option key={key} value={key}>{searchType[key]}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ width: '100%', }} name={[item.name, 'value']} rules={[{ required: true },]} hasFeedback validateTrigger="onBlur"                        >
                            <Input placeholder={item.name} />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
            )
        });
        return formFields;
    }

    return (
        <Row gutter={[16, 16]}>
            <Col md={24} lg={8} title={state.xmlProps.title}>
                <Card size="small" hoverable title="Edit Code">
                    <Form name="trigger" labelCol={{ span: 6, }} wrapperCol={{ span: 18, }} onFinish={onFinish} layout="horizontal" autoComplete="off">
                        {getFields(state.xmlProps)}
                        <div style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Col>
            <Col md={24} lg={16}>
                <Card size="small" hoverable title="Preview">
                    <XMLViewer xml={state.xmlProps.code} />
                </Card>
            </Col>
        </Row>
    )

}

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(null, mapDispatchToProps)(XmlCodeEditor);

