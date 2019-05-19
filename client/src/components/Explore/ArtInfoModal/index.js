import React, { useState } from 'react';
import { Modal, Button, Spin } from 'antd';

const ArtInfoModal = (props) => {
  const { artInfoModalVisible, changeArtInfoModalVisible } = props;
  const [loading, changeLoading] = useState(true);
  const handleClose = () => {
    changeArtInfoModalVisible(false);
  };
  return (
    <Modal
      title="Basic Modal"
      visible={artInfoModalVisible}
      footer={[
        <Button key="Close" type="primary" onClick={handleClose}>
          Close
        </Button>
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      )}
    </Modal>
  );
};

export default React.memo(ArtInfoModal);
