export const plIn = {
    name: "pl_in",
    title:"pl_in",
    code: `<call-template target="conf:templates/sequences/dbLogTemplate.xml">
        <with-param name="GNL_EXT_SYST_CALL_LOG_ID" value="{get-property('seqSystemLogId')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="SRVC_NAME" value="{get-property('To')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="OPER_NAME" value="eom-subscribeDigitalPackSeq"/>
        <with-param name="PL_IN" value="{get-property('payload')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="CUSER" value="WSO2ESB"/>
        <with-param name="TXN_ID" value="{$ctx:TransactionId}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="CDATE" value="{get-property('sysDate')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="SRVR_NAME" value="{fn:concat(get-property('SERVER_IP'),':',get-property('transportPort'))}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="SOURCE_SYSTEMS" value="AUTOCLOUD"/>
        <with-param name="TARGET_SYSTEMS" value="EOM"/>
        <with-param name="ACTION" value="pl_in"/>
    </call-template>`
};

export const invOut = {
    name: "inv_out",
    title: "inv_out",
    code: `<call-template target="conf:templates/sequences/dbLogTemplate.xml">
        <with-param name="INV_OUT" value="{get-property('Payload')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="UUSER" value="WSO2ESB"/>
        <with-param name="GNL_EXT_SYST_CALL_LOG_ID" value="{get-property('seqSystemLogId')}" xmlns:ns="http://org.apache.synapse/xsd"/>
        <with-param name="ACTION" value="inv_out"/>
    </call-template>`
};
