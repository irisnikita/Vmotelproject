// Libraries
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Input, Popconfirm, message, Select, Avatar} from 'antd';
import {connect} from 'react-redux';
import Highlighter from 'react-highlight-words';
import numeral from 'numeral';
import {SearchOutlined} from '@ant-design/icons';

// Actions
import {layout} from 'Layouts/actions';

// Components
import ModalContract from './Components/ModalContract';

// Antd
const {Title} = Typography;
const {Option} = Select;

const Contracts = props => {
    // Props
    const {layout, blocks} = props;

    // State
    const [blockSelected, setBlockSelected] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [contracts, setContracts] = useState([]);
    const searchInput = useRef(null);
    const [contractModal, setContractModal] = useState({
        isOpen: false,
        contractEdited: {}
    });

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowsKey) => {
            setselectedRowKeys(selectedRowsKey);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, name) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${name}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
              Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
              Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                if (searchInput) {
                    setTimeout(() => searchInput.current.select());
                }
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

    const columns = [
        {
            title: '',
            dataIndex: 'edit',
            key:'edit',
            width: 100
            
            // render: (id)=> <div className='flex-row-center'>
            //     <Tooltip title='Sửa'>
            //         <Button onClick={()=>onClickEdit(id)} className='flex-row-center' size='small' shape='circle'>
            //             <i className='icon-createmode_editedit' />
            //         </Button>
            //     </Tooltip> &nbsp;
            //     <Tooltip title='Xóa'>
            //         <Popconfirm
            //             title='Bạn muốn xóa khu trọ/căn hộ này?'
            //             onConfirm={()=>onConfirmRemove(id)}
            //             okText='Xóa'
            //             cancelText='Hủy'
            //         >
            //             <Button className='flex-row-center' size='small' type='danger' shape='circle'>
            //                 <i className='icon-highlight_remove' />
            //             </Button>
            //         </Popconfirm>
            //     </Tooltip>
            // </div>
        },
        {
            title: 'Tên phòng',
            dataIndex: 'nameRoom',
            ...getColumnSearchProps('nameRoom', 'Tên phòng'),
            key:'nameRoom'
        },
        {
            title: 'Người đại diện',
            dataIndex: 'nameLeader',
            key:'nameLeader'
        },
        {
            title: 'Thời hạn hợp đồng',
            dataIndex: 'timeContract',
            key:'timeContract'
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key:'startDate'
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'endDate',
            key:'endDate'
        },
        {
            title: 'Tiền đặt cọc',
            dataIndex: 'deposit',
            key:'deposit',
            sorter: (a, b) => a.price - b.price,
            render: (price) => (<div>
                {numeral(price).format('0,0.00')} vnđ
            </div>)
        }
    ];

    useEffect(() => {
        layout({
            type: 'path',
            value: 'contracts'
        });

    }, []);

    useEffect(()=>{
        if (blocks.length > 0) {

            // had block in list
            let isHaded = blocks.some(block => block.id === +localStorage.getItem('blockSelected'));

            if (localStorage.getItem('blockSelected') && isHaded) {
                const defaultBlock = localStorage.getItem('blockSelected');
    
                setBlockSelected(+defaultBlock);
            } else {
                setBlockSelected(blocks[0].id);
            }

        }

    },[blocks]);

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockSelected',value);
        
        setBlockSelected(value);
    };

    const onConfirmDelete = () => {

    };

    const onClickAddNew = () => {
        setContractModal({
            ...contractModal,
            isOpen: true
        });
    };

    return (
        <div style={{padding: 10}}>
            <Row>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ HỢP ĐỒNG</Title>
                </Col>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Select
                        showSearch
                        value={blockSelected}
                        style={{width: 200}}
                        placeholder="Chọn khu trọ"
                        onChange={onChangeBlocks}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            blocks.map(block =>(
                                <Option key={block.id} value={block.id}>{block.nameBlock}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Col xs={{span: 24}} md={{span: 24}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Button disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' onClick={onClickAddNew} >
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm mới
                    </Button> &nbsp;
                    <Popconfirm
                        disabled={selectedRowKeys.length > 0 ? false : true}
                        placement="bottom"
                        title={`Bạn có muốn xóa ${selectedRowKeys.length} phòng này?`}
                        okText='Xóa'
                        onConfirm={onConfirmDelete}
                        cancelText='Hủy'
                    >
                        <Button disabled={selectedRowKeys.length > 0 ? false : true} type='danger' >
                            <i className='icon-delete' /> &nbsp;
                            Xóa nhiều
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            
            <Spin spinning={isShowLoadingTable} tip='Loading...'>
                <Row style={{paddingTop: '10px'}}>
                    <Table bordered size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={contracts} />
                </Row>
            </Spin>
            <ModalContract
                isOpen={contractModal.isOpen}
                blockSelected={blockSelected}
                toggle={() => {setContractModal({...contractModal, isOpen: !contractModal.isOpen})}}
            />
        </div>
    );
};

Contracts.propTypes = {
    
};

const mapDispatchToProps = {
    layout
};

function mapStateToProps(state) {
    return {
        blocks: state.Layouts.layoutReducer.blocks
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contracts);