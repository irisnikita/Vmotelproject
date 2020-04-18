// Libraries
import React, {useState, useEffect} from 'react';
import {Upload, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import _ from 'lodash';

// Constant
import {appConfig} from 'Src/constant';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UploadImage = (props) => {
    const {isOpen, imagesEdited} = props;

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (isOpen === true) {
            setFileList(imagesEdited);
        }
    },[isOpen, imagesEdited]);

    const handleCancel = () => {setPreviewVisible(false)};

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({fileList}) => {
        setFileList(fileList);

        props.callback(fileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div className="clearfix">
            <Upload
                action={`${appConfig.API}/upload/${props.path}`}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage} />
            </Modal>
        </div>
    );
};

UploadImage.defaultProps = {
    path: 'rooms',
    imagesEdited: []
};

export default UploadImage;