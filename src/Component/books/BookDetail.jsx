import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {Button, Col, Comment, Empty, Modal, Row} from "antd";
import '../shop/Shop.css';
import './BookDetail.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import QuantityButton from "../general/QuantityButton";
import {getCookie} from "react-use-cookie";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";
export default function BookDetail(){

    const [cookies, setCookies, removeCookies] = useCookies(['book-token']);
    let authorize = getCookie('book-token');




    const [session, setSession] = useState(false);
    const [isOpenSession, setIsOpenSession] = useState(false);
    const [isCloseSession, setIsCloseSession] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const navigate = useNavigate();

    let config = '';

    const closeSucessModal = () => {
        setQuantity(0);
        setIsOpenSuccess(false);
    }

    const openSuccessModal = () => {
        setIsOpenSuccess(true);
    }

    const bookId = useParams();
    const [quantity,setQuantity] = useState(0);
    const [bookFeedback, setBookFeedback] = useState([{
        userName : '',
        comment: '',
        ratingPoint : 0.0,
        createDay: ''
    }]);

    const [bookDetail, setBookDetail] = useState({
        bookName: '',
        description: '',
        bookPrice: 0.0,
        quantity : 0,
        authorName: '',
        categoryName : [],
        ratingPoint : 0.0,
        review : '',
        imageLink: '',
        createDay : '',
        updateDay: '',
        bookState: ''
    })


    const handleAddQuantity = () => {
        setQuantity(quantity + 1);
    }

    const handleLessQuantity = () => {
        if(quantity > 0 ){
            setQuantity(quantity - 1);
        }
    }



    const [isFeedback, setIsFeedback] = useState(false);

    const addBookCart = () => {

        if(authorize !== ''){
            config = {
                headers : {Authorization: `Bearer ` + JSON.parse(authorize).token }
            }
        }

        axios.post('https://ecommerce-web0903.herokuapp.com/api/carts',{
            quantity : quantity,
            bookId : bookId.id
        }, config)
            .then((res) => {
                openSuccessModal();
            }).catch((err) =>
        {
                if(err.response.data.statusCode === 401)
                {
                    if(err.response.data.message === 'Expired JWT Token')
                    {
                        setIsOpenSession(true);
                    }else if (err.response.data.message === 'Cannot determine error'){
                        navigate('/login');
                    }
                }
        })
    }

    const getFeedback = () => {
        axios.get('https://ecommerce-web0903.herokuapp.com/api/books/' + bookId.id + '/feedbacks')
            .then((res) => {
                setBookFeedback(res.data)
                console.log(bookFeedback);
            }).catch((err) => console.log(err))
    }

    const getBookDetail = () => {
        axios.get('https://ecommerce-web0903.herokuapp.com/api/books/' + bookId.id)
            .then((res) => {
                setBookDetail(res.data);
                console.log(res.data);
                console.log(bookDetail);
            }).catch((err) => setIsFeedback(false))
    }

    const closeSession = () => {
        removeCookies('book-token');
        navigate('/login');
    }

    const handleAddCart = () => {
        addBookCart();
    }

    useEffect(() => {
        getBookDetail();
        getFeedback();
    },[])



    return(

        <>
            <Modal
                title="Authentication Error"
                centered
                open={isOpenSession}
                onOk={() => {
                    setIsOpenSession(false);
                }}
                onCancel={() => {
                    setIsOpenSession(false);
                }}
                afterClose={closeSession}
                width={600}
            >
                <p>Your Session is expired. Please Login again !!!</p>
            </Modal>
            <Modal
                title="Buying Success !!!"
                centered
                open={isOpenSuccess}
                onOk={() => closeSucessModal()}
                onCancel={() => closeSucessModal()}
                width={600}
            >
                <span>Add {bookDetail.bookName} To Cart Success. </span>
            </Modal>
        <div className='book-detail'>

            <Row>
                <Col span={16}>
                    <div className='book-detail-box'>
                        <Row>
                            <Col span={6}>
                                <img src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_38237.jpg' width='200px' height='200px' className='book-image' alt='example'/>
                                <div className='book-author'> By Author {bookDetail.authorName}</div>
                            </Col>
                            <Col span={15} >
                                <h2 className='book-title'>{bookDetail.bookName}</h2>
                                {bookDetail.categoryName.map((name) => (
                                    <span> {name},</span>
                                ))}
                                <p className='book-description'>
                                    {bookDetail.description}
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6} push={1}  pull={1}>
                    <div className='cart-box'>
                        <Row className='book-price-box'>
                            <span className='book-price'>${bookDetail.bookPrice}</span>
                        </Row>
                        <QuantityButton
                            handleAdd={handleAddQuantity}
                            handleLess={handleLessQuantity}
                            quantity={quantity}
                        />
                        <Button className='add-cart'
                                type='primary'
                                onClick={handleAddCart}
                        >
                            Add To Cart
                        </Button>
                    </div>

                </Col>
            </Row>
            <Row style={{paddingTop:'2rem'}}>
                <Col span={16} >
                    <div className='book-detail-box'>
                        <h3>Customer Review</h3>
                        <span>(Filter by stars)</span>
                        <ul>
                            {
                                bookFeedback.map((item) =>
                                <li>
                                    <Comment
                                        content={(<span>{item.comment}</span>)}
                                        author={item.userName}
                                        avatar={<FontAwesomeIcon icon={faUser}/>}
                                        datetime={item.createDay}
                                    />
                                </li>
                                )
                            }
                        </ul>

                    </div>
                </Col>
                <Col span={6} pull={1} push={1}>
                    {/*<Empty*/}
                    {/*    description={*/}
                    {/*        <span>*/}
                    {/*            There's no comment here !!!*/}
                    {/*        </span>*/}
                    {/*    }*/}
                    {/*        />*/}
                </Col>
            </Row>
        </div>
        </>
    );
}