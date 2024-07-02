export const transactionId = {
    name: "transactionId",
    title: "Transaction Id",
    properties: [{ name: "TransactionId", expression: ["json-eval"] },],
    code: `<property name="startTime" expression="get-property('SYSTEM_TIME')" scope="default" type="STRING" xmlns:ns="http://org.apache.synapse/xsd"/>
        <property name="sysDate" expression="get-property('SYSTEM_DATE','yyyy-MM-dd HH:mm:ss')" scope="default" xmlns:ns="http://org.apache.synapse/xsd"/>
        <call-template target="conf:templates/sequences/dbLogTemplate.xml">
            <with-param name="ACTION" value="nextval"/>
        </call-template>
        <property name="seqSystemLogId" expression="get-property('systemLogId')" scope="default" xmlns:ns="http://org.apache.synapse/xsd"/>
        <property name="payload" expression="json-eval($.)" scope="default" type="STRING" xmlns:ns="http://org.apache.synapse/xsd"/>
        <property name="TransactionId" expression="json-eval($.reqInfo.transactionId)" scope="default" type="STRING" xmlns:ns="http://org.apache.synapse/xsd"/>
        <script language="js">
            <![CDATA[mc.setProperty("transportPort",java.lang.System.getProperty("mgt.transport.https.port"));]]>
        </script>`,
};