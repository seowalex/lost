import React from 'react'
import { ModalHeader, ModalBody, Button } from 'reactstrap';
import Table from '../../../../globalComponents/modals/Table'
import CollapseCard from '../../../../globalComponents/modals/CollapseCard'
import { alertSuccess } from '../../../../globalComponents/Sweetalert'
import axios from 'axios'
import {API_URL} from '../../../../../../../lost_settings'
import fileDownload from 'js-file-download'

import { createHashHistory } from 'history'

function handleSiaRewiewClick(props){
    props.siaReviewSetElement(props.id)
    props.chooseAnnoTask(
        props.annoTask.id, 
        createHashHistory().push('/sia-review')
    )
}

function handleInstantAnnoDownload(pe_id){
    axios.post(API_URL+'/data/annoexport', {'pe_id':pe_id}).then( resp => {
      fileDownload(resp.data, `annos_pe_${pe_id}.csv`)
    })
  }

function annotationReleaseSuccessful(){
    // console.log('Annotation release successful')
    alertSuccess('Annotation release successful')
}

function handleForceAnnotationRelease(props){
    // console.log('Start annotation release')
    props.forceAnnotationRelease(props.annoTask.id, annotationReleaseSuccessful)
}
export default (props)=>{
    return (
        <>
            <ModalHeader>Annotation Task</ModalHeader>
            <ModalBody>
                <Table
                    data={[
                        {
                            key: 'Annotation Task Name',
                            value: props.annoTask.name
                        },
                        {
                            key: 'Instructions',
                            value: props.annoTask.instructions
                        },
                        {
                            key: 'User/Group Name',
                            value: props.annoTask.userName
                        }
                    ]}
                />
                <CollapseCard>
                    <Table
                        data={[
                            {
                                key: 'Element ID',
                                value: props.id
                            },
                            {
                                key: 'Annotation Task ID',
                                value: props.annoTask.id
                            },
                            {
                                key: 'Type',
                                value: props.annoTask.type
                            },
                            {
                                key: 'Status',
                                value: props.state
                            }
                        ]}
                    />
                </CollapseCard>
                <Button color="success" style={{ marginLeft:10, marginTop:20, marginBottom: '1rem' }}
                    onClick={e => handleInstantAnnoDownload(props.id)}>Download Annotations</Button>
                <Button color="warning" style={{ marginLeft:10, marginTop:20, marginBottom: '1rem' }}
                    onClick={e => handleSiaRewiewClick(props)}>Review Annotations</Button>
                <Button color="danger" style={{ marginLeft:10, marginTop:20, marginBottom: '1rem' }}
                    onClick={e => handleForceAnnotationRelease(props)}>Force Annotation Release</Button>

            </ModalBody>
        </>
    )
}



