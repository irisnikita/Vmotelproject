// Libraries
import React from 'react';
import {Modal} from 'antd';
import PropTypes from 'prop-types';

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
};

let BlockModal = (props) => {
    // Props
    const {isOpen, toggleModal} = props;
  
    const onOkModal = () => {
        toggleModal();
    };

    const onCanceModal = () => {
        toggleModal();
    };

    return (
        <Modal
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCanceModal}
        >
            hello
        </Modal>
    );
};

BlockModal.propTypes = propTypes;

export default BlockModal;