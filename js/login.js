import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import {Post_signin}  from "./api.js"

      const App = {
        data() {
          return {
            user:{
                username: "",
                password: ""
            }
          };
        },
        methods: {
          signIn() {
            Post_signin(this.user)
          },
        },
      };
    createApp(App).mount("#app");
