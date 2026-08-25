document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const errorElement = document.querySelector(".error");

    const redirectUrl = "https://personalcross.github.io/nosso-time/";

    // Check if the user is already authenticated
    auth.onAuthStateChanged((user) => {
        if (user) {
            window.location.href = redirectUrl;
        }
    });

    // Login
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        errorElement.textContent = "";

        try {
            await auth.signInWithEmailAndPassword(email, password);

            // Authentication successful
            window.location.href = redirectUrl;

        } catch (error) {
            console.error("Login error:", error);

            switch (error.code) {
                case "auth/invalid-email":
                    errorElement.textContent = "O email introduzido não é válido.";
                    break;

                case "auth/user-not-found":
                    errorElement.textContent = "Não existe nenhuma conta com este email.";
                    break;

                case "auth/wrong-password":
                    errorElement.textContent = "A senha está incorreta.";
                    break;

                case "auth/invalid-credential":
                    errorElement.textContent = "Email ou senha incorretos.";
                    break;

                case "auth/user-disabled":
                    errorElement.textContent = "Esta conta foi desativada.";
                    break;

                case "auth/too-many-requests":
                    errorElement.textContent =
                        "Foram realizadas muitas tentativas. Tente novamente mais tarde.";
                    break;

                default:
                    errorElement.textContent =
                        "Não foi possível efetuar o login. Tente novamente.";
                    break;
            }
        }
    });
});