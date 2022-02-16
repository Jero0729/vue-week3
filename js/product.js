import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import { Post_check,Get_products,Post_product,Put_product,Delete_product } from './api.js'

let productModal =null;
let delProductModal=null

createApp({
    data() {
      return {
        url: "https://vue3-course-api.hexschool.io/v2",
        path: "mmee1122",
        products: [],
        tempProduct: {
          imagesUrl: []
        },
        isNew: false,
      };
    },
    methods: {
      checkUser() {
        Post_check()
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data);
          window.location = "index.html";
        });
      },
      getData() {
        Get_products()
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
      },
      deleteProductBtn() {
        Delete_product(this.tempProduct.id)
        .then((res) => {
          alert(res.data.message);
          delProductModal.hide();
          this.getData()
        })
        .catch((err) => {
          console.log(err.data);
        });
      },
      openModal(status,product){
        if(status === "new"){
          this.tempProduct = {
            imagesUrl: []
          };
          this.isNew =true;
          productModal.show();
        }else if(status === "edit"){
          this.tempProduct = { ...product };
          this.isNew = false;
          productModal.show();
          }else if(status === "delete"){
            this.tempProduct = { ...product };
            delProductModal.show()
          }
      },
      updateProduct(){
        if (!this.isNew) {
          Put_product({ data: this.tempProduct },this.tempProduct.id)
          .then((response) => {
            alert(response.data.message);
            productModal.hide();
            this.getData();
          }).catch((err) => {
            alert(err.data.message);
          })
          return
        }
        Post_product({ data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          this.getData();
        }).catch((err) => {
          alert(err.data.message);
        })
      },
      createImages() {
        if(this.tempProduct.imageUrl===undefined){
          return
        }
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      },
      },
    created() {
      const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)meToken\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;
      this.checkUser();
    },
    mounted(){
      productModal = new bootstrap.Modal(document.getElementById('productModal'));
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    }
  }).mount("#app");