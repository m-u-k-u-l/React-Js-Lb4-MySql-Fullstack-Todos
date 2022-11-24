import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Card, Modal, Alert } from 'react-bootstrap';
import { Trash, PencilSquare, Tv } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

const TodosList = () => {

    const [todosdata, setTodosdata] = useState([]);
    const [formdata, setFormdata] = useState([]);
    const [success, setSuccess] = useState(false);
    const [errormsg, setErrormsg] = useState('');
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);

    useEffect(() => {
        getTodos();
    }, [success])

    const getTodos = async () => {
        const res = await ItemAPI.getItem('/todos');
        const getRes = res.data
        setTodosdata(getRes)
    }

    const handleChange = (e) => {
        e.preventDefault();
        if (formdata.title != '' || formdata.title != undefined) {
            setErrormsg('');
        }
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {

        if (formdata.title === '' || formdata.title === undefined) {
            setErrormsg('Title is required');
            return false
        } else {

            const res = await ItemAPI.postItem('/todos', formdata);
            const postRes = res.data;
            // console.log('res ---', postRes);
            if (postRes) {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setSuccess({
                    ...success,
                    success: !success
                });
                setFormdata([])
            }
        }
    };

    const handleDelete = async (idd) => {
        const res = await ItemAPI.deleteItem(`/todos/${idd}`);
        const deleteRes = res.status;
        console.log('Delete - res ---', deleteRes);
        if (deleteRes === 204) {
            setSuccess({
                ...success,
                success: !success
            });
            setShowDel(true)
            setTimeout(() => {
                setShowDel(false)
            }, 2000)
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

    const handleClose = () => setShowDel(false);

    return (
        <>
            <Container >
                <Modal show={showDel} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <b>A task has been deleted!</b>
                    </Modal.Header>
                </Modal>
                {
                    show ?
                        <Alert variant="success" onClose={() => setShow(false)} dismissible><b>New task has been created successfully!</b></Alert>
                        :
                        <div style={{ 'height': '42px' }}></div>
                }
                <Row>
                    {/* Form */}
                    <Col sm={3}>
                        <h4>Add New</h4>
                        <br />
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Title" name='title' onChange={handleChange} value={formdata.title || ''} />
                                <strong><small style={{ 'color': 'red' }}>{errormsg}</small></strong>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control as="textarea" value={formdata.desc || ''} placeholder="Enter Description" rows={3} name='desc' onChange={handleChange} />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>

                    <Col sm={1}>
                    </Col>

                    {/* Listing */}
                    <Col sm={8} className='card-home'>
                        <div className="">
                            <h4 className="">Todos</h4>  <br />
                        </div>
                        <Row xs={1} md={4} className="g-4">
                            {
                                (todosdata && todosdata.length) ?
                                    todosdata.map((elem, i) => (
                                        <Col key={elem.id}>
                                            <Card>
                                                <Card.Img variant="top" src="/images/default.jpg" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        {(elem.title.length > 20) ? elem.title.trim().slice(0, 18) + '...' : elem.title}
                                                    </Card.Title>
                                                    <div className="card-date">
                                                        <div style={{ 'color': 'blue', 'fontWeight': '500' }}>
                                                            <small><i>{elem.updated_at ? myDate(elem.updated_at) : myDate(elem.created_at)}</i></small>
                                                        </div>

                                                    </div>
                                                    <Card.Text>
                                                        {(elem.desc.length > 10) ? elem.desc.slice(0, 10) + '...' : elem.desc}
                                                    </Card.Text>
                                                    <div><center>
                                                        <Link to={`/view/${elem.id}`}><Tv /></Link> &nbsp;
                                                        <Link to={`/edit/${elem.id}`}><PencilSquare /></Link> &nbsp;
                                                        <Link to={'#'} onClick={() => handleDelete(elem.id)}><Trash /></Link> &nbsp;
                                                    </center>    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                    : <p>No task in the list...</p>
                            }
                        </Row>
                        <br />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TodosList