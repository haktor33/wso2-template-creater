import React, { useEffect, useState } from "react";
import { Card, Col, Form, Input, Row, Button } from 'antd';
import XMLViewer from 'react-xml-viewer'
import { getByIndex } from "services/data.services";

const CodeParameterEditor = (props) => {
	const [state, setState] = useState({ predictedCode: {} });

	useEffect(() => {
		setState({ ...state, predictedCode: props.predictedCode });
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [props.predictedCode.index]);

	const onFinish = (values) => {
		const { predictedCode } = state;
		getByIndex(predictedCode.index, values).then(response => {
			const { predictedCode } = response;
			props.updatePredictCode(predictedCode);
			setState({ ...state, predictedCode, })
		});
	}

	const getFields = (predictedCode) => {
		const formFields = predictedCode.parameters?.split(",")?.map(paramName => {
			return (
				<Form.Item key={paramName} label={paramName}>
					<Form.Item style={{ width: '100%', }} name={paramName} rules={[{ required: true },]} hasFeedback validateTrigger="onBlur"                        >
						<Input placeholder={paramName} />
					</Form.Item>
				</Form.Item>
			)
		});
		return formFields;
	}

	const getViewer = () => {
		const { code } = state.predictedCode;
		if (!code)
			return null;
		else if (!code.startsWith("<") && !code.endsWith(">")) {
			const code2 = `12313123`;
			return <pre>{code}</pre>
		} else {
			return <XMLViewer xml={state.predictedCode.code} />
		}

	}

	return (
		<Row gutter={[16, 16]}>
			<Col md={24} lg={8} title={state.predictedCode.name}>
				<Card size="small" hoverable title="Edit Code">
					<Form name="trigger" onFinish={onFinish} layout="vertical" autoComplete="off">
						{getFields(state.predictedCode)}
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
					{getViewer()}
				</Card>
			</Col>
		</Row>
	)

}

export default CodeParameterEditor;

