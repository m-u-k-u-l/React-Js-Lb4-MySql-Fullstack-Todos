import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Card , Alert } from 'react-bootstrap';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

const TodoEdit = () => {

    const [elemData, setelemData] = useState({
        title: '',
        desc: '',
    });
    const [errormsg, setErrormsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);

    const param_id = useParams();
    const user_id = param_id.id;
    let navigate = useNavigate();

    useEffect(() => {
        getElement();
    }, [success])

    const getElement = async () => {
        const res = await ItemAPI.getItem(`/todos/${user_id}`);
        // console.log('res element', res)
        const getRes = res.data
        setelemData(getRes)
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.name === 'title') {
            if (elemData.title != '' || elemData.title != undefined) {
                setErrormsg('');
            }
        }

        setelemData({
            ...elemData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async () => {

        //  console.log('Update elemData : ', elemData.title)

        if (elemData.title === '' || elemData.title === undefined) {
            setErrormsg('Title is required');
            return false
        } else {

            delete elemData['updated_at'];
            // console.log('Update elemData : ', elemData)
            //return false
            const res = await ItemAPI.patchItem(`/todos/${user_id}`, elemData);
            const postRes = res;
            console.log('res ---', postRes);
            if (postRes.status === 204) {
                setSuccess({
                    ...success,
                    success: !success
                });
                
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                    navigate('/');
                }, 2000)
            }
        }
    };

    function myDate(date) {
        let closedate = new Date(date);
        let month_number = closedate.getMonth() + 1;
        let yearr = closedate.getFullYear();
        let datee = closedate.getDate();
        let drawclosenew = datee + '-' + month_number + '-' + yearr;
        return drawclosenew;
    }


    return (
        <>
            <Container >
                {
                    show ?
                        <Alert variant="success" onClose={() => setShow(false)} dismissible><b>Task has been updated successfully!</b></Alert>
                        :
                        <div style={{ 'height': '42px' }}></div>
                }
                <Row>
                    {/* Form */}
                    <Col sm={3}>
                        <h4>Edit</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    name='title'
                                    onChange={handleChange}
                                    defaultValue={elemData.title || ''}
                                />
                                <strong><small style={{ 'color': 'red' }}>{errormsg}</small></strong>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter Description"
                                    rows={3}
                                    name='desc'
                                    onChange={handleChange}
                                    defaultValue={elemData.desc || ''}
                                />
                            </Form.Group>
                            <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button> &nbsp;&nbsp;
                            <Button variant="primary" onClick={handleUpdate}>Update</Button>
                        </Form>
                    </Col>

                    <Col sm={1}>
                    </Col>

                    {/* Listing */}
                    <Col sm={8}>
                        <div className="">
                            <h4 className=""></h4>
                        </div>
                        <Row xs={1} md={1} className="g-4">
                            <Col>
                                <Card>
                                    {/* <Card.Img variant="top" src="/images/default.jpg" width='50px' /> */}
                                    <Card.Body>
                                        <Card.Title>{elemData.title}</Card.Title>
                                        <div>
                                            <div style={{ 'color': 'blue', 'fontWeight': '500' }}>
                                                <small><i>{elemData.updated_at ? myDate(elemData.updated_at) : myDate(elemData.created_at)}</i></small>
                                            </div>
                                        </div>

                                        <Card.Text>
                                            {elemData.desc}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TodoEdit