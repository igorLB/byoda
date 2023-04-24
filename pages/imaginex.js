import Head from "next/head";
import Layout from "../components/layout";
import styles from '../styles/Chat.module.css';
import { Form, FormSelect } from "react-bootstrap";
import axios from 'axios';
import React, { useState } from 'react';
import { LinearProgress } from "@mui/material";

export async function getServerSideProps(context) {

    return {
        props: {}, // will be passed to the page component as props
    }
}


export default function Imaginex() {

    const [selectSize, setSelectSize] = React.useState('256x256');
    const [selectArtStyle, setSelectArtStyle] = React.useState('');
    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    React.useEffect(() => {
        setCounter(text.length);
    }, [text])

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('')

        axios.post('/api/gpt', {
            size: selectSize,
            artStyle: selectArtStyle,
            description: text
        })
            .then(response => {
                setImageUrl(response.data.resposta);
            })
            .catch(error => {
                setImageUrl('https://learn.microsoft.com/en-us/windows/win32/uxguide/images/mess-error-image15.png')
                console.error(error);
                setErrorMessage(error.message + ': ' + error.response.data.message)
            }).finally(() => {
                setLoading(false)
            });
    };


    return (
        <Layout>
            <Head>
                <title>Gerador de Personagens</title>
            </Head>
            <div className={styles.body}>
                <Form onSubmit={handleSubmit}>
                    <h1>Gerador de Personagens</h1>


                    <Form.Group>
                        <Form.Label>Descreva aqui as característica do seu personagem</Form.Label>
                        <textarea
                            className={`${styles.textarea}`}
                            placeholder="Ex.: Uma garota adolescente de cabelos negros e cumpridos, do rosto pálido e feição triste"
                            rows={4}
                            value={text}
                            onChange={handleTextChange}
                        ></textarea>
                        <p>{counter}/250</p>
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Art Style</Form.Label>
                        <FormSelect value={selectArtStyle} onChange={(value) => setSelectArtStyle(value.target.value)}>
                            <option value="Pintura a óleo">Pintura a óleo</option>
                            <option value="Desenho Realista">Desenho Realista</option>
                            <option value="Foto Realista">Foto Realista</option>
                            <option value="Tim Burton">Tim Burton</option>
                            <option value="Starry Night">Starry Night</option>
                            <option value="Synthwave">Synthwave</option>
                            <option value="Anos 1920">Anos 1920</option>
                            <option value="Disney">Disney</option>
                            <option value="3D">3D</option>
                            <option value="Desenho de retrato">Desenho de retrato</option>
                        </FormSelect>
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Form.Label>Sizes</Form.Label>
                        <FormSelect value={selectSize} onChange={(event) => setSelectSize(event.target.value)} >
                            <option value="256x256">256x256</option>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                        </FormSelect>
                    </Form.Group>
                    <br />
                    <div>
                        <button type="submit" className={[styles.btn]}>Gerar!</button>
                    </div>
                </Form>

                <br /><br />

                {loading ? <LinearProgress color="success" /> : (imageUrl && <div className={`${styles.animeLeft}`}><img src={imageUrl} alt={text} /></div>)}
                {errorMessage && <p><strong style={{ color: 'red' }}>{errorMessage}</strong></p>}
            </div>
        </Layout>
    );
}