import React, { useState } from 'react';
import { Modal, Button, Spin, Row, Col, Statistic, Timeline } from 'antd';
import styles from './ArtInfoModal.module.scss';

const ArtInfoModal = (props) => {
  const { artInfoModalVisible, changeArtInfoModalVisible, selectedArt, selectedIndex } = props;
  const [loading, changeLoading] = useState(false);
  const handleClose = () => {
    changeArtInfoModalVisible(false);
  };
  return (
    <Modal
      title={selectedArt ? selectedArt[1] : ''}
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
          <Row gutter={24}>
            <Col md={12}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url("https://loremflickr.com/320/240/art?lock=${selectedIndex}")`
                }}
              />
            </Col>
            <Col md={12}>
              <div className={styles.infoWrapper}>
                <div className={styles.infoItem}>
                  <div style={{ width: 80 }}>Name:</div>
                  <div>{selectedArt ? selectedArt[1] : ''}</div>
                </div>
                <div className={styles.infoItem}>
                  <div style={{ width: 80 }}>Author:</div>
                  <div>{selectedArt ? selectedArt[2] : ''}</div>
                </div>
                <div className={styles.infoItem}>
                  <div style={{ width: 80 }}>Owner:</div>
                  <div>{selectedArt ? selectedArt[2] : ''}</div>
                </div>
                <div className={styles.data}>
                  <Statistic
                    title="Value"
                    value={112893}
                    style={{ marginRight: 30 }}
                  />
                  <Statistic title="Increase" value={'12.8%'} />
                </div>
              </div>
            </Col>
          </Row>
          <div style={{marginTop: 50}}>
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>
                Solve initial network problems 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>
                Network problems being solved 2015-09-01
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default React.memo(ArtInfoModal);
