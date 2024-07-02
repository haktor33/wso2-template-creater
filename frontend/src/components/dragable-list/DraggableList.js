import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Alert, Space, Modal, Button } from "antd";
import { AliyunOutlined, EditOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { xmlTemplateActions } from "store/actions/xml.template.actions";
import XmlCodeEditor from "components/xml-provider/XmlCodeEditor";

const DraggableList = (props) => {
    const [state, setState] = useState({ modalVisible: false, xmlCodeEditorProps: {} });

    const setList = (list) => {
        props.setList(list);
    }

    const onClose = (key) => {
        props.removeItem(key);
    }

    const onEditModeClick = (item) => {
        state.modalVisible = true;
        state.xmlCodeEditorProps = { ...item };
        setState({ ...state });
    }

    const handleModalOk = () => {
        setState({ ...state, modalVisible: false });
    };
    const handleModalCancel = () => {
        setState({ ...state, modalVisible: false });
    };

    const getChildItems = () => {
        if (!props.templateList.length) {
            return <div className="draggable-list"></div>
        }
        return (
            props.templateList.map((item) => (
                <div key={item.key} className="dragg-item">
                    <Alert type="info" closable
                        message={<Space><AliyunOutlined />{item.name}</Space>}
                        action={
                            <Button onClick={() => onEditModeClick(item)} size="small" type="text" icon={<EditOutlined />} />
                        }
                        onClose={() => onClose(item.key)} />
                </div>
            ))
        );
    }

    return (
        <div className="draggable-list">
            <ReactSortable list={JSON.parse(JSON.stringify(props.templateList))}
                setList={setList}
                animation={200}
                tag=""
                group={{ name: "shared", pull: 'clone' }}
                delayOnTouchStart={true}
                delay={2}
            >
                {getChildItems()}
            </ReactSortable>
            <Modal width={10000} style={{ top: 20 }} title="Edit Xml" open={state.modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <XmlCodeEditor xmlProps={state.xmlCodeEditorProps} />
            </Modal>
        </div>
    )
}

const stateCreators = (state) => {
    const { templateList } = state.xmlTemplate || [];
    return { templateList };
};

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(stateCreators, mapDispatchToProps)(DraggableList);

