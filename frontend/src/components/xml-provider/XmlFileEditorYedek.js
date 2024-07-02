import { Alert, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Builder, Util, XmlEditor } from "react-xml-editor";
import { connect } from "react-redux";
import { xmlTemplateActions } from "store/actions/xml.template.actions";

const docSpec = {
    elements: {
        "with-param": {
            attributes: {
                label: {
                    asker: Util.askString,
                    menu: [{
                        action: Util.deleteAttribute,
                        caption: 'Delete attribute',
                    }],
                },
                value: {
                    asker: Util.askPicklist([{
                        value: 'short', caption: 'short'
                    }, {
                        value: 'medium', caption: 'medium',
                    }, 'long']),
                },
            },
            menu: [{
                action: Util.newElementChild('<child />'),
                caption: 'Append child <child />',
            }, {
                action: Util.newAttribute({
                    name: 'label',
                    value: 'default value',
                }),
                caption: 'Add attribute @label',
                hideIf: (xml, id) => {
                    const element = Util.getXmlNode(xml, id);
                    return element && element.$ && typeof element.$.label !== 'undefined';
                },
            }, {
                action: Util.deleteElement,
                caption: 'Delete this <item />',
                icon: 'exclamation.png',
            }, {
                action: Util.newElementBefore('<item />'),
                caption: 'New <item /> before this',
            }, {
                action: Util.newElementAfter('<item />'),
                caption: 'New <item /> after this',
            }, {
                action: Util.duplicateElement,
                caption: 'Copy <item />',
            }, {
                action: Util.moveElementUp,
                caption: 'Move <item /> up',
                hideIf: (xml, id) => !Util.canMoveElementUp(xml, id),
            }, {
                action: Util.moveElementDown,
                caption: 'Move <item /> down',
                hideIf: (xml, id) => !Util.canMoveElementDown(xml, id),
            }]
        },
    }
};
const xmlTest = '<list><item label="one" type="short">text 1</item><item label="two">text 2</item><!-- ABC --></list>';

const XmlFileEditor = (props) => {
    const [state, setState] = useState({ xml: "" });
    const xmlRef = React.createRef();

    const onClickHarvest = () => {
        if (xmlRef.current) {
            const builder = new Builder({});
            const xml = xmlRef.current.getXml();
            if (xml) {
                setState({ ...state, xmlPreview: builder.buildObject(xml) });
            }
        }
    }

    useEffect(() => {
        setState({ ...state, xmlData: null });
        setTimeout(() => setState({ ...state, xmlData: props.xmlCodes }), 1000);
    }, [props.xmlCodes]);

    if (!state.xmlData) {
        return <></>;
    }

    return (
        <>
            <Space direction="vertical">
                <Space>
                    <Alert message="Xml Designer" type="info" />
                    <Button type="primary" block onClick={onClickHarvest}>
                        Update Preview
                    </Button>
                </Space>
                <XmlEditor docSpec={docSpec} ref={xmlRef} xml={state.xmlData} />
            </Space>
            <Space direction="vertical">
                <div>
                    <Alert message="Xml Preview" type="success" />
                </div>
                <div>
                    <pre>
                        {state.xmlPreview}
                    </pre>
                </div>
            </Space>

        </>
    );
}

const stateCreators = (state) => {
    const { templateList } = state.xmlTemplate || [];
    const xmlCodes = "<main>" + templateList.map(item => item.code).join('\n') + "</main>";
    return { xmlCodes };
};

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(stateCreators, mapDispatchToProps)(XmlFileEditor);
