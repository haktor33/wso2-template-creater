import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import XMLViewer from 'react-xml-viewer'
import { xmlTemplateActions } from "store/actions/xml.template.actions";

const XmlViewer = (props) => {
    return (
        <Card hoverable={true} className="xml-viewer">
            <XMLViewer xml={props.xmlCodes} />
        </Card>
    );
}

const stateCreators = (state) => {
    const { templateList } = state.xmlTemplate || [];
    const xmlCodes = `<?xml version="1.0" encoding="UTF-8"?>
                      <sequence name="eom-changeDigitalPackSubscriptionSeq" onError="conf:sequences/om.esb/om.esb-faultSeq.xml" xmlns="http://ws.apache.org/ns/synapse">
                      ${templateList.map(item => item.code).join('\n')}
                      </sequence>`;
    return { xmlCodes };
};

const mapDispatchToProps = {
    ...xmlTemplateActions,
};

export default connect(stateCreators, mapDispatchToProps)(XmlViewer);
