import Head from "next/head";
import Layout from "../components/layout";
import styles from '../styles/Chat.module.css';
import { Form } from "react-bootstrap";
import axios from 'axios';
import React, { useState } from 'react';

export async function getServerSideProps(context) {

    return {
        props: {}, // will be passed to the page component as props
    }
}


export default function Imaginex() {

    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://api.openai.com/v1/images/generations', {
            model: 'image-alpha-001',
            prompt: text,
            size: "256x256",
            response_format: 'url',
            n: 1,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ERROR`,
            },
        })
            .then(response => {
                setImageUrl(response.data.data[0].url);
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <Layout>
            <Head>
                <title>Gerador de imagens</title>
            </Head>
            <div className={styles.body}>
                <Form onSubmit={handleSubmit}>
                    <h1>Gerador de imagens</h1>
                    <p>Descreva a imagem que voce quer</p>
                    <input name="prompt" type="text" className={styles.input} value={text} onChange={handleTextChange} />

                    <small className={styles.small}>Nenhum dado será coletado/armazenado.</small>
                    <br /><br />
                    <div>
                        <button type="submit" className={[styles.btn]}>Gerar!</button>
                    </div>
                </Form>
                {imageUrl && <img src={imageUrl} alt={text} />}
            </div>
        </Layout>
    );
}