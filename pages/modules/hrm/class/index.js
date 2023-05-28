import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';


const ManageClass = () => {

    // const

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    return (
        <div>ManageClass</div>
    )
}

export default ManageClass