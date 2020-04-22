// Libraries
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Button, Col, Input, message, Spin} from 'antd';
import imgNoAvalible from 'Src/assets/images/noimage.png';

// Utils
import {beforeUpload} from 'Src/utils';

// Antd
import {UploadOutlined} from '@ant-design/icons';

// Services
import * as uploadServices from 'Src/services/Upload';

// Constant
import {appConfig} from 'Src/constant';

const Upload = props => {
    const [urlImage, setUrlImage] = useState('');
    const [isShowLoading, setIsShowLoading] = useState(false);

    useEffect(() => {
        props.callback(urlImage);
    },[urlImage]);

    useEffect(() => {
        if (props.imageEdited !== '') {
            setUrlImage(props.imageEdited);
        } else {
            setUrlImage('');
        }
    },[props.imageEdited]);

    const onChangeUpload = async (value) => {
        const {files} = value.target;

        if (beforeUpload(files[0])) {
            let data = new FormData();

            data.append('file', files[0]);

            setIsShowLoading(true);

            const uploadAvatar = await uploadServices.uploadAvatar({
                formData: data
            });

            if (uploadAvatar) {
                if (uploadAvatar.data && uploadAvatar.data.data) {
                    const {path} = uploadAvatar.data.data;

                    message.success('Tải ảnh lên thành công');
                    setUrlImage(`${appConfig.API}/${path}`);
                }
            }

            setIsShowLoading(false);
        }
    };

    return (
        <div style={{alignItems: 'center',flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
            <div className='image-preview mb-5'>
                <Spin spinning={isShowLoading}>
                    <img 
                        src={urlImage === '' ? imgNoAvalible : urlImage} 
                        alt="image" 
                        width='150px' />
                </Spin>
            </div>
            <Button type="primary" icon={<UploadOutlined  />} size='middle'>
                Tải ảnh lên
                <Input type='file' name='file' className='input-upload' title='' onChange={onChangeUpload} />
            </Button>
        </div>
    );
};

Upload.propTypes = {
    
};

export default Upload;