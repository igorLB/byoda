import Head from "next/head";
import Layout from "../components/layout";
import styles from '../styles/Chat.module.css';
import { Form } from "react-bootstrap";
import React from 'react';
import axios from 'axios';
import { LinearProgress, Slider } from "@mui/material";


export default function Chat() {

    const [errorGenero, setErrorGenero] = React.useState(false);
    const [errorResumo, setErrorResumo] = React.useState(false);

    const [genero, setGenero] = React.useState('');
    const [resumo, setResumo] = React.useState('');
    const [loucura, setLoucura] = React.useState(0.8);
    const [resposta, setResposta] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [counter, setCounter] = React.useState(0);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        if (!genero || genero.length > 25) {
            setErrorGenero(true);
            return false;
        } else {
            setErrorGenero(false)
        }
        if (!resumo || resumo.length > 250) {
            setErrorResumo(true);
            return false;
        } else {
            setErrorResumo(false)
        }

        axios.post('/api/backend', {
            genero,
            resumo,
            loucura
        })
            .then(response => {
                setGenero('')
                setResumo('')
                setResposta(response.data.resposta);
                scrollToResposta();
            })
            .catch(error => {
                setResposta('Ops, ocorreu um erro. Por favor, olhe os logs')
                console.error(error);
            }).finally(() => {
                setLoading(false)
            });
    }

    function scrollToResposta() {
        const element = document.getElementById('resposta');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    React.useEffect(() => {
        setCounter(resumo.length);
        if (counter > 250) {
            setErrorResumo(true)
        } else {
            if (errorResumo) {
                setErrorResumo(false)
            }
        }

    }, [resumo])

    return (
        <Layout>
            <Head>
                <title>BYoda Helps!</title>
            </Head>
            <div className={styles.body}>
                <Form onSubmit={handleSubmit}>
                    <h1>Eliminando seu bloqueio criativo!</h1>
                    <br />

                    <p>Qual o gênero do seu livro?</p>
                    <input
                        type="text"
                        className={`${styles.input} ${errorGenero ? styles.error : ''}`}
                        placeholder="Ex.: Comédia Romântica"
                        value={genero}
                        onChange={(event) => setGenero(event.target.value)}
                    />

                    <br /><br />
                    <p>Me conta um resuminho do seu livro?</p>
                    <textarea
                        className={`${styles.textarea} ${errorResumo ? styles.error : ''}`}
                        placeholder="Ex.: É sobre uma menina que foi fazer faculdade no interior e acaba se envolvendo num misterioso caso de assassinato"
                        rows={6}
                        value={resumo}
                        onChange={(event) => setResumo(event.target.value)}
                    ></textarea>
                    <p>{counter}/250</p>


                    <br /><br />
                    <div className="row" style={{ textAlign: 'center' }}>
                        <div className="col-md-9">
                            <Slider
                                aria-label="Volume"
                                value={loucura}
                                max={1}
                                min={0}
                                step={0.1}
                                defaultValue={0.8}
                                marks
                                onChange={(event) => setLoucura(event.target.value)}
                                sx={{
                                    color: 'success.main'
                                }}
                            />
                        </div>
                        {loucura && <p>{loucura * 100}% de loucura na sua resposta</p>}
                    </div>


                    <br /><br />
                    <div className="row">
                        <div className="col-md-12" style={{ textAlign: 'center' }}>
                            <button disabled={loading} type="submit" className={[styles.btn]}>Me ajuda Baby Yoda!</button>
                        </div>
                    </div>

                    <br /><br />
                    {loading ? <LinearProgress color="success" /> : (resposta && <div className={`${styles.animeLeft} ${styles.resposta}`} id="resposta">{resposta.map(paragrafo => <p key={paragrafo.charAt(0)} className={styles.boxSugestao}>{paragrafo}</p>)}</div>)}
                </Form>
            </div>
        </Layout>
    );
}