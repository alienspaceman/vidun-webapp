import React, {Component} from 'react';
import {post} from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import {FormControl} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FaPaperPlane, FaCopy } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faPatreon, faGithub } from "@fortawesome/free-brands-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
require('dotenv').config();

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: {
                description: ''
            },
            isLoading: false,
            result: null,
            text_copy: ''
    };
}
    handleChange = (event) => {
            const value = event.target.value;
            const name = event.target.name;
            var formData = this.state.formData;
            formData[name] = value;
            this.setState({
                formData
            });
    };

    handleSendClick = (event) => {
        event.preventDefault();

        const data = this.state.formData;
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        var descriptionInput = document.getElementById("description-input");
        let isValid = true;
        if (descriptionInput.value === ''){
            console.log("Empty description");
            descriptionInput.className += " is-invalid";
            isValid = false;
        }
        else{
            console.log("valid description");
            descriptionInput.className = "form-control form-control-md";
        }

        if (isValid) {
            let config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
            this.setState({isLoading: true});
            console.log(this.state.result);
            console.log(formData);
            console.log('http://' + process.env.REACT_APP_FLASK_APP_HOST + ':' + process.env.REACT_APP_FLASK_APP_PORT + '/inference');

            post('http://' + process.env.REACT_APP_FLASK_APP_HOST + ':' + process.env.REACT_APP_FLASK_APP_PORT + '/inference', formData, config)
                    .then(response => {
                        console.log(response.data)
                        this.setState({
                            result: response.data.result,
                            isLoading: false,
                            text_copy: response.data.result
                        });
                    });
            console.log("after click predict result");
            console.log(this.state.result);
    }};

  render(){
      const isLoading = this.state.isLoading;
      const textData = this.state.formData;
      const result = this.state.result;
      const text_copy = this.state.text_copy
      const message = 'Расскажи свой сон и получи толкование от нейросети vIdun.\n Например "гулять под дождем", "убегать от большой злой собаки" и т.д. \n Подожди ~10 с (да, долго, что поделать).'
      console.log(result)
    return (


        <Container fluid={true} className="content">
            <div className="container_header">
                <h1>vIdun</h1>
                <h3>умный помощник в толковании снов</h3>
            </div>

            <Container className="about">
                <Card>
              <Card.Body>
                {message}

              </Card.Body>
                </Card>
            </Container>


            <Container className="content-container">
              <Row>
                <Col className='description-container' md={{ span: 5, offset: 1 }}>
                    <InputGroup className='input-form'>
                        <FormControl
                            id="description-input"
                            name="description"
                            value={textData.description}
                            onChange={this.handleChange}
                            disabled={isLoading}
                            as="textarea"
                            placeholder="Опиши сон..."/>
                        { isLoading ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            : <Button
                                variant="outline-secondary"
                                disabled={false}
                                onClick={this.handleSendClick}>
                                <FaPaperPlane color="black" size="25" />
                            </Button>
                        }
                    </InputGroup>
                </Col>
              </Row>

              <Row >
                <Col className='empty-space-container' md={4}>
                </Col>
              </Row>

              <Row >
                <Col className="interpretation-container" md={{ span: 5, offset: 6 }}>
                    {/*<textarea className="output-form">Здесь будет толкование сна</textarea>*/}
                    <InputGroup className='output-form'>
                        <FormControl
                            id="interpretation-output"
                            as="textarea"
                            disabled={true}
                            placeholder={result && !isLoading?
                                result: "Здесь будет толкование сна..."
                            }/>
                        { isLoading ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            : <Button
                                variant="outline-secondary"
                                disabled={false}
                                onClick={() => {navigator.clipboard.writeText(text_copy)}}>
                                <FaCopy color="black" size="25" />
                            </Button>
                        }
                  </InputGroup>
                </Col>

              </Row>
            </Container>



            <div className="container-footer">
                <div className="fantom-footer">
                    <h3>Контакты</h3>
                    <div className="contact-icons">
                        <a href="tg://resolve?domain=alienspaceman>">
                            <FontAwesomeIcon icon={faTelegram} size="2x" color="black"/>
                        </a>
                        <a href="https://github.com/alienspaceman">
                            <FontAwesomeIcon icon={faGithub} size="2x" color="black"/>
                        </a>
                        <a href="https://www.patreon.com/vidun">
                            <FontAwesomeIcon icon={faPatreon} size="2x" color="black"/>
                        </a>
                    </div>
                </div>
            </div>

        </Container>
    )
  }
}

export default App;
