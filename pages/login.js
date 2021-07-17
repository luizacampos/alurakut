import React from "react";
// Hook do NextJS
import { useRouter } from "next/router";
import nookies from "nookies";

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState("omariosouto");

    return (
        <main
            style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p>
                        <strong>Conect</strong> with your friends and family
                    </p>
                    <p>
                        <strong>Meet</strong> new people throw your friends and
                        communities
                    </p>
                    <p>
                        <strong>Share</strong> share your videos, photos and
                        passions at one single place
                    </p>
                </section>

                <section className="formArea">
                    <form
                        className="box"
                        onSubmit={(infosDoEvento) => {
                            infosDoEvento.preventDefault();
                            // alert('Alguém clicou no botão!')
                            console.log("Usuário: ", githubUser);
                            fetch("https://alurakut.vercel.app/api/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    githubUser: githubUser,
                                }),
                            }).then(async (respostaDoServer) => {
                                const dadosDaResposta =
                                    await respostaDoServer.json();
                                const token = dadosDaResposta.token;
                                nookies.set(null, "USER_TOKEN", token, {
                                    path: "/",
                                    maxAge: 86400 * 7,
                                });
                                router.push("/");
                            });
                        }}
                    >
                        <p>
                            Access with your user from <strong>GitHub</strong>!
                        </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(evento) => {
                                setGithubUser(evento.target.value);
                            }}
                        />
                        {githubUser.length === 0 ? "Preencha o campo" : ""}
                        <button type="submit">Login</button>
                    </form>

                    <footer className="box">
                        <p>
                            Not a member? <br />
                            <a href="/login">
                                <strong>SIGN UP</strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
                        <a href="/">Centro de segurança</a> -{" "}
                        <a href="/">Privacidade</a> - <a href="/">Termos</a> -{" "}
                        <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    );
}
