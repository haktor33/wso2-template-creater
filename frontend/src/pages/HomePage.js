import React from "react";
import { Col, Row } from "antd";
import DraggableList from "components/dragable-list/DraggableList";
import XmlViewer from "components/xml-provider/XmlViewer";

const HomePage = () => {

    return (
        <Row gutter={[32, 32]} justify="space-evenly" align="flex-start">
            <Col span={8}>
                <DraggableList />
            </Col>
            <Col span={16}>
                <XmlViewer />
            </Col>
        </Row>
    );
}

export default HomePage;