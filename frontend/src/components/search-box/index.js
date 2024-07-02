import React, { useState } from "react";
import { Input, Modal } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { xmlTemplateActions } from "store/actions/xml.template.actions";
import { predict } from "services/data.services";
import CodeParameterEditor from "./components/CodeParameterEditor";


const { Search } = Input;

const suffix = (<AudioOutlined style={{ fontSize: 16, color: '#1677ff', }} />);

const SearchBox = (props) => {
    const [state, setState] = useState({ modalVisible: false, predictedCode: {} });

    const callPredict = (description, params) => new Promise((resolve, reject) => {
        predict(description, params).then(response => {
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });

    const updatePredictCode = (predictedCode) => {
        setState({ predictedCode, modalVisible: true })
    }

    const handleModalOk = () => {
        props.addItem(state.predictedCode);
        setState({ ...state, modalVisible: false });
    };
    const handleModalCancel = () => {
        setState({ ...state, modalVisible: false });
    };

    const onSearch = (value) => {
        callPredict(value).then(response => {
            const { predictedCode } = response;
            setState({ predictedCode, modalVisible: true })
        });
    }

    return (<>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
        />
        <Modal width={10000} style={{ top: 20 }} title="Entire Parameters" open={state.modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
            <CodeParameterEditor updatePredictCode={updatePredictCode} predictedCode={state.predictedCode} />
        </Modal>
    </>);
}

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(null, mapDispatchToProps)(SearchBox);

