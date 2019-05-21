import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Modal,
  Button,
  Spin,
  Row,
  Col,
  Statistic,
  Timeline,
  Input,
  InputNumber,
  message
} from 'antd';
import styles from './ArtInfoModal.module.scss';

const ArtInfoModal = (props) => {
  const {
    artInfoModalVisible,
    changeArtInfoModalVisible,
    selectedArt,
    selectedIndex,
    contract
  } = props;
  const [loading, changeLoading] = useState(false);
  const [
    addTransactionModalVisible,
    changeAddTransactionModalVisible
  ] = useState(false);
  const [name, changeName] = useState('');
  const [price, changePrice] = useState(0);
  const [transactionInfo, changeTransactionInfo] = useState(null);
  const [confirmLoading, changeConfirmLoading] = useState(false);
  const handleConfirm = () => {
    if (!name.length) {
      message.error('Please fill in the name!');
      return;
    }
    changeConfirmLoading(true);
    contract.methods
      .applyTransaction(moment().format('X'), name, selectedArt[0], price)
      .send()
      .then(() => {
        if (selectedArt) {
          const getTransactionInfo = (id) => {
            return new Promise((resolve, reject) => {
              contract.methods
                .getTransactionInfo(id)
                .call()
                .then((response) => {
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          };
          const transactions = selectedArt[3];
          const promises = transactions.map((id) => getTransactionInfo(id));
          Promise.all(promises)
            .then((res) => {
              console.log(res);
              changeTransactionInfo(res);
              message.success('Create Success!');
              changeAddTransactionModalVisible(false);
              changeName('');
              changePrice(0);
              changeConfirmLoading(false);
            })
            .catch((err) => {
              console.error(err);
              changeConfirmLoading(false);
              message.error('Something bad happened');
            });
        }
      })
      .catch((err) => {
        console.error(err);
        message.error('Something bad happened');
      });
  };
  const handleClose = () => {
    changeArtInfoModalVisible(false);
  };
  const getTransactions = () => {
    if (selectedArt) {
      const getTransactionInfo = (id) => {
        return new Promise((resolve, reject) => {
          contract.methods
            .getTransactionInfo(id)
            .call()
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        });
      };
      const transactions = selectedArt[3];
      const promises = transactions.map((id) => getTransactionInfo(id));
      Promise.all(promises)
        .then((res) => {
          changeTransactionInfo(res);
        })
        .catch((err) => {
          console.error(err);
          message.error('Something bad happened');
        });
    }
  };
  useEffect(() => {
    if (selectedArt) {
      getTransactions();
    }
  }, [selectedArt]);
  return (
    <Modal
      title={selectedArt ? selectedArt[1] : ''}
      visible={artInfoModalVisible}
      footer={[
        <Button key="Close" type="primary" onClick={handleClose}>
          Close
        </Button>
      ]}
      onCancel={handleClose}
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
                  <div>
                    {transactionInfo && transactionInfo.length
                      ? transactionInfo[0][3]
                      : selectedArt
                      ? selectedArt[2]
                      : ''}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div style={{ width: 80 }}>Owner:</div>
                  <div>{selectedArt ? selectedArt[2] : ''}</div>
                </div>
                <div className={styles.data}>
                  <Statistic
                    title="Value"
                    value={
                      transactionInfo && transactionInfo.length
                        ? transactionInfo[transactionInfo.length - 1][1]
                        : '--'
                    }
                    style={{ marginRight: 30 }}
                  />
                  <Statistic
                    title="Increase"
                    value={
                      transactionInfo && transactionInfo.length > 1
                        ? ((transactionInfo[transactionInfo.length - 1][1] -
                            transactionInfo[0][1]) /
                            transactionInfo[0][1]) *
                            100 +
                          '%'
                        : '--'
                    }
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Button
            type="primary"
            icon="file-add"
            style={{ marginBottom: -10, marginTop: 30 }}
            onClick={() => changeAddTransactionModalVisible(true)}
          >
            Create a Transaction History
          </Button>
          <div style={{ marginTop: 50 }}>
            <Timeline>
              <Timeline.Item>
                {selectedArt
                  ? moment.unix(selectedArt[0]).format('YYYY-MM-DD')
                  : ''}{' '}
                Created
              </Timeline.Item>
              {selectedArt
                ? selectedArt[3].map((item, i) => (
                    <Timeline.Item key={i}>
                      {moment.unix(item).format('YYYY-MM-DD')}{' '}
                      {transactionInfo && transactionInfo.length ? transactionInfo[i][3] : ''} to{' '}
                      {transactionInfo && transactionInfo.length ? transactionInfo[i][4] : ''}, $
                      {transactionInfo && transactionInfo.length ? transactionInfo[i][1] : ''}
                    </Timeline.Item>
                  ))
                : null}
            </Timeline>
          </div>
        </div>
      )}
      <Modal
        title="Give a transaction record"
        visible={addTransactionModalVisible}
        onOk={handleConfirm}
        onCancel={() => changeAddTransactionModalVisible(false)}
        confirmLoading={confirmLoading}
      >
        <Input
          placeholder="New Owner Name"
          value={name}
          onChange={(e) => changeName(e.target.value)}
        />
        <span>Price: </span>
        <InputNumber
          min={0}
          value={price}
          onChange={(val) => changePrice(val)}
          style={{ marginTop: 20 }}
        />
      </Modal>
    </Modal>
  );
};

export default React.memo(ArtInfoModal);
