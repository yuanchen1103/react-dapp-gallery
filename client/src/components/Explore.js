import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Row, Col, Card, Button, Modal, Input, message } from 'antd';
import styles from './Explore.module.scss';

const { Meta } = Card;

const Explore = (props) => {
  const { drizzle, drizzleState } = props;
  const [modalVisible, changeModalVisible] = useState(false);
  const [name, changeName] = useState('');
  const [author, changeAuthor] = useState('');
  const [allArts, changeAllArts] = useState([]);
  const contract = drizzle.contracts.Arts;
  const handleConfirm = () => {
    if (!name.length || !author.length) {
      message.error('Please fill in the name and the artist!');
      return;
    }
    contract.methods.addArt(12345, name, author).send();
    changeModalVisible(false);
  };
  useEffect(() => {
    contract.methods
      .getArts()
      .call()
      .then((res) => {
        changeAllArts(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <Button
        type="primary"
        icon="file-add"
        style={{ marginBottom: 20 }}
        onClick={() => changeModalVisible(true)}
      >
        Create a New Artwork
      </Button>
      <Row gutter={24}>
        {allArts.map((item) => (
          <Col md={6}>
            <Card
              hoverable
              bordered={false}
              cover={
                <div
                  className={styles.cardImage}
                  style={{
                    backgroundImage: 'url("https://picsum.photos/200/300")'
                  }}
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Create a New Artwork"
        visible={modalVisible}
        onOk={handleConfirm}
        onCancel={() => changeModalVisible(false)}
      >
        <Input
          placeholder="Give Artwork a Name"
          value={name}
          onChange={(e) => changeName(e.target.value)}
        />
        <Input
          placeholder="Who is the creative artist ?"
          value={author}
          onChange={(e) => changeAuthor(e.target.value)}
          style={{ marginTop: 20 }}
        />
      </Modal>
    </div>
  );
};

export default Explore;
