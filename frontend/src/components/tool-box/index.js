import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import "styles/tool-box.css";
import { connect } from "react-redux";
import { xmlTemplateActions } from "store/actions/xml.template.actions";
//import DefaultComponents from "components/tool-box/items/DefaultComponents";
import { ReactSortable } from "react-sortablejs";
import { getCodeDataList } from "services/data.services";

const ToolBox = (props) => {
    const [state, setState] = useState({ componentList: [] });


    useEffect(() => {
        getCodeDataList().then(response => {
            setState({ componentList: response });
        });
    }, [])

    const onAddItemClick = (item) => {
        props.addItem(item);
    }

    return (
        <div style={{ width: '100%' }} className="tool-box-list">
            <ReactSortable list={state.componentList}
                setList={(list) => null}
                sort={false}
                animation={200}
                group={{ name: "shared", pull: 'clone', put: false }}
                delayOnTouchStart={true}
                delay={2}
            >
                {state.componentList.map((item, index) =>
                    <div key={index} className="tool-box-item">
                        <Button block icon={<LoginOutlined />} key={index} size="small" type="primary" onClick={() => onAddItemClick(item)} >
                            {item.name}
                        </Button>
                    </div>
                )}
            </ReactSortable>
        </div>
    )
}

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(null, mapDispatchToProps)(ToolBox);